DROP VIEW IF EXISTS events_posts_view;
CREATE VIEW events_posts_view
AS
  SELECT ep.event_id, u.name, u.username, u.has_img, ep.post
  FROM users u
  INNER JOIN events_posts ep
  ON ep.user_id = u.id;

DROP VIEW IF EXISTS communities_posts_view;
CREATE VIEW communities_posts_view
AS
  SELECT cp.community_id, u.name, u.username, u.has_img, cp.post
  FROM users u
  INNER JOIN communities_posts cp
  ON cp.user_id = u.id;
