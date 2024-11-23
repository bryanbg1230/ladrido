import {conmysql} from '../db.js'
export const getRegistros=
    async (req,res)=>{
        try {
            const [result] = await conmysql.query(' select * from registros ')
            res.json(result)
        } catch (error) {
            return res.status(500).json({message:"Error al consultar registros"})
        }
    }
    


export const getregistrosxid=
async (req,res)=>{
    try {
        const[result]=await conmysql.query('select * from registros where reg_id=?',[req.params.id])
        if (result.length<=0)return res.status(404).json({
            cli_id:0,
            message:"Registro no encontrado"
        })
        res.json(result[0])
    } catch (error) {
        return res.status(500).json({message:'error de lado del servidor'})        
    }
}
export const postRegistro=
async (req,res)=>{
    try {
        //console.log(req.body)
        const {reg_nombre, reg_lugar, reg_estado, reg_lat, reg_lon, reg_frecuencia, reg_duracion}=req.body
        //console.log(cli_nombre)
        const [rows]=await conmysql.query('insert into registros (reg_nombre, reg_lugar, reg_estado, reg_lat, reg_lon, reg_frecuencia, reg_duracion) values(?,?,?,?,?,?,?)',
            [reg_nombre, reg_lugar, reg_estado, reg_lat, reg_lon, reg_frecuencia, reg_duracion])

        res.send({
            id:rows.insertId
        })
    } catch (error) {
        return res.status(500).json({message:'error del lado del servidor'})
    }
}
export const putRegistro=
async (req,res)=>{
    try {
        const {id}=req.params
        //console.log(req.body)
        const {reg_nombre, reg_fecha, reg_lugar, reg_estado, reg_lat, reg_lon, reg_frecuencia, reg_duracion}=req.body
        //console.log(cli_nombre)
        const [result]=await conmysql.query('update registros set reg_nombre=?, reg_fecha=?, reg_lugar=?, reg_estado=?, reg_lat=?, reg_lon=?, reg_frecuencia=?, reg_duracion=? where reg_id=?',
            [reg_nombre, reg_fecha, reg_lugar, reg_estado, reg_lat, reg_lon, reg_frecuencia, reg_duracion, id])

        if(result.affectedRows<=0)return res.status(404).json({
            message:'Registro no encontrado'
        })
        const[rows]=await conmysql.query('select * from registros where reg_id=?',[id])
        res.json(rows[0])
        /* res.send({
            id:rows.insertId
        }) */
    } catch (error) {
        return res.status(500).json({message:'error del lado del servidor'})
    }
}

export const patchRegistro=
async (req,res)=>{
    try {
        const {id}=req.params
        //console.log(req.body)
        const {reg_nombre, reg_fecha, reg_lugar, reg_estado, reg_lat, reg_lon, reg_frecuencia, reg_duracion}=req.body
        //console.log(cli_nombre)
        const [result]=await conmysql.query('update registros set reg_nombre=IFNULL(?,reg_nombre), reg_fecha=IFNULL(?,reg_fecha), reg_lugar=IFNULL(?,reg_lugar), reg_estado=IFNULL(?,reg_estado), reg_lat=IFNULL(?,reg_lat), reg_lon=IFNULL(?,reg_lon), reg_frecuencia=IFNULL(?,reg_frecuencia), reg_duracion=IFNULL(?,reg_duracion) where reg_id=?',
            [reg_nombre, reg_fecha, reg_lugar, reg_estado, reg_lat, reg_lon, reg_frecuencia, reg_duracion, id])

        if(result.affectedRows<=0)return res.status(404).json({
            message:'Registro no encontrado'
        })
        const[rows]=await conmysql.query('select * from registros where reg_id=?',[id])
        res.json(rows[0])
        /* res.send({
            id:rows.insertId
        }) */
    } catch (error) {
        return res.status(500).json({message:'error del lado del servidor'})
    }
}

export const deleteRegistro=
async(req,res)=>{
    try {
        //const {miid}=req.params
        const [rows]=await conmysql.query(' delete from registros where reg_id=?',[req.params.id])
        if(rows.affectedRows<=0)return res.status(404).json({
            id:0,
            message: "No pudo eliminar el registro"
        })
        //res.sendStatus(202) ----el que tenia
        return res.status(200).json({
          message: "Resgitro eliminado correctamente"
        });  // Agregado
    } catch (error) {
        return res.status(500).json({message:"Error del lado del servidor"})
    }
}