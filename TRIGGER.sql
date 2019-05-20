CREATE OR REPLACE FUNCTION deleteUserVideos() RETURNS trigger AS
$BODY$
DECLARE
  nb integer;
  BEGIN
    DELETE
    FROM "Videos"
    WHERE "PlaylistPlaylistId" IS NULL;
    RETURN null;
  END;
$BODY$ LANGUAGE plpgsql;

CREATE TRIGGER deleteUserVideos
  AFTER DELETE
  ON "Playlists"
  FOR EACH ROW
  EXECUTE PROCEDURE deleteUserVideos();

CREATE OR REPLACE FUNCTION deleteUserPlaylist() RETURNS trigger AS
$BODY$
DECLARE
  nb integer;
  BEGIN
    DELETE
    FROM "Playlists"
    WHERE "Playlists"."UserUserId" IS NULL;
    RETURN null;
  END;
$BODY$ LANGUAGE plpgsql;


CREATE TRIGGER deleteUserPlaylist
  AFTER DELETE
  ON "Users"
  FOR EACH ROW
  EXECUTE PROCEDURE deleteUserPlaylist();

CREATE OR REPLACE FUNCTION updateVideoNumber() RETURNS trigger AS
$BODY$
DECLARE
  BEGIN
    UPDATE "Playlists"
    SET "playlistVideoNbr" = subquery.videoNbr
    FROM (
      SELECT "PlaylistPlaylistId", count(*) as videoNbr
      FROM "Videos", "Playlists"
      WHERE "Videos"."PlaylistPlaylistId" = "Playlists"."playlistId"
      GROUP BY "PlaylistPlaylistId"
    ) AS subquery
    WHERE "Playlists"."playlistId" = subquery."PlaylistPlaylistId";
    RETURN null;
  END;
$BODY$ LANGUAGE plpgsql;


CREATE TRIGGER updateVideoNumber
  AFTER INSERT OR UPDATE
  ON "Videos"
  FOR EACH ROW
  EXECUTE PROCEDURE updateVideoNumber();
