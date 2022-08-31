import { Router } from "express";
const router = Router();
import models from '../models/index.js';

const taskList = {};

router.get("/:userId", (req, res) => {
    models.task.findAll({ raw: true }).
        then(tasks => {
            const filteredTasks = tasks.filter((item) => {
                switch (req.query.filterBy) {
                    case "":
                        return item;
                    case "done":
                        return item.done === true;
                    case "undone":
                        return item.done === false;
                }
            });

            const startItem = (req.query.page - 1) * req.query.pp;
            const endItem = req.query.pp * req.query.page;

            taskList.tasks = filteredTasks.sort((a, b) => {
                if (req.query.order === "asc") {
                    return a.id - b.id;
                } else if (req.query.order === "desc") {
                    return b.id - a.id;
                }
            })
                .slice(startItem, endItem);

            taskList.count = tasks.length;

            res.json(taskList);
        });
});

export default router;