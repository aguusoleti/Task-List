const pool = require('../db.js')
const getAllTasks = async (req, res,next) => {
    try {
        const tabla = await pool.query('SELECT * FROM task')
        console.log(tabla);
        res.json(tabla.rows)
    } catch (error) {
        next(error)
    }

}
const getASingleTask = async (req, res, next) => {
    const { id } = req.params
    console.log(id)
    try {
        // const tabla = await pool.query('SELECT * FROM task')
        // const task = tabla.rows
        // task.forEach(element => {
        //     if (element.id == id) {
        //         res.json(element)
        //     }
        // });
        const tabla = await pool.query('SELECT * FROM task WHERE id = $1', [id])
        if (tabla.rows.length === 0) {
            return res.status(404).json({
                mensaje: 'No se encontro la tabla',
            })
        }
        res.json(tabla.rows[0])

    } catch (error) {
        next(error)
    }
}
const postCreatingATask = async (req, res,next) => {
    const { title, descriptios } = req.body;
    try {
        console.log(title)
        const result = await pool.query("INSERT INTO task (title,descriptios) VALUES ($1,$2) RETURNING*", [
            title,
            descriptios
        ]);
        console.log(result)
        res.json(result.rows[0])

    } catch (error) {
        next(error)
    }
};
const deleteTask = async (req, res, next) => {
    const { id } = req.params
    console.log(id)
    try {
        const tabla = await pool.query('DELETE FROM task WHERE id = $1', [id])
        if (tabla.rowCount === 0) {
            return res.status(404).json({
                mensaje: 'No se encontro la tabla',
            })
        }
        res.sendstatus(204)

    } catch (error) {
        next(error)
    }
}
const putUpdateTask = async (req, res, next) => {
    const { id } = req.params
    const { title, descriptios } = req.body;
    try {
        const tabla = await pool.query('UPDATE task SET title = $1 , descriptios= $2 WHERE id = $3 RETURNING *', 
        [title, descriptios, id])

        if (tabla.rows.length === 0) {
            return res.status(404).json({
                mensaje: 'No se encontro la tarea',
            })
        }
        res.send(tabla.rows[0])

    } catch (error) {
       next(error)
    }
}
module.exports = {
    getAllTasks,
    getASingleTask,
    postCreatingATask,
    deleteTask,
    putUpdateTask,
}