import express, { response } from 'express';
import db from './database/connection';
import convertHourToMinutes from './utils/convertHoursToMinutes';

const routes = express.Router();

interface ScheduleItem {
    week_day: number;
    from: string;
    to: string;
}

routes.post('/classes', async(request, response) => {
    
    const {
        name,
        avatar,
        whatsapp,
        bio,
        subject,
        cost,
        schedule
    } = request.body;


    //realizar todos os inserts do banco uma vez, caso algo dê errado, todas as alterações são descartadas
    const trx = await db.transaction();

    try {
        const insertedUsersIds = await trx('users').insert({
            name, 
            avatar,
            whatsapp,
            bio,
        })
    
        //inserir ID do user na tabela de classes
    
        const user_id = insertedUsersIds[0];
    
        const insertedClassIds = await trx('classes').insert({
            subject,
            cost,
            user_id
        });
    
        const class_id = insertedClassIds[0];
    
        //converter horas em minutos para salvar no BD
    
        //schedule.map para percorrer cada item do schedule
        const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
            return {
                class_id,
                week_day: scheduleItem.week_day,
                from: convertHourToMinutes(scheduleItem.from),
                to: convertHourToMinutes(scheduleItem.to),
            };
        })
    
        await trx('class_schedule').insert(classSchedule);
    
        //apenas nessa linha, ele vai fazer os inserts no banco
        await trx.commit();
    
        return response.status(201).send();
    } catch(err) {
        //caso dê erro, ele retorna as alterações
        await trx.rollback();

        return response.status(400).json({
            erro: 'Unexpected error while creatingnew class'
        })
    }
})

export default routes;
