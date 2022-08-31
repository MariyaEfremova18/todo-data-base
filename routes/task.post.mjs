import { Router } from "express";
const router = Router();
import models from '../models/index.js';

router.post("/:userId", async (req, res) => {
    await models.task.create({ name: req.body.name, done: req.body.done }).
        then(() => {
            models.task.findAll({ raw: true }).
                then(tasks => {
                    const taskList = [];
                    taskList.push(tasks);
                    res.json(taskList);
                });
        })
});

export default router;