import { Filter, ObjectId } from 'mongodb';
import { RobotGameMatch } from '@lems/types';
import db from '../database';

export const findMatches = (filter: Filter<RobotGameMatch>) => {
  return db.collection<RobotGameMatch>('matches').find(filter);
};

export const getMatch = (filter: Filter<RobotGameMatch>) => {
  return findMatches(filter).next();
};

export const getEventMatches = (eventId: string) => {
  return findMatches({
    eventId: new ObjectId(eventId)
  }).toArray();
};

export const getTableMatches = (tableId: string) => {
  return findMatches({
    'participants.tableId': new ObjectId(tableId)
  }).toArray();
};

export const addMatch = (match: RobotGameMatch) => {
  return db.collection<RobotGameMatch>('matches').insertOne(match);
};

export const addMatches = (matches: Array<RobotGameMatch>) => {
  return db.collection<RobotGameMatch>('matches').insertMany(matches);
};

export const updateMatch = (filter: Filter<RobotGameMatch>, newMatch: Partial<RobotGameMatch>) => {
  return db
    .collection<RobotGameMatch>('matches')
    .updateOne(filter, { $set: newMatch }, { upsert: true });
};

export const updateMatches = (
  filter: Filter<RobotGameMatch>,
  newMatch: Partial<RobotGameMatch>
) => {
  return db.collection<RobotGameMatch>('matches').updateMany(filter, { $set: newMatch });
};

export const deleteMatch = (filter: Filter<RobotGameMatch>) => {
  return db
    .collection<RobotGameMatch>('matches')
    .deleteOne(filter)
    .then(response => response);
};

export const deleteEventMatches = (eventId: ObjectId) => {
  return db
    .collection<RobotGameMatch>('matches')
    .deleteMany({ eventId: eventId })
    .then(response => response);
};

export const deleteTableMatches = (tableId: ObjectId) => {
  return db
    .collection<RobotGameMatch>('matches')
    .deleteMany({ table: tableId })
    .then(response => response);
};
