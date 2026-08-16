/*==================================================
 NGEPAS REBORN
 File   : productStatusMigration.js
 Module : Product Status Database Migration
==================================================*/

const PRODUCT_STATUS_DEFAULT = "published";

function hasProductStatusColumn(db) {
  return db
    .prepare("PRAGMA table_info(products)")
    .all()
    .some((column) => column.name === "status");
}

function migrateProductStatus(db) {
  if (!hasProductStatusColumn(db)) {
    db.exec(
      `ALTER TABLE products ADD COLUMN status TEXT NOT NULL DEFAULT '${PRODUCT_STATUS_DEFAULT}'`,
    );
  }

  db.prepare(
    "UPDATE products SET status = ? WHERE status IS NULL OR status = ''",
  ).run(PRODUCT_STATUS_DEFAULT);
}

module.exports = migrateProductStatus;
module.exports.PRODUCT_STATUS_DEFAULT = PRODUCT_STATUS_DEFAULT;

/*==================================================
 END OF FILE
==================================================*/

