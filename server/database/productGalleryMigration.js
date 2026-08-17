/*==================================================
 NGEPAS REBORN
 File   : productGalleryMigration.js
 Module : Product Gallery Migration
==================================================*/

function hasProductGalleryColumn(db) {
  const columns = db.prepare("PRAGMA table_info(products)").all();
  return columns.some((column) => column.name === "gallery");
}

function migrateProductGallery(db) {
  if (!hasProductGalleryColumn(db)) {
    db.exec(
      "ALTER TABLE products ADD COLUMN gallery TEXT NOT NULL DEFAULT '[]'",
    );
  }

  db.prepare(
    "UPDATE products SET gallery = '[]' WHERE gallery IS NULL OR trim(gallery) = ''",
  ).run();
}

module.exports = migrateProductGallery;

/*==================================================
 END OF FILE
==================================================*/
