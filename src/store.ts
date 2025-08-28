import fs from 'node:fs/promises'
import path from 'node:path'
import { Whisper } from './config/database';
import type { IWhisper } from './config/database';

const filename = path.join(process.cwd(), 'db.json')

const saveChanges = async (data: IWhisper) => fs.writeFile(filename, JSON.stringify(data))

const readData = async (): Promise<IWhisper> => {
  const data = await fs.readFile(filename, 'utf-8')
  return JSON.parse(data)
}
const getAll = Whisper.find()
const getById = (id: string) => Whisper.findById({_id: id})

const create = async (message: string): Promise<IWhisper> => {
  const whisper = new Whisper({message})
  await whisper.save()
  return whisper
}

const updateById = async (id: number, message: string): Promise<IWhisper | null> =>
  Whisper.findOneAndUpdate({_id: id}, {message}, {new: true})

const deleteById = async (id: number): Promise<IWhisper | null> => Whisper.findOneAndDelete({_id: id})


export { getAll, getById, create, updateById, deleteById }
