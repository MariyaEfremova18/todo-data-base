import { Router } from "express";
const router = Router();
import models from '../models/index.js';

router.delete("/:userId/:id", async (req, res) => {
    await models.task.destroy({
        where: {
            id: req.params.id
        }
    }).
        then(() => {
            models.task.findAll({ raw: true }).
                then(tasks => {
                    console.log(tasks);
                    const taskList = [];
                    taskList.push(tasks);
                    res.json(taskList);
                });
        })
});

export default router;