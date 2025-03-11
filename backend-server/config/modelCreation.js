import { Admin } from "../model/AdminDB.js";
import { Client } from "../model/ClientDB.js";
import { Editor } from "../model/EditorDB.js";
import { EditorTask } from "../model/EditorTaskDB.js";
import { Photographer } from "../model/PhotoGrapherDB.js";
import { PhotographerTask } from "../model/PhotographerTask.js";
import { Receiver } from "../model/ReceiverDB.js";
import { ReceiverTask } from "../model/ReceiverTaskDB.js";
import { Task } from "../model/TaskAssignmentDB.js";
import { User } from "../model/UserDB.js";
import { associationModels } from "./association.js";

export const models = { User, Admin, Client, Editor, Photographer, Receiver, Task, PhotographerTask, ReceiverTask, EditorTask };

//association after models creation
associationModels(models);