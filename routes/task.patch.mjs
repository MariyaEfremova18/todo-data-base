import { Router } from "express";
const router = Router();
import models from '../models/index.js';

router.patch("/:userId/:id", async (req, res) => {
    await models.task.update({ name: req.body.name, done: req.body.done }, {
        where: {
            id: req.params.id,
        }
    }).
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