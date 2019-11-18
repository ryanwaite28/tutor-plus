import * as Sequelize from 'sequelize';
import { uniqueValue } from './chamber';

let sequelize: Sequelize.Sequelize;
let db_env: string;

if (process.env.DATABASE_URL) {
  db_env = 'Production';
  sequelize = new Sequelize.Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
      ssl: true
    }
  });
} else {
  db_env = 'Development';
  sequelize = new Sequelize.Sequelize('database', 'username', 'password', {
    dialect: 'sqlite',
    storage: 'database.sqlite',
  });
}

/**
 * @see: https://sequelize.org/master/manual/typescript
 */

interface IMyModel extends Sequelize.Model {
  readonly id: number;
}

type MyModelStatic = typeof Sequelize.Model & {
  new (values?: object, options?: Sequelize.BuildOptions): IMyModel;
};

export const Users = sequelize.define('users', {
  displayname:             { type: Sequelize.STRING, allowNull: false, defaultValue: '' },
  username:                { type: Sequelize.STRING, allowNull: false, defaultValue: '' },
  email:                   { type: Sequelize.STRING, allowNull: false, defaultValue: '' },
  password:                { type: Sequelize.STRING, allowNull: false, defaultValue: '' },
  paypal:                  { type: Sequelize.STRING, allowNull: true, defaultValue: '' },
  bio:                     { type: Sequelize.STRING(250), allowNull: false, defaultValue: '' },
  tags:                    { type: Sequelize.TEXT, allowNull: false, defaultValue: '' },
  link_text:               { type: Sequelize.STRING(250), allowNull: false, defaultValue: '' },
  link_href:               { type: Sequelize.STRING(250), allowNull: false, defaultValue: '' },
  public:                  { type: Sequelize.BOOLEAN, allowNull: true, defaultValue: true },
  icon_link:               { type: Sequelize.STRING(500), allowNull: true, defaultValue: '/_bin/img/anon.png' },
  icon_id:                 { type: Sequelize.STRING(500), allowNull: true, defaultValue: '' },
  location:                { type: Sequelize.STRING(500), allowNull: true, defaultValue: '' },
  subjects:                { type: Sequelize.TEXT, allowNull: true, defaultValue: '' },
  account_verified:        { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
  certified:               { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
  online:                  { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
  date_created:            { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
  uuid:                    { type: Sequelize.STRING, unique: true, defaultValue: Sequelize.UUIDV1 }
}, { freezeTableName: true, underscored: true, indexes: [{ unique: true, fields: ['email', 'username', 'uuid'] }] });

export const UserFields = sequelize.define('user_fields', {
  user_id:         { type: Sequelize.INTEGER, allowNull: false, references: { model: Users, key: 'id' } },
  name:            { type: Sequelize.STRING, allowNull: false, defaultValue: '' },
  type:            { type: Sequelize.STRING, allowNull: false, defaultValue: '' },
  value:           { type: Sequelize.STRING(500), allowNull: false, defaultValue: '' },
  uuid:            { type: Sequelize.STRING, unique: true, defaultValue: Sequelize.UUIDV1 }
}, { freezeTableName: true, underscored: true });

export const UserAvailability = sequelize.define('user_availability', {
  user_id:               { type: Sequelize.INTEGER, allowNull: false, references: { model: Users, key: 'id' } },
  date_available:        { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
  time_available:        { type: Sequelize.TIME, defaultValue: Sequelize.NOW },
  datetime_available:    { type: Sequelize.TIME, defaultValue: Sequelize.NOW },
  date_created:          { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
  uuid:                  { type: Sequelize.STRING, unique: true, defaultValue: Sequelize.UUIDV1 }
}, { freezeTableName: true, underscored: true });

export const FeaturedUsers = sequelize.define('moves', {
  owner_id:            { type: Sequelize.INTEGER, allowNull: false, references: { model: Users, key: 'id' } },
  start:               { type: Sequelize.DATE, allowNull: false },
  end:                 { type: Sequelize.DATE, allowNull: false },
  date_created:        { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
  uuid:                { type: Sequelize.STRING, defaultValue: Sequelize.UUIDV1 }
}, { freezeTableName: true, underscored: true });

export const ResetPasswordRequests = sequelize.define('reset_password_requests', {
  user_email:          { type: Sequelize.INTEGER, allowNull: false },
  date_created:        { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
  uuid:                { type: Sequelize.STRING, unique: true, defaultValue: Sequelize.UUIDV1 },
  unique_value:        { type: Sequelize.STRING, unique: true, defaultValue: uniqueValue }
}, { freezeTableName: true, underscored: true });

export const Blockings = sequelize.define('blockings', {
  user_id:             { type: Sequelize.INTEGER, allowNull: false, references: { model: Users, key: 'id' } },
  blocks_id:           { type: Sequelize.INTEGER, allowNull: false, references: { model: Users, key: 'id' } },
  date_created:        { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
  uuid:                { type: Sequelize.STRING, unique: true, defaultValue: Sequelize.UUIDV1 }
}, { freezeTableName: true, underscored: true });

export const Follows = sequelize.define('follows', {
  user_id:             { type: Sequelize.INTEGER, allowNull: false, references: { model: Users, key: 'id' } },
  follows_id:          { type: Sequelize.INTEGER, allowNull: false, references: { model: Users, key: 'id' } },
  date_created:        { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
  uuid:                { type: Sequelize.STRING, unique: true, defaultValue: Sequelize.UUIDV1 }
}, { freezeTableName: true, underscored: true });

export const FollowRequests = sequelize.define('follow_requests', {
  user_id:             { type: Sequelize.INTEGER, allowNull: false, references: { model: Users, key: 'id' } },
  follows_id:          { type: Sequelize.INTEGER, allowNull: false, references: { model: Users, key: 'id' } },
  date_created:        { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
  uuid:                { type: Sequelize.STRING, unique: true, defaultValue: Sequelize.UUIDV1 }
}, { freezeTableName: true, underscored: true });

export const UserRatings = sequelize.define('user_reviews', {
  user_id:             { type: Sequelize.INTEGER, allowNull: false, references: { model: Users, key: 'id' } },
  writer_id:           { type: Sequelize.INTEGER, allowNull: false, references: { model: Users, key: 'id' } },
  rating:              { type: Sequelize.INTEGER, allowNull: false, defaultValue: 5 },
  summary:             { type: Sequelize.STRING(250), allowNull: true, defaultValue: '' },
  date_created:        { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
  uuid:                { type: Sequelize.STRING, unique: true, defaultValue: Sequelize.UUIDV1 }
}, { freezeTableName: true, underscored: true });

export const Notifications = sequelize.define('notifications', {
  from_id:             { type: Sequelize.INTEGER, allowNull: false, references: { model: Users, key: 'id' } },
  to_id:               { type: Sequelize.INTEGER, allowNull: false, references: { model: Users, key: 'id' } },
  action:              { type: Sequelize.STRING, allowNull: false, defaultValue: '' },
  target_type:         { type: Sequelize.STRING, allowNull: false, defaultValue: '' },
  target_id:           { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
  message:             { type: Sequelize.STRING(500), allowNull: false, defaultValue: '' },
  link:                { type: Sequelize.STRING, allowNull: false, defaultValue: '' },
  read:                { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
  image_link:          { type: Sequelize.STRING(500), allowNull: true, defaultValue: '' },
  image_id:            { type: Sequelize.STRING(500), allowNull: true, defaultValue: '' },
  date_created:        { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
  uuid:                { type: Sequelize.STRING, defaultValue: Sequelize.UUIDV1 }
}, { freezeTableName: true, underscored: true });

export const ContentSubscriptions = sequelize.define('content_subscriptions', {
  user_id:                    { type: Sequelize.INTEGER, allowNull: false, references: { model: Users, key: 'id' } },
  subscribes_to_id:           { type: Sequelize.INTEGER, allowNull: false, references: { model: Users, key: 'id' } },
  subscribe_content_type:     { type: Sequelize.STRING, allowNull: false },
  date_created:               { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
  uuid:                       { type: Sequelize.STRING, defaultValue: Sequelize.UUIDV1 }
}, { freezeTableName: true, underscored: true });

export const Conversations = sequelize.define('conversations', {
  creator_id:          { type: Sequelize.INTEGER, allowNull: false, references: { model: Users, key: 'id' } },
  date_created:        { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
  uuid:                { type: Sequelize.STRING, defaultValue: Sequelize.UUIDV1 }
}, { freezeTableName: true, underscored: true });


export const ConversationMembers = sequelize.define('conversation_members', {
  conversation_id:     { type: Sequelize.INTEGER, allowNull: false, references: { model: Conversations, key: 'id' } },
  user_id:             { type: Sequelize.INTEGER, allowNull: false, references: { model: Users, key: 'id' } },
  date_created:        { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
  uuid:                { type: Sequelize.STRING, defaultValue: Sequelize.UUIDV1 }
}, { freezeTableName: true, underscored: true });


export const ConversationMessages = sequelize.define('conversation_messages', {
  conversation_id:    { type: Sequelize.INTEGER, allowNull: false, references: { model: Conversations, key: 'id' } },
  user_id:            { type: Sequelize.INTEGER, allowNull: false, references: { model: Users, key: 'id' } },
  body:               { type: Sequelize.STRING(500), allowNull: true, defaultValue: '' },
  opened:             { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
  date_created:       { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
  uuid:               { type: Sequelize.STRING, defaultValue: Sequelize.UUIDV1 }
}, { freezeTableName: true, underscored: true });


export const MessageSenders = sequelize.define('message_senders', {
  user_id:            { type: Sequelize.INTEGER, allowNull: false, references: { model: Users, key: 'id' } },
  sender_id:          { type: Sequelize.INTEGER, allowNull: false, references: { model: Users, key: 'id' } },
  date_created:       { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
  uuid:               { type: Sequelize.STRING, defaultValue: Sequelize.UUIDV1 }
}, { freezeTableName: true, underscored: true });


export const Messages = sequelize.define('messages', {
  sender_id:              { type: Sequelize.INTEGER, allowNull: false, references: { model: Users, key: 'id' } },
  recipient_id:           { type: Sequelize.INTEGER, allowNull: false, references: { model: Users, key: 'id' } },
  content:                { type: Sequelize.STRING(500), allowNull: true, defaultValue: '' },
  opened:                 { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
  date_created:           { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
  uuid:                   { type: Sequelize.STRING, defaultValue: Sequelize.UUIDV1 }
}, { freezeTableName: true, underscored: true });

export const Photos = sequelize.define('photos', {
  owner_id:            { type: Sequelize.INTEGER, allowNull: false, references: { model: Users, key: 'id' } },
  caption:             { type: Sequelize.STRING(250), allowNull: false },
  photo_link:          { type: Sequelize.STRING(500), allowNull: false },
  photo_id:            { type: Sequelize.STRING(500), allowNull: false },
  is_explicit:         { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
  is_private:          { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
  date_created:        { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
  uuid:                { type: Sequelize.STRING, defaultValue: Sequelize.UUIDV1 }
}, { freezeTableName: true, underscored: true });


export const Videos = sequelize.define('videos', {
  owner_id:            { type: Sequelize.INTEGER, allowNull: false, references: { model: Users, key: 'id' } },
  caption:             { type: Sequelize.STRING(250), allowNull: false },
  video_link:          { type: Sequelize.STRING(500), allowNull: false },
  video_id:            { type: Sequelize.STRING(500), allowNull: false },
  is_explicit:         { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
  is_private:          { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
  date_created:        { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
  uuid:                { type: Sequelize.STRING, defaultValue: Sequelize.UUIDV1 }
}, { freezeTableName: true, underscored: true });


export const Audios = sequelize.define('audios', {
  owner_id:            { type: Sequelize.INTEGER, allowNull: false, references: { model: Users, key: 'id' } },
  caption:             { type: Sequelize.STRING(250), allowNull: false },
  audio_link:          { type: Sequelize.STRING(500), allowNull: false },
  audio_id:            { type: Sequelize.STRING(500), allowNull: false },
  is_explicit:         { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
  is_private:          { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
  date_created:        { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
  uuid:                { type: Sequelize.STRING, defaultValue: Sequelize.UUIDV1 }
}, { freezeTableName: true, underscored: true });

export const Posts = sequelize.define('posts', {
  owner_id:            { type: Sequelize.INTEGER, allowNull: false, references: { model: Users, key: 'id' } },
  title:               { type: Sequelize.STRING(250), allowNull: false },
  body:                { type: Sequelize.TEXT, allowNull: false },
  tags:                { type: Sequelize.TEXT, allowNull: true },
  is_explicit:         { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
  is_private:          { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
  date_created:        { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
  last_edited:         { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
  uuid:                { type: Sequelize.STRING, defaultValue: Sequelize.UUIDV1 }
}, { freezeTableName: true, underscored: true });

export const PostViewers = sequelize.define('post_viewers', {
  owner_id:            { type: Sequelize.INTEGER, allowNull: false, references: { model: Users, key: 'id' } },
  user_id:             { type: Sequelize.INTEGER, allowNull: false, references: { model: Users, key: 'id' } },
  post_id:             { type: Sequelize.INTEGER, allowNull: false, references: { model: Posts, key: 'id' } },
  date_created:        { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
  uuid:                { type: Sequelize.STRING, defaultValue: Sequelize.UUIDV1 }
}, { freezeTableName: true, underscored: true });

export const PostPhotos = sequelize.define('post_photos', {
  post_id:             { type: Sequelize.INTEGER, allowNull: false, references: { model: Posts, key: 'id' } },
  photo_id:            { type: Sequelize.INTEGER, allowNull: false, references: { model: Photos, key: 'id' } },
  date_created:        { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
  uuid:                { type: Sequelize.STRING, defaultValue: Sequelize.UUIDV1 }
}, { freezeTableName: true, underscored: true });

export const PostVideos = sequelize.define('post_videos', {
  post_id:             { type: Sequelize.INTEGER, allowNull: false, references: { model: Posts, key: 'id' } },
  video_id:            { type: Sequelize.INTEGER, allowNull: false, references: { model: Videos, key: 'id' } },
  date_created:        { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
  uuid:                { type: Sequelize.STRING, defaultValue: Sequelize.UUIDV1 }
}, { freezeTableName: true, underscored: true });

export const PostAudios = sequelize.define('post_photos', {
  post_id:             { type: Sequelize.INTEGER, allowNull: false, references: { model: Posts, key: 'id' } },
  audio_id:            { type: Sequelize.INTEGER, allowNull: false, references: { model: Audios, key: 'id' } },
  date_created:        { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
  uuid:                { type: Sequelize.STRING, defaultValue: Sequelize.UUIDV1 }
}, { freezeTableName: true, underscored: true });

export const PostComments = sequelize.define('post_comments', {
  owner_id:            { type: Sequelize.INTEGER, allowNull: false, references: { model: Users, key: 'id' } },
  post_id:             { type: Sequelize.INTEGER, allowNull: false, references: { model: Posts, key: 'id' } },
  body:                { type: Sequelize.TEXT, allowNull: false },
  date_created:        { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
  last_edited:         { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
  uuid:                { type: Sequelize.STRING, defaultValue: Sequelize.UUIDV1 }
}, { freezeTableName: true, underscored: true });

export const PostCommentReplies = sequelize.define('post_comment_replies', {
  owner_id:            { type: Sequelize.INTEGER, allowNull: false, references: { model: Users, key: 'id' } },
  comment_id:          { type: Sequelize.INTEGER, allowNull: false, references: { model: PostComments, key: 'id' } },
  body:                { type: Sequelize.TEXT, allowNull: false },
  date_created:        { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
  last_edited:         { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
  uuid:                { type: Sequelize.STRING, defaultValue: Sequelize.UUIDV1 }
}, { freezeTableName: true, underscored: true });

export const PostReactions = sequelize.define('post_reactions', {
  owner_id:            { type: Sequelize.INTEGER, allowNull: false, references: { model: Users, key: 'id' } },
  post_id:             { type: Sequelize.INTEGER, allowNull: false, references: { model: Posts, key: 'id' } },
  reaction_id:         { type: Sequelize.INTEGER, allowNull: false },
  date_created:        { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
  last_edited:         { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
  uuid:                { type: Sequelize.STRING, defaultValue: Sequelize.UUIDV1 }
}, { freezeTableName: true, underscored: true });

export const PostCommentReactions = sequelize.define('post_comment_reactions', {
  owner_id:            { type: Sequelize.INTEGER, allowNull: false, references: { model: Users, key: 'id' } },
  comment_id:          { type: Sequelize.INTEGER, allowNull: false, references: { model: PostComments, key: 'id' } },
  reaction_id:         { type: Sequelize.INTEGER, allowNull: false },
  date_created:        { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
  last_edited:         { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
  uuid:                { type: Sequelize.STRING, defaultValue: Sequelize.UUIDV1 }
}, { freezeTableName: true, underscored: true });

export const PostCommentReplyReactions = sequelize.define('post_comment_reply_reactions', {
  owner_id:            { type: Sequelize.INTEGER, allowNull: false, references: { model: Users, key: 'id' } },
  reply_id:            { type: Sequelize.INTEGER, allowNull: false, references: { model: PostCommentReplies, key: 'id' } },
  reaction_id:         { type: Sequelize.INTEGER, allowNull: false },
  date_created:        { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
  last_edited:         { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
  uuid:                { type: Sequelize.STRING, defaultValue: Sequelize.UUIDV1 }
}, { freezeTableName: true, underscored: true });

export const AccountsReported = sequelize.define('accounts_reported', {
  user_id:               { type: Sequelize.INTEGER, allowNull: false, references: { model: Users, key: 'id' } },
  reporting_id:          { type: Sequelize.INTEGER, allowNull: false, references: { model: Users, key: 'id' } },
  type:                  { type: Sequelize.STRING(250), allowNull: false },
  details:               { type: Sequelize.TEXT, allowNull: false },
  date_created:          { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
  uuid:                  { type: Sequelize.STRING, defaultValue: Sequelize.UUIDV1 }
}, { freezeTableName: true, underscored: true });

sequelize.sync({ force: false })
  .then(() => { console.log('Database Initialized! ENV: ' + db_env); })
  .catch((error) => { console.log('Database Failed!', error); });
