-- Add categories
INSERT INTO categories (name) VALUES
  ('Electronics'),
  ('Books'),
  ('Clothing');

-- Add products (category_id matches the category ids: 1=Electronics, 2=Books, 3=Clothing)
INSERT INTO products (name, description, price, stock, image_url, category_id) VALUES
  ('Wireless Mouse', 'A comfortable wireless mouse.', 19.99, 50, 'https://via.placeholder.com/200', 1),
  ('USB-C Cable', 'Fast charging cable, 1 meter.', 9.99, 100, 'https://via.placeholder.com/200', 1),
  ('SQL for Beginners', 'Learn databases step by step.', 29.99, 30, 'https://via.placeholder.com/200', 2),
  ('Cotton T-Shirt', 'Soft cotton, available in all sizes.', 14.99, 75, 'https://via.placeholder.com/200', 3);