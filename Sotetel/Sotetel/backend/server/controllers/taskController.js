const Task = require('../models/Task');
const Invoice = require('../models/Invoice');
const InventoryItem = require('../models/InventoryItem');
const logInventoryUsage = require('../utils/logInventoryUsage');
const isTechnicianAuthorized = require('../utils/isTechnicianAuthorized');

const INTEREST_RATE = 1.2;
const LABOR_COST = 50;
const SERVICE_FEE = 30;

exports.createTask = async (req, res) => {
  try {
    if (req.user.role !== 'client') {
      return res.status(403).json({ message: 'Only clients can request interventions' });
    }

    const { title, description, type } = req.body;

    const newTask = new Task({
      title,
      description,
      client: req.user._id,
      status: type === 'quote_request' ? 'pending_quote' : 'pending'
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUnassignedTasks = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can view this' });
    }

    const tasks = await Task.find({ status: 'pending', technician: { $exists: false } })
      .populate('client', 'name email');

    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.assignTask = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can assign tasks' });
    }

    const { technicianId, scheduledDate } = req.body;

    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    task.technician = technicianId;
    task.status = 'in-progress';

    if (scheduledDate) {
      const parsedDate = new Date(scheduledDate);
      if (isNaN(parsedDate.getTime())) {
        return res.status(400).json({ message: 'Invalid date format' });
      }
      task.scheduledDate = parsedDate;
    }

    const updated = await task.save();
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMyTasks = async (req, res) => {
  try {
    if (req.user.role !== 'technician') {
      return res.status(403).json({ message: 'Only technicians can access this' });
    }

    const tasks = await Task.find({
      technician: req.user._id,
      status: { $ne: 'completed' }
    }).populate('client', 'name email');

    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCompletedTasks = async (req, res) => {
  try {
    if (req.user.role !== 'technician') {
      return res.status(403).json({ message: 'Only technicians can access this' });
    }

    const completedTasks = await Task.find({
      technician: req.user._id,
      status: 'completed'
    }).populate('client', 'name email');

    res.status(200).json(completedTasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateTaskStatus = async (req, res) => {
  try {
    const taskId = req.params.id;
    const { status, materialsUsed } = req.body;

    const validStatus = ['in-progress', 'completed'];
    if (!validStatus.includes(status)) {
      return res.status(400).json({ message: 'Invalid status update' });
    }

    const task = await Task.findById(taskId).populate('client technician');
    if (!task) return res.status(404).json({ message: 'Task not found' });

    if (!isTechnicianAuthorized(req.user, task)) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    let materialCost = 0;
    let invoiceLineItems = [];

    if (Array.isArray(materialsUsed) && materialsUsed.length > 0) {
      const updatedMaterialsUsed = [];

      for (let entry of materialsUsed) {
        const { item: itemId, quantity } = entry;
        const item = await InventoryItem.findById(itemId);
        if (!item) {
          return res.status(400).json({ message: `Item not found: ${itemId}` });
        }

        if (item.quantity < quantity) {
          return res.status(400).json({ message: `Not enough stock for ${item.name}` });
        }

        const itemPrice = Number(item.unitPrice);
        const qty = Number(quantity);

        if (isNaN(itemPrice) || isNaN(qty)) {
          return res.status(400).json({ message: `Invalid price or quantity for item ${item.name}` });
        }

        const cost = qty * itemPrice * INTEREST_RATE;
        materialCost += cost;

        item.quantity -= qty;
        await item.save();

        updatedMaterialsUsed.push({
          item: item._id,
          name: item.name,
          quantity: qty
        });

        invoiceLineItems.push({
          name: item.name,
          quantity: qty,
          unitPrice: itemPrice * INTEREST_RATE,
          total: cost
        });
      }

      task.materialsUsed = updatedMaterialsUsed;

      await logInventoryUsage({
        userId: req.user._id,
        taskId: task._id,
        materialsUsed: updatedMaterialsUsed
      });
    }

    task.status = status;

    if (status === 'completed') {
      const laborCost = LABOR_COST;
      const serviceFee = SERVICE_FEE;
      const total = materialCost + laborCost + serviceFee;

      const existingInvoice = await Invoice.findOne({ task: task._id });
      if (!existingInvoice) {
        const newInvoice = new Invoice({
          task: task._id,
          client: task.client._id,
          lineItems: invoiceLineItems,
          laborCost,
          serviceFee,
          amount: total,
          status: 'draft',
          isFinal: false,
          issuedAt: new Date()
        });

        await newInvoice.save();
      }
    }

    await task.save();
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAssignedTasksProgress = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can view this' });
    }

    const tasks = await Task.find({
      technician: { $exists: true },
      status: { $in: ['in-progress', 'completed'] }
    })
      .populate('client', 'name email')
      .populate('technician', 'name email');

    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getClientTasks = async (req, res) => {
  try {
    if (req.user.role !== 'client') {
      return res.status(403).json({ message: 'Only clients can access this' });
    }

    const tasks = await Task.find({ client: req.user._id })
      .populate('technician', 'name email')
      .populate('client', 'name email');

    if (!tasks || tasks.length === 0) {
      return res.status(404).json({ message: 'No tasks found for this client' });
    }

    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.sendQuoteToClient = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    if (task.status !== 'pending_quote') {
      return res.status(400).json({ message: 'Task is not in quote request state' });
    }

    const { quotePrice, quoteComment } = req.body;

    task.quotePrice = quotePrice;
    task.quoteComment = quoteComment;
    task.status = 'quote_sent';

    await task.save();
    res.status(200).json({ message: 'Quote sent to client', task });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.clientRespondToQuote = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    if (task.status !== 'quote_sent') {
      return res.status(400).json({ message: 'No quote to respond to' });
    }

    const { accepted } = req.body;

    task.status = accepted ? 'quote_accepted' : 'quote_rejected';

    await task.save();
    res.status(200).json({ message: `Quote ${accepted ? 'accepted' : 'rejected'}`, task });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getTasksByStatus = async (req, res) => {
  try {
    const { status } = req.query;

    let query = {};
    if (status) {
      if (Array.isArray(status)) {
        query.status = { $in: status };
      } else {
        query.status = status;
      }
    }

    const tasks = await Task.find(query)
      .populate('client', 'name email')
      .populate('technician', 'name email');

    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
