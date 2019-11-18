"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
const chamber_1 = require("./chamber");
let sequelize;
let db_env;
if (process.env.DATABASE_URL) {
    db_env = 'Production';
    sequelize = new Sequelize.Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        dialectOptions: {
            ssl: true
        }
    });
}
else {
    db_env = 'Development';
    sequelize = new Sequelize.Sequelize('database', 'username', 'password', {
        dialect: 'sqlite',
        storage: 'database.sqlite',
    });
}
exports.Users = sequelize.define('users', {
    displayname: { type: Sequelize.STRING, allowNull: false, defaultValue: '' },
    username: { type: Sequelize.STRING, allowNull: false, defaultValue: '' },
    email: { type: Sequelize.STRING, allowNull: false, defaultValue: '' },
    password: { type: Sequelize.STRING, allowNull: false, defaultValue: '' },
    paypal: { type: Sequelize.STRING, allowNull: true, defaultValue: '' },
    bio: { type: Sequelize.STRING(250), allowNull: false, defaultValue: '' },
    tags: { type: Sequelize.TEXT, allowNull: false, defaultValue: '' },
    link_text: { type: Sequelize.STRING(250), allowNull: false, defaultValue: '' },
    link_href: { type: Sequelize.STRING(250), allowNull: false, defaultValue: '' },
    public: { type: Sequelize.BOOLEAN, allowNull: true, defaultValue: true },
    icon_link: { type: Sequelize.STRING(500), allowNull: true, defaultValue: '/_bin/img/anon.png' },
    icon_id: { type: Sequelize.STRING(500), allowNull: true, defaultValue: '' },
    location: { type: Sequelize.STRING(500), allowNull: true, defaultValue: '' },
    subjects: { type: Sequelize.TEXT, allowNull: true, defaultValue: '' },
    account_verified: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
    certified: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
    online: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
    date_created: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    uuid: { type: Sequelize.STRING, unique: true, defaultValue: Sequelize.UUIDV1 }
}, { freezeTableName: true, underscored: true, indexes: [{ unique: true, fields: ['email', 'username', 'uuid'] }] });
exports.UserFields = sequelize.define('user_fields', {
    user_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: exports.Users, key: 'id' } },
    name: { type: Sequelize.STRING, allowNull: false, defaultValue: '' },
    type: { type: Sequelize.STRING, allowNull: false, defaultValue: '' },
    value: { type: Sequelize.STRING(500), allowNull: false, defaultValue: '' },
    uuid: { type: Sequelize.STRING, unique: true, defaultValue: Sequelize.UUIDV1 }
}, { freezeTableName: true, underscored: true });
exports.UserAvailability = sequelize.define('user_availability', {
    user_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: exports.Users, key: 'id' } },
    date_available: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    time_available: { type: Sequelize.TIME, defaultValue: Sequelize.NOW },
    datetime_available: { type: Sequelize.TIME, defaultValue: Sequelize.NOW },
    date_created: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    uuid: { type: Sequelize.STRING, unique: true, defaultValue: Sequelize.UUIDV1 }
}, { freezeTableName: true, underscored: true });
exports.FeaturedUsers = sequelize.define('moves', {
    owner_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: exports.Users, key: 'id' } },
    start: { type: Sequelize.DATE, allowNull: false },
    end: { type: Sequelize.DATE, allowNull: false },
    date_created: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    uuid: { type: Sequelize.STRING, defaultValue: Sequelize.UUIDV1 }
}, { freezeTableName: true, underscored: true });
exports.ResetPasswordRequests = sequelize.define('reset_password_requests', {
    user_email: { type: Sequelize.INTEGER, allowNull: false },
    date_created: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    uuid: { type: Sequelize.STRING, unique: true, defaultValue: Sequelize.UUIDV1 },
    unique_value: { type: Sequelize.STRING, unique: true, defaultValue: chamber_1.uniqueValue }
}, { freezeTableName: true, underscored: true });
exports.Blockings = sequelize.define('blockings', {
    user_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: exports.Users, key: 'id' } },
    blocks_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: exports.Users, key: 'id' } },
    date_created: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    uuid: { type: Sequelize.STRING, unique: true, defaultValue: Sequelize.UUIDV1 }
}, { freezeTableName: true, underscored: true });
exports.Follows = sequelize.define('follows', {
    user_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: exports.Users, key: 'id' } },
    follows_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: exports.Users, key: 'id' } },
    date_created: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    uuid: { type: Sequelize.STRING, unique: true, defaultValue: Sequelize.UUIDV1 }
}, { freezeTableName: true, underscored: true });
exports.FollowRequests = sequelize.define('follow_requests', {
    user_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: exports.Users, key: 'id' } },
    follows_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: exports.Users, key: 'id' } },
    date_created: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    uuid: { type: Sequelize.STRING, unique: true, defaultValue: Sequelize.UUIDV1 }
}, { freezeTableName: true, underscored: true });
exports.UserRatings = sequelize.define('user_reviews', {
    user_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: exports.Users, key: 'id' } },
    writer_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: exports.Users, key: 'id' } },
    rating: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 5 },
    summary: { type: Sequelize.STRING(250), allowNull: true, defaultValue: '' },
    date_created: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    uuid: { type: Sequelize.STRING, unique: true, defaultValue: Sequelize.UUIDV1 }
}, { freezeTableName: true, underscored: true });
exports.Notifications = sequelize.define('notifications', {
    from_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: exports.Users, key: 'id' } },
    to_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: exports.Users, key: 'id' } },
    action: { type: Sequelize.STRING, allowNull: false, defaultValue: '' },
    target_type: { type: Sequelize.STRING, allowNull: false, defaultValue: '' },
    target_id: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
    message: { type: Sequelize.STRING(500), allowNull: false, defaultValue: '' },
    link: { type: Sequelize.STRING, allowNull: false, defaultValue: '' },
    read: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
    image_link: { type: Sequelize.STRING(500), allowNull: true, defaultValue: '' },
    image_id: { type: Sequelize.STRING(500), allowNull: true, defaultValue: '' },
    date_created: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    uuid: { type: Sequelize.STRING, defaultValue: Sequelize.UUIDV1 }
}, { freezeTableName: true, underscored: true });
exports.ContentSubscriptions = sequelize.define('content_subscriptions', {
    user_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: exports.Users, key: 'id' } },
    subscribes_to_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: exports.Users, key: 'id' } },
    subscribe_content_type: { type: Sequelize.STRING, allowNull: false },
    date_created: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    uuid: { type: Sequelize.STRING, defaultValue: Sequelize.UUIDV1 }
}, { freezeTableName: true, underscored: true });
exports.Conversations = sequelize.define('conversations', {
    creator_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: exports.Users, key: 'id' } },
    date_created: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    uuid: { type: Sequelize.STRING, defaultValue: Sequelize.UUIDV1 }
}, { freezeTableName: true, underscored: true });
exports.ConversationMembers = sequelize.define('conversation_members', {
    conversation_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: exports.Conversations, key: 'id' } },
    user_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: exports.Users, key: 'id' } },
    date_created: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    uuid: { type: Sequelize.STRING, defaultValue: Sequelize.UUIDV1 }
}, { freezeTableName: true, underscored: true });
exports.ConversationMessages = sequelize.define('conversation_messages', {
    conversation_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: exports.Conversations, key: 'id' } },
    user_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: exports.Users, key: 'id' } },
    body: { type: Sequelize.STRING(500), allowNull: true, defaultValue: '' },
    opened: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
    date_created: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    uuid: { type: Sequelize.STRING, defaultValue: Sequelize.UUIDV1 }
}, { freezeTableName: true, underscored: true });
exports.MessageSenders = sequelize.define('message_senders', {
    user_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: exports.Users, key: 'id' } },
    sender_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: exports.Users, key: 'id' } },
    date_created: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    uuid: { type: Sequelize.STRING, defaultValue: Sequelize.UUIDV1 }
}, { freezeTableName: true, underscored: true });
exports.Messages = sequelize.define('messages', {
    sender_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: exports.Users, key: 'id' } },
    recipient_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: exports.Users, key: 'id' } },
    content: { type: Sequelize.STRING(500), allowNull: true, defaultValue: '' },
    opened: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
    date_created: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    uuid: { type: Sequelize.STRING, defaultValue: Sequelize.UUIDV1 }
}, { freezeTableName: true, underscored: true });
exports.Photos = sequelize.define('photos', {
    owner_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: exports.Users, key: 'id' } },
    caption: { type: Sequelize.STRING(250), allowNull: false },
    photo_link: { type: Sequelize.STRING(500), allowNull: false },
    photo_id: { type: Sequelize.STRING(500), allowNull: false },
    is_explicit: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
    is_private: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
    date_created: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    uuid: { type: Sequelize.STRING, defaultValue: Sequelize.UUIDV1 }
}, { freezeTableName: true, underscored: true });
exports.Videos = sequelize.define('videos', {
    owner_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: exports.Users, key: 'id' } },
    caption: { type: Sequelize.STRING(250), allowNull: false },
    video_link: { type: Sequelize.STRING(500), allowNull: false },
    video_id: { type: Sequelize.STRING(500), allowNull: false },
    is_explicit: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
    is_private: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
    date_created: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    uuid: { type: Sequelize.STRING, defaultValue: Sequelize.UUIDV1 }
}, { freezeTableName: true, underscored: true });
exports.Audios = sequelize.define('audios', {
    owner_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: exports.Users, key: 'id' } },
    caption: { type: Sequelize.STRING(250), allowNull: false },
    audio_link: { type: Sequelize.STRING(500), allowNull: false },
    audio_id: { type: Sequelize.STRING(500), allowNull: false },
    is_explicit: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
    is_private: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
    date_created: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    uuid: { type: Sequelize.STRING, defaultValue: Sequelize.UUIDV1 }
}, { freezeTableName: true, underscored: true });
exports.Posts = sequelize.define('posts', {
    owner_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: exports.Users, key: 'id' } },
    title: { type: Sequelize.STRING(250), allowNull: false },
    body: { type: Sequelize.TEXT, allowNull: false },
    tags: { type: Sequelize.TEXT, allowNull: true },
    is_explicit: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
    is_private: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
    date_created: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    last_edited: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    uuid: { type: Sequelize.STRING, defaultValue: Sequelize.UUIDV1 }
}, { freezeTableName: true, underscored: true });
exports.PostViewers = sequelize.define('post_viewers', {
    owner_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: exports.Users, key: 'id' } },
    user_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: exports.Users, key: 'id' } },
    post_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: exports.Posts, key: 'id' } },
    date_created: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    uuid: { type: Sequelize.STRING, defaultValue: Sequelize.UUIDV1 }
}, { freezeTableName: true, underscored: true });
exports.PostPhotos = sequelize.define('post_photos', {
    post_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: exports.Posts, key: 'id' } },
    photo_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: exports.Photos, key: 'id' } },
    date_created: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    uuid: { type: Sequelize.STRING, defaultValue: Sequelize.UUIDV1 }
}, { freezeTableName: true, underscored: true });
exports.PostVideos = sequelize.define('post_videos', {
    post_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: exports.Posts, key: 'id' } },
    video_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: exports.Videos, key: 'id' } },
    date_created: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    uuid: { type: Sequelize.STRING, defaultValue: Sequelize.UUIDV1 }
}, { freezeTableName: true, underscored: true });
exports.PostAudios = sequelize.define('post_photos', {
    post_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: exports.Posts, key: 'id' } },
    audio_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: exports.Audios, key: 'id' } },
    date_created: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    uuid: { type: Sequelize.STRING, defaultValue: Sequelize.UUIDV1 }
}, { freezeTableName: true, underscored: true });
exports.PostComments = sequelize.define('post_comments', {
    owner_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: exports.Users, key: 'id' } },
    post_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: exports.Posts, key: 'id' } },
    body: { type: Sequelize.TEXT, allowNull: false },
    date_created: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    last_edited: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    uuid: { type: Sequelize.STRING, defaultValue: Sequelize.UUIDV1 }
}, { freezeTableName: true, underscored: true });
exports.PostCommentReplies = sequelize.define('post_comment_replies', {
    owner_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: exports.Users, key: 'id' } },
    comment_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: exports.PostComments, key: 'id' } },
    body: { type: Sequelize.TEXT, allowNull: false },
    date_created: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    last_edited: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    uuid: { type: Sequelize.STRING, defaultValue: Sequelize.UUIDV1 }
}, { freezeTableName: true, underscored: true });
exports.PostReactions = sequelize.define('post_reactions', {
    owner_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: exports.Users, key: 'id' } },
    post_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: exports.Posts, key: 'id' } },
    reaction_id: { type: Sequelize.INTEGER, allowNull: false },
    date_created: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    last_edited: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    uuid: { type: Sequelize.STRING, defaultValue: Sequelize.UUIDV1 }
}, { freezeTableName: true, underscored: true });
exports.PostCommentReactions = sequelize.define('post_comment_reactions', {
    owner_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: exports.Users, key: 'id' } },
    comment_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: exports.PostComments, key: 'id' } },
    reaction_id: { type: Sequelize.INTEGER, allowNull: false },
    date_created: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    last_edited: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    uuid: { type: Sequelize.STRING, defaultValue: Sequelize.UUIDV1 }
}, { freezeTableName: true, underscored: true });
exports.PostCommentReplyReactions = sequelize.define('post_comment_reply_reactions', {
    owner_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: exports.Users, key: 'id' } },
    reply_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: exports.PostCommentReplies, key: 'id' } },
    reaction_id: { type: Sequelize.INTEGER, allowNull: false },
    date_created: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    last_edited: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    uuid: { type: Sequelize.STRING, defaultValue: Sequelize.UUIDV1 }
}, { freezeTableName: true, underscored: true });
exports.AccountsReported = sequelize.define('accounts_reported', {
    user_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: exports.Users, key: 'id' } },
    reporting_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: exports.Users, key: 'id' } },
    type: { type: Sequelize.STRING(250), allowNull: false },
    details: { type: Sequelize.TEXT, allowNull: false },
    date_created: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    uuid: { type: Sequelize.STRING, defaultValue: Sequelize.UUIDV1 }
}, { freezeTableName: true, underscored: true });
sequelize.sync({ force: false })
    .then(() => { console.log('Database Initialized! ENV: ' + db_env); })
    .catch((error) => { console.log('Database Failed!', error); });
