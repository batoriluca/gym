// getting-started.js
const mongoose = require('mongoose');

// New Schema (Schema like codes which help to drop the data in db)
// for add Chat details in db
const TaskSchema = new mongoose.Schema({
    taskid: {
        type: String,
    },
    mission: {
        type: String,
    },
    renewtime: {
        type: String,
    },
    status: {
        type: String,
        default: 'Active'
    },
    updatedate: {
        type: String
    },
    updatetime: {
        type: String
    }


}, { timestamps: true });

export default mongoose.models.Task || mongoose.model("Task", TaskSchema);
