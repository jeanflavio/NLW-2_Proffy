import { Request, Response } from 'express'

import db from '../database/connection';
import convertHourToMinutes from '../utils/convertHoursToMinutes';

interface ScheduleItem {
    week_day: number;
    from: string;
    to: string;
}

export default class ClassesController {

    async index(request: Request, response: Response) {
        const filters = request.query;

        const subject = filters.subject as string;
        const week_day = filters.week_day as string;
        const time = filters.time as string;

        if (!filters.week_day || !filters.subject || !filters.time) {
            return response.status(400).json({
                error: 'Missing filters to search classes'
            })
        }

        const timeInMinutes = convertHourToMinutes(time);

        const classes = await db('classes')
            .whereExists(function() {
                this.select('class_schedule.*')
                    .from('class_schedule')
                    .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
                    .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
                    .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
                    .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
            })
            .where('classes.subject', '=', subject)
            .join('users', 'classes.user_id', '=', 'users.id')
            .select(['classes.*', 'users.*']);

        return response.json(classes);
    }
    
    async create(request: Request, response: Response) {
    
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
    }
}

