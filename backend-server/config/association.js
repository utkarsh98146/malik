
// Define the association between models
export const associationModels = ({ User, Admin, Client, Editor, Photographer, Receiver, Task, PhotographerTask, ReceiverTask, EditorTask }) => {
    // ✅ User Associations (Each role is linked to the User table)
    User.hasOne(Admin, { foreignKey: "userId" });
    User.hasOne(Receiver, { foreignKey: "userId" });
    User.hasOne(Photographer, { foreignKey: "userId" });
    User.hasOne(Editor, { foreignKey: "userId" });

    Admin.belongsTo(User, { foreignKey: "userId" });
    Receiver.belongsTo(User, { foreignKey: "userId" });
    Photographer.belongsTo(User, { foreignKey: "userId" });
    Editor.belongsTo(User, { foreignKey: "userId" });

    // ✅ Admin and Client Relationship (Admin can create multiple Clients)
    Admin.hasMany(Client, { foreignKey: "adminId" });
    Client.belongsTo(Admin, { foreignKey: "adminId" });

    // ✅ Admin and Task Relationship (Admin assigns tasks)
    Admin.hasMany(Task, { foreignKey: "adminId" });
    Task.belongsTo(Admin, { foreignKey: "adminId" });

    // ✅ Task and Client Relationship (A task is assigned to one client)
    Task.belongsTo(Client, { foreignKey: "clientId" });
    Client.hasMany(Task, { foreignKey: "clientId" });

    Task.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
    User.hasMany(Task, { foreignKey: 'userId' });


    // ✅ Task and ReceiverTask Relationship (One Task → One Receiver)
    Receiver.hasMany(ReceiverTask, { foreignKey: "receiverId" });
    ReceiverTask.belongsTo(Receiver, { foreignKey: "receiverId" });
    Task.hasOne(ReceiverTask, { foreignKey: "taskId" });  // One task is assigned to only one receiver
    ReceiverTask.belongsTo(Task, { foreignKey: "taskId" });

    // ✅ Task and PhotographerTask Relationship (One Task → One Photographer)
    Photographer.hasMany(PhotographerTask, { foreignKey: "photographerId" });
    PhotographerTask.belongsTo(Photographer, { foreignKey: "photographerId" });
    Task.hasOne(PhotographerTask, { foreignKey: "taskId" }); // One task is assigned to **only one photographer**
    PhotographerTask.belongsTo(Task, { foreignKey: "taskId" });

    // ✅ Task and EditorTask Relationship (One Task → Multiple Editors)
    Admin.hasMany(EditorTask, { foreignKey: "adminId" });
    EditorTask.belongsTo(Admin, { foreignKey: "adminId" });
    Task.hasMany(EditorTask, { foreignKey: "taskId" }); // A task can have **multiple editors**
    EditorTask.belongsTo(Task, { foreignKey: "taskId" });
    Editor.hasMany(EditorTask, { foreignKey: "editorId" });
    EditorTask.belongsTo(Editor, { foreignKey: "editorId" });
}