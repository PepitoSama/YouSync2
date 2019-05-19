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
