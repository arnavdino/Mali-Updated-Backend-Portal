-- PACFIS 2026/2027 kit catalog import.
-- Source: /Users/arnav/Documents/Kits.pdf
--
-- Safe to re-run: existing KIT-001 through KIT-046 products and kit rows are
-- updated, while only components belonging to those kits are replaced.
-- No transaction, customer, vendor, or unrelated product data is modified.
--
-- KIT-046 applies to all three crops and coverage sizes. Its relational parent
-- is Sesame and coverage is stored as 0.00 because the current schema supports
-- one category and one numeric coverage value per kit.

START TRANSACTION;

DROP TEMPORARY TABLE IF EXISTS pacfis_kit_seed;
CREATE TEMPORARY TABLE pacfis_kit_seed (
  reference VARCHAR(20) NOT NULL PRIMARY KEY,
  scenario VARCHAR(100) NOT NULL,
  crop VARCHAR(100) NOT NULL,
  category_name VARCHAR(100) NOT NULL,
  coverage_hectares DECIMAL(10,2) NOT NULL,
  total_cost DECIMAL(15,0) NOT NULL,
  unit_advance DECIMAL(15,0) NOT NULL,
  repayment_quantity DECIMAL(12,3) NOT NULL,
  composition TEXT NOT NULL
);

INSERT INTO pacfis_kit_seed
  (reference, scenario, crop, category_name, coverage_hectares, total_cost, unit_advance, repayment_quantity, composition)
VALUES
  ('KIT-001', 'KIT complet', 'Sesame', 'Sesame', 1.00, 90500, 20000, 176, 'Engrais : 1 sac NPK + 1 sac Uree | Herbicide : 2 bidons de 1 L | Insecticide : 1 sachet | Appui conseil : 1'),
  ('KIT-002', 'KIT complet', 'Sesame', 'Sesame', 0.50, 51500, 10000, 104, 'Engrais : 0.5 sac NPK + 0.5 sac Uree | Herbicide : 1 bidon de 1 L | Insecticide : 1 sachet | Appui conseil : 1'),
  ('KIT-003', 'KIT complet', 'Sesame', 'Sesame', 0.25, 33750, 6000, 69, 'Engrais : 0.25 sac NPK + 0.25 sac Uree | Herbicide : 1 bidon de 1 L | Insecticide : 1 sachet | Appui conseil : 1'),
  ('KIT-004', 'KIT complet', 'Arachide', 'Arachide', 1.00, 98000, 20000, 312, 'Engrais : 2 sacs NPK | Herbicide : 2 bidons de 1 L | Insecticide : 4 bidons de 250 ml | Appui conseil : 1'),
  ('KIT-005', 'KIT complet', 'Arachide', 'Arachide', 0.50, 52000, 10000, 168, 'Engrais : 1 sac NPK | Herbicide : 1 bidon de 1 L | Insecticide : 2 bidons de 250 ml | Appui conseil : 1'),
  ('KIT-006', 'KIT complet', 'Arachide', 'Arachide', 0.25, 30750, 6000, 99, 'Engrais : 0.5 sac NPK | Herbicide : 1 bidon de 1 L | Insecticide : 1 bidon de 250 ml | Appui conseil : 1'),
  ('KIT-007', 'KIT complet', 'Soja', 'Soja', 1.00, 98000, 20000, 390, 'Engrais : 1 sac NPK + 1 sac Uree | Herbicide : 2 bidons de 1 L | Insecticide : 4 bidons de 250 ml | Appui conseil : 1'),
  ('KIT-008', 'KIT complet', 'Soja', 'Soja', 0.50, 52000, 10000, 210, 'Engrais : 0.5 sac NPK + 0.5 sac Uree | Herbicide : 1 bidon de 1 L | Insecticide : 2 bidons de 250 ml | Appui conseil : 1'),
  ('KIT-009', 'KIT complet', 'Soja', 'Soja', 0.25, 30750, 6000, 124, 'Engrais : 0.25 sac NPK + 0.25 sac Uree | Herbicide : 1 bidon de 1 L | Insecticide : 1 bidon de 250 ml | Appui conseil : 1'),
  ('KIT-010', 'KIT sans herbicide', 'Sesame', 'Sesame', 1.00, 83500, 20000, 159, 'Engrais : 1 sac NPK + 1 sac Uree | Insecticide : 1 sachet | Appui conseil : 1'),
  ('KIT-011', 'KIT sans herbicide', 'Sesame', 'Sesame', 0.50, 48000, 10000, 95, 'Engrais : 0.5 sac NPK + 0.5 sac Uree | Insecticide : 1 sachet | Appui conseil : 1'),
  ('KIT-012', 'KIT sans herbicide', 'Sesame', 'Sesame', 0.25, 30250, 6000, 61, 'Engrais : 0.25 sac NPK + 0.25 sac Uree | Insecticide : 1 sachet | Appui conseil : 1'),
  ('KIT-013', 'KIT sans herbicide', 'Arachide', 'Arachide', 1.00, 91000, 20000, 284, 'Engrais : 2 sacs NPK | Insecticide : 4 bidons de 250 ml | Appui conseil : 1'),
  ('KIT-014', 'KIT sans herbicide', 'Arachide', 'Arachide', 0.50, 48500, 10000, 154, 'Engrais : 1 sac NPK | Insecticide : 2 bidons de 250 ml | Appui conseil : 1'),
  ('KIT-015', 'KIT sans herbicide', 'Arachide', 'Arachide', 0.25, 27250, 6000, 85, 'Engrais : 0.5 sac NPK | Insecticide : 1 bidon de 250 ml | Appui conseil : 1'),
  ('KIT-016', 'KIT sans herbicide', 'Soja', 'Soja', 1.00, 91000, 20000, 355, 'Engrais : 1 sac NPK + 1 sac Uree | Insecticide : 4 bidons de 250 ml | Appui conseil : 1'),
  ('KIT-017', 'KIT sans herbicide', 'Soja', 'Soja', 0.50, 48500, 10000, 193, 'Engrais : 0.5 sac NPK + 0.5 sac Uree | Insecticide : 2 bidons de 250 ml | Appui conseil : 1'),
  ('KIT-018', 'KIT sans herbicide', 'Soja', 'Soja', 0.25, 27250, 6000, 106, 'Engrais : 0.25 sac NPK + 0.25 sac Uree | Insecticide : 1 bidon de 250 ml | Appui conseil : 1'),
  ('KIT-019', 'KIT sans insecticide', 'Sesame', 'Sesame', 1.00, 84000, 20000, 160, 'Engrais : 1 sac NPK + 1 sac Uree | Herbicide : 2 bidons de 1 L | Appui conseil : 1'),
  ('KIT-020', 'KIT sans insecticide', 'Sesame', 'Sesame', 0.50, 45000, 10000, 88, 'Engrais : 0.5 sac NPK + 0.5 sac Uree | Herbicide : 1 bidon de 1 L | Appui conseil : 1'),
  ('KIT-021', 'KIT sans insecticide', 'Sesame', 'Sesame', 0.25, 27250, 6000, 53, 'Engrais : 0.25 sac NPK + 0.25 sac Uree | Herbicide : 1 bidon de 1 L | Appui conseil : 1'),
  ('KIT-022', 'KIT sans insecticide', 'Arachide', 'Arachide', 1.00, 84000, 20000, 256, 'Engrais : 2 sacs NPK | Herbicide : 2 bidons de 1 L | Appui conseil : 1'),
  ('KIT-023', 'KIT sans insecticide', 'Arachide', 'Arachide', 0.50, 45000, 10000, 140, 'Engrais : 1 sac NPK | Herbicide : 1 bidon de 1 L | Appui conseil : 1'),
  ('KIT-024', 'KIT sans insecticide', 'Arachide', 'Arachide', 0.25, 27250, 6000, 85, 'Engrais : 0.5 sac NPK | Herbicide : 1 bidon de 1 L | Appui conseil : 1'),
  ('KIT-025', 'KIT sans insecticide', 'Soja', 'Soja', 1.00, 84000, 20000, 320, 'Engrais : 1 sac NPK + 1 sac Uree | Herbicide : 2 bidons de 1 L | Appui conseil : 1'),
  ('KIT-026', 'KIT sans insecticide', 'Soja', 'Soja', 0.50, 45000, 10000, 175, 'Engrais : 0.5 sac NPK + 0.5 sac Uree | Herbicide : 1 bidon de 1 L | Appui conseil : 1'),
  ('KIT-027', 'KIT sans insecticide', 'Soja', 'Soja', 0.25, 27250, 6000, 106, 'Engrais : 0.25 sac NPK + 0.25 sac Uree | Herbicide : 1 bidon de 1 L | Appui conseil : 1'),
  ('KIT-028', 'KIT sans engrais', 'Sesame', 'Sesame', 1.00, 19500, 10000, 24, 'Herbicide : 2 bidons de 1 L | Insecticide : 1 sachet | Appui conseil : 1'),
  ('KIT-029', 'KIT sans engrais', 'Sesame', 'Sesame', 0.50, 16000, 6000, 25, 'Herbicide : 1 bidon de 1 L | Insecticide : 1 sachet | Appui conseil : 1'),
  ('KIT-030', 'KIT sans engrais', 'Sesame', 'Sesame', 0.25, 16000, 6000, 25, 'Herbicide : 1 bidon de 1 L | Insecticide : 1 sachet | Appui conseil : 1'),
  ('KIT-031', 'KIT sans engrais', 'Arachide', 'Arachide', 1.00, 27000, 10000, 68, 'Herbicide : 2 bidons de 1 L | Insecticide : 4 bidons de 250 ml | Appui conseil : 1'),
  ('KIT-032', 'KIT sans engrais', 'Arachide', 'Arachide', 0.50, 16500, 6000, 42, 'Herbicide : 1 bidon de 1 L | Insecticide : 2 bidons de 250 ml | Appui conseil : 1'),
  ('KIT-033', 'KIT sans engrais', 'Arachide', 'Arachide', 0.25, 13000, 6000, 28, 'Herbicide : 1 bidon de 1 L | Insecticide : 1 bidon de 250 ml | Appui conseil : 1'),
  ('KIT-034', 'KIT sans engrais', 'Soja', 'Soja', 1.00, 27000, 10000, 85, 'Herbicide : 2 bidons de 1 L | Insecticide : 4 bidons de 250 ml | Appui conseil : 1'),
  ('KIT-035', 'KIT sans engrais', 'Soja', 'Soja', 0.50, 16500, 6000, 53, 'Herbicide : 1 bidon de 1 L | Insecticide : 2 bidons de 250 ml | Appui conseil : 1'),
  ('KIT-036', 'KIT sans engrais', 'Soja', 'Soja', 0.25, 13000, 6000, 35, 'Herbicide : 1 bidon de 1 L | Insecticide : 1 bidon de 250 ml | Appui conseil : 1'),
  ('KIT-037', 'KIT sans herbicide et sans insecticide', 'Sesame', 'Sesame', 1.00, 77000, 20000, 143, 'Engrais : 1 sac NPK + 1 sac Uree | Appui conseil : 1'),
  ('KIT-038', 'KIT sans herbicide et sans insecticide', 'Sesame', 'Sesame', 0.50, 41500, 10000, 79, 'Engrais : 0.5 sac NPK + 0.5 sac Uree | Appui conseil : 1'),
  ('KIT-039', 'KIT sans herbicide et sans insecticide', 'Sesame', 'Sesame', 0.25, 23750, 6000, 44, 'Engrais : 0.25 sac NPK + 0.25 sac Uree | Appui conseil : 1'),
  ('KIT-040', 'KIT sans herbicide et sans insecticide', 'Arachide', 'Arachide', 1.00, 77000, 20000, 228, 'Engrais : 2 sacs NPK | Appui conseil : 1'),
  ('KIT-041', 'KIT sans herbicide et sans insecticide', 'Arachide', 'Arachide', 0.50, 41500, 10000, 126, 'Engrais : 1 sac NPK | Appui conseil : 1'),
  ('KIT-042', 'KIT sans herbicide et sans insecticide', 'Arachide', 'Arachide', 0.25, 23750, 6000, 71, 'Engrais : 0.5 sac NPK | Appui conseil : 1'),
  ('KIT-043', 'KIT sans herbicide et sans insecticide', 'Soja', 'Soja', 1.00, 77000, 20000, 285, 'Engrais : 1 sac NPK + 1 sac Uree | Appui conseil : 1'),
  ('KIT-044', 'KIT sans herbicide et sans insecticide', 'Soja', 'Soja', 0.50, 41500, 10000, 158, 'Engrais : 0.5 sac NPK + 0.5 sac Uree | Appui conseil : 1'),
  ('KIT-045', 'KIT sans herbicide et sans insecticide', 'Soja', 'Soja', 0.25, 23750, 6000, 89, 'Engrais : 0.25 sac NPK + 0.25 sac Uree | Appui conseil : 1'),
  ('KIT-046', 'Sans KIT', 'Sesame, Soja, Arachide', 'Sesame', 0.00, 6000, 6000, 0, 'Appui conseil : 1');

-- Create the crop categories needed by the catalog. Existing categories are retained.
INSERT INTO product
  (id, name, price, reward_ratio, unit, description, long_description, status, type,
   product_kind, tracks_inventory, presentation, num_avail, num_left, image_url, level)
SELECT UUID(), source.category_name, 0, 0, '', source.category_name, NULL, 'active', 'product',
       'ITEM', 0, 'none', 0, 0, '/lime.svg', 'category'
FROM (SELECT DISTINCT category_name FROM pacfis_kit_seed) source
LEFT JOIN product existing
  ON existing.name = source.category_name
  AND existing.level = 'category'
WHERE existing.id IS NULL;

-- First give legacy linked products a deterministic temporary name. This avoids
-- a legacy product such as the KIT-001 product being named "KIT-002" blocking
-- the creation of the actual KIT-002 product.
UPDATE product product
INNER JOIN kit kit ON kit.product_id = product.id
INNER JOIN pacfis_kit_seed seed ON seed.reference = kit.reference
SET product.name = CONCAT('__PACFIS_', seed.reference);

-- Add a distinct product for every kit reference that does not already have a
-- kit row. Temporary names prevent collisions with legacy product names.
INSERT INTO product
  (id, name, price, reward_ratio, unit, description, long_description, status, type,
   product_kind, tracks_inventory, presentation, num_avail, num_left, image_url, parent_id, level)
SELECT UUID(), CONCAT('__PACFIS_', seed.reference), seed.unit_advance, 0, 'kg', seed.reference, seed.composition,
       'active', 'product', 'KIT', 0, 'none', 0, 0, '/lime.svg', category.id, 'product'
FROM pacfis_kit_seed seed
INNER JOIN product category
  ON category.name = seed.category_name AND category.level = 'category'
LEFT JOIN kit existing_kit ON existing_kit.reference = seed.reference
WHERE existing_kit.id IS NULL;

-- Create missing kit rows, then make every seeded kit authoritative.
INSERT INTO kit
  (id, product_id, reference, campaign, scenario, crop, coverage_hectares,
   unit_advance_fcfa, repayment_quantity, repayment_unit, is_active)
SELECT UUID(), product.id, seed.reference, '3', seed.scenario, seed.crop,
       seed.coverage_hectares, seed.total_cost, seed.repayment_quantity, 'kg', 1
FROM pacfis_kit_seed seed
INNER JOIN product product
  ON product.name = CONCAT('__PACFIS_', seed.reference) AND product.level = 'product'
LEFT JOIN kit existing ON existing.reference = seed.reference
WHERE existing.id IS NULL;

UPDATE product product
INNER JOIN kit kit ON kit.product_id = product.id
INNER JOIN pacfis_kit_seed seed ON seed.reference = kit.reference
INNER JOIN product category
  ON category.name = seed.category_name AND category.level = 'category'
SET product.name = seed.reference,
    product.price = seed.unit_advance,
    product.reward_ratio = 0,
    product.unit = 'kg',
    product.description = seed.reference,
    product.long_description = seed.composition,
    product.status = 'active',
    product.type = 'product',
    product.product_kind = 'KIT',
    product.tracks_inventory = 0,
    product.presentation = 'none',
    product.num_avail = 0,
    product.num_left = 0,
    product.image_url = '/lime.svg',
    product.parent_id = category.id,
    product.level = 'product';

UPDATE kit
INNER JOIN pacfis_kit_seed seed ON seed.reference = kit.reference
SET kit.campaign = '3',
    kit.scenario = seed.scenario,
    kit.crop = seed.crop,
    kit.coverage_hectares = seed.coverage_hectares,
    kit.unit_advance_fcfa = seed.total_cost,
    kit.repayment_quantity = seed.repayment_quantity,
    kit.repayment_unit = 'kg',
    kit.is_active = 1;

DROP TEMPORARY TABLE IF EXISTS pacfis_component_seed;
CREATE TEMPORARY TABLE pacfis_component_seed (
  reference VARCHAR(20) NOT NULL,
  component_name VARCHAR(100) NOT NULL,
  quantity_per_kit DECIMAL(12,3) NOT NULL,
  unit VARCHAR(100) NOT NULL,
  display_order INT NOT NULL,
  PRIMARY KEY (reference, component_name)
);

-- Each component uses the same names and unit values as the KIT-003 editor.
INSERT INTO pacfis_component_seed
  (reference, component_name, quantity_per_kit, unit, display_order)
VALUES
  ('KIT-001', 'NPK', 1, 'sac', 0), ('KIT-001', 'Uree', 1, 'sac', 1), ('KIT-001', 'Herbicide', 2, 'bidons de 1L', 2), ('KIT-001', 'Insecticide', 1, 'sachet', 3), ('KIT-001', 'Appui conseil', 1, 'ea', 4),
  ('KIT-002', 'NPK', 0.5, 'sac', 0), ('KIT-002', 'Uree', 0.5, 'sac', 1), ('KIT-002', 'Herbicide', 1, 'bidons de 1L', 2), ('KIT-002', 'Insecticide', 1, 'sachet', 3), ('KIT-002', 'Appui conseil', 1, 'ea', 4),
  ('KIT-003', 'NPK', 0.25, 'sac', 0), ('KIT-003', 'Uree', 0.25, 'sac', 1), ('KIT-003', 'Herbicide', 1, 'bidons de 1L', 2), ('KIT-003', 'Insecticide', 1, 'sachet', 3), ('KIT-003', 'Appui conseil', 1, 'ea', 4),
  ('KIT-004', 'NPK', 2, 'sac', 0), ('KIT-004', 'Herbicide', 2, 'bidons de 1L', 1), ('KIT-004', 'Insecticide', 4, 'bidons de 250 ml', 2), ('KIT-004', 'Appui conseil', 1, 'ea', 3),
  ('KIT-005', 'NPK', 1, 'sac', 0), ('KIT-005', 'Herbicide', 1, 'bidons de 1L', 1), ('KIT-005', 'Insecticide', 2, 'bidons de 250 ml', 2), ('KIT-005', 'Appui conseil', 1, 'ea', 3),
  ('KIT-006', 'NPK', 0.5, 'sac', 0), ('KIT-006', 'Herbicide', 1, 'bidons de 1L', 1), ('KIT-006', 'Insecticide', 1, 'bidons de 250 ml', 2), ('KIT-006', 'Appui conseil', 1, 'ea', 3),
  ('KIT-007', 'NPK', 1, 'sac', 0), ('KIT-007', 'Uree', 1, 'sac', 1), ('KIT-007', 'Herbicide', 2, 'bidons de 1L', 2), ('KIT-007', 'Insecticide', 4, 'bidons de 250 ml', 3), ('KIT-007', 'Appui conseil', 1, 'ea', 4),
  ('KIT-008', 'NPK', 0.5, 'sac', 0), ('KIT-008', 'Uree', 0.5, 'sac', 1), ('KIT-008', 'Herbicide', 1, 'bidons de 1L', 2), ('KIT-008', 'Insecticide', 2, 'bidons de 250 ml', 3), ('KIT-008', 'Appui conseil', 1, 'ea', 4),
  ('KIT-009', 'NPK', 0.25, 'sac', 0), ('KIT-009', 'Uree', 0.25, 'sac', 1), ('KIT-009', 'Herbicide', 1, 'bidons de 1L', 2), ('KIT-009', 'Insecticide', 1, 'bidons de 250 ml', 3), ('KIT-009', 'Appui conseil', 1, 'ea', 4),
  ('KIT-010', 'NPK', 1, 'sac', 0), ('KIT-010', 'Uree', 1, 'sac', 1), ('KIT-010', 'Insecticide', 1, 'sachet', 2), ('KIT-010', 'Appui conseil', 1, 'ea', 3),
  ('KIT-011', 'NPK', 0.5, 'sac', 0), ('KIT-011', 'Uree', 0.5, 'sac', 1), ('KIT-011', 'Insecticide', 1, 'sachet', 2), ('KIT-011', 'Appui conseil', 1, 'ea', 3),
  ('KIT-012', 'NPK', 0.25, 'sac', 0), ('KIT-012', 'Uree', 0.25, 'sac', 1), ('KIT-012', 'Insecticide', 1, 'sachet', 2), ('KIT-012', 'Appui conseil', 1, 'ea', 3),
  ('KIT-013', 'NPK', 2, 'sac', 0), ('KIT-013', 'Insecticide', 4, 'bidons de 250 ml', 1), ('KIT-013', 'Appui conseil', 1, 'ea', 2),
  ('KIT-014', 'NPK', 1, 'sac', 0), ('KIT-014', 'Insecticide', 2, 'bidons de 250 ml', 1), ('KIT-014', 'Appui conseil', 1, 'ea', 2),
  ('KIT-015', 'NPK', 0.5, 'sac', 0), ('KIT-015', 'Insecticide', 1, 'bidons de 250 ml', 1), ('KIT-015', 'Appui conseil', 1, 'ea', 2),
  ('KIT-016', 'NPK', 1, 'sac', 0), ('KIT-016', 'Uree', 1, 'sac', 1), ('KIT-016', 'Insecticide', 4, 'bidons de 250 ml', 2), ('KIT-016', 'Appui conseil', 1, 'ea', 3),
  ('KIT-017', 'NPK', 0.5, 'sac', 0), ('KIT-017', 'Uree', 0.5, 'sac', 1), ('KIT-017', 'Insecticide', 2, 'bidons de 250 ml', 2), ('KIT-017', 'Appui conseil', 1, 'ea', 3),
  ('KIT-018', 'NPK', 0.25, 'sac', 0), ('KIT-018', 'Uree', 0.25, 'sac', 1), ('KIT-018', 'Insecticide', 1, 'bidons de 250 ml', 2), ('KIT-018', 'Appui conseil', 1, 'ea', 3),
  ('KIT-019', 'NPK', 1, 'sac', 0), ('KIT-019', 'Uree', 1, 'sac', 1), ('KIT-019', 'Herbicide', 2, 'bidons de 1L', 2), ('KIT-019', 'Appui conseil', 1, 'ea', 3),
  ('KIT-020', 'NPK', 0.5, 'sac', 0), ('KIT-020', 'Uree', 0.5, 'sac', 1), ('KIT-020', 'Herbicide', 1, 'bidons de 1L', 2), ('KIT-020', 'Appui conseil', 1, 'ea', 3),
  ('KIT-021', 'NPK', 0.25, 'sac', 0), ('KIT-021', 'Uree', 0.25, 'sac', 1), ('KIT-021', 'Herbicide', 1, 'bidons de 1L', 2), ('KIT-021', 'Appui conseil', 1, 'ea', 3),
  ('KIT-022', 'NPK', 2, 'sac', 0), ('KIT-022', 'Herbicide', 2, 'bidons de 1L', 1), ('KIT-022', 'Appui conseil', 1, 'ea', 2),
  ('KIT-023', 'NPK', 1, 'sac', 0), ('KIT-023', 'Herbicide', 1, 'bidons de 1L', 1), ('KIT-023', 'Appui conseil', 1, 'ea', 2),
  ('KIT-024', 'NPK', 0.5, 'sac', 0), ('KIT-024', 'Herbicide', 1, 'bidons de 1L', 1), ('KIT-024', 'Appui conseil', 1, 'ea', 2),
  ('KIT-025', 'NPK', 1, 'sac', 0), ('KIT-025', 'Uree', 1, 'sac', 1), ('KIT-025', 'Herbicide', 2, 'bidons de 1L', 2), ('KIT-025', 'Appui conseil', 1, 'ea', 3),
  ('KIT-026', 'NPK', 0.5, 'sac', 0), ('KIT-026', 'Uree', 0.5, 'sac', 1), ('KIT-026', 'Herbicide', 1, 'bidons de 1L', 2), ('KIT-026', 'Appui conseil', 1, 'ea', 3),
  ('KIT-027', 'NPK', 0.25, 'sac', 0), ('KIT-027', 'Uree', 0.25, 'sac', 1), ('KIT-027', 'Herbicide', 1, 'bidons de 1L', 2), ('KIT-027', 'Appui conseil', 1, 'ea', 3),
  ('KIT-028', 'Herbicide', 2, 'bidons de 1L', 0), ('KIT-028', 'Insecticide', 1, 'sachet', 1), ('KIT-028', 'Appui conseil', 1, 'ea', 2),
  ('KIT-029', 'Herbicide', 1, 'bidons de 1L', 0), ('KIT-029', 'Insecticide', 1, 'sachet', 1), ('KIT-029', 'Appui conseil', 1, 'ea', 2),
  ('KIT-030', 'Herbicide', 1, 'bidons de 1L', 0), ('KIT-030', 'Insecticide', 1, 'sachet', 1), ('KIT-030', 'Appui conseil', 1, 'ea', 2),
  ('KIT-031', 'Herbicide', 2, 'bidons de 1L', 0), ('KIT-031', 'Insecticide', 4, 'bidons de 250 ml', 1), ('KIT-031', 'Appui conseil', 1, 'ea', 2),
  ('KIT-032', 'Herbicide', 1, 'bidons de 1L', 0), ('KIT-032', 'Insecticide', 2, 'bidons de 250 ml', 1), ('KIT-032', 'Appui conseil', 1, 'ea', 2),
  ('KIT-033', 'Herbicide', 1, 'bidons de 1L', 0), ('KIT-033', 'Insecticide', 1, 'bidons de 250 ml', 1), ('KIT-033', 'Appui conseil', 1, 'ea', 2),
  ('KIT-034', 'Herbicide', 2, 'bidons de 1L', 0), ('KIT-034', 'Insecticide', 4, 'bidons de 250 ml', 1), ('KIT-034', 'Appui conseil', 1, 'ea', 2),
  ('KIT-035', 'Herbicide', 1, 'bidons de 1L', 0), ('KIT-035', 'Insecticide', 2, 'bidons de 250 ml', 1), ('KIT-035', 'Appui conseil', 1, 'ea', 2),
  ('KIT-036', 'Herbicide', 1, 'bidons de 1L', 0), ('KIT-036', 'Insecticide', 1, 'bidons de 250 ml', 1), ('KIT-036', 'Appui conseil', 1, 'ea', 2),
  ('KIT-037', 'NPK', 1, 'sac', 0), ('KIT-037', 'Uree', 1, 'sac', 1), ('KIT-037', 'Appui conseil', 1, 'ea', 2),
  ('KIT-038', 'NPK', 0.5, 'sac', 0), ('KIT-038', 'Uree', 0.5, 'sac', 1), ('KIT-038', 'Appui conseil', 1, 'ea', 2),
  ('KIT-039', 'NPK', 0.25, 'sac', 0), ('KIT-039', 'Uree', 0.25, 'sac', 1), ('KIT-039', 'Appui conseil', 1, 'ea', 2),
  ('KIT-040', 'NPK', 2, 'sac', 0), ('KIT-040', 'Appui conseil', 1, 'ea', 1),
  ('KIT-041', 'NPK', 1, 'sac', 0), ('KIT-041', 'Appui conseil', 1, 'ea', 1),
  ('KIT-042', 'NPK', 0.5, 'sac', 0), ('KIT-042', 'Appui conseil', 1, 'ea', 1),
  ('KIT-043', 'NPK', 1, 'sac', 0), ('KIT-043', 'Uree', 1, 'sac', 1), ('KIT-043', 'Appui conseil', 1, 'ea', 2),
  ('KIT-044', 'NPK', 0.5, 'sac', 0), ('KIT-044', 'Uree', 0.5, 'sac', 1), ('KIT-044', 'Appui conseil', 1, 'ea', 2),
  ('KIT-045', 'NPK', 0.25, 'sac', 0), ('KIT-045', 'Uree', 0.25, 'sac', 1), ('KIT-045', 'Appui conseil', 1, 'ea', 2),
  ('KIT-046', 'Appui conseil', 1, 'ea', 0);

DELETE component
FROM kit_component component
INNER JOIN kit kit ON kit.id = component.kit_id
INNER JOIN pacfis_kit_seed seed ON seed.reference = kit.reference;

INSERT INTO kit_component
  (kit_id, component_name, quantity_per_kit, unit, display_order)
SELECT kit.id, component.component_name, component.quantity_per_kit,
       component.unit, component.display_order
FROM pacfis_component_seed component
INNER JOIN kit kit ON kit.reference = component.reference;

-- Review these rows before committing. Verify 46 kit rows and their component counts.
a