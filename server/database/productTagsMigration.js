/*==================================================
 NGEPAS REBORN
 File   : productTagsMigration.js
 Module : Product Tags Migration
==================================================*/

function hasProductTagsColumn(db) {
  const columns = db.prepare("PRAGMA table_info(products)").all();
  return columns.some((column) => column.name === "tags");
}

function migrateProductTags(db) {
  if (!hasProductTagsColumn(db)) {
    db.exec(
      "ALTER TABLE products ADD COLUMN tags TEXT NOT NULL DEFAULT '[]'",
    );
  }

  db.prepare(
    "UPDATE products SET tags = '[]' WHERE tags IS NULL OR trim(tags) = ''",
  ).run();
}

module.exports = migrateProductTags;

/*==================================================
 END OF FILE
==================================================*/
