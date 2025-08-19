-- KALRO Knowledge Hub Database Schema

-- Users table
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role ENUM('admin', 'researcher', 'user') DEFAULT 'user',
  department VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Categories table
CREATE TABLE categories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  parent_id INT NULL,
  color VARCHAR(7) DEFAULT '#007A33',
  icon VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- Documents table
CREATE TABLE documents (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(500) NOT NULL,
  description TEXT,
  file_path VARCHAR(500),
  file_type VARCHAR(50),
  file_size BIGINT,
  category_id INT,
  author_id INT,
  status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
  tags JSON,
  metadata JSON,
  download_count INT DEFAULT 0,
  view_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
  FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Bookmarks table
CREATE TABLE bookmarks (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  document_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (document_id) REFERENCES documents(id) ON DELETE CASCADE,
  UNIQUE KEY unique_bookmark (user_id, document_id)
);

-- Activity logs table
CREATE TABLE activity_logs (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  action VARCHAR(100) NOT NULL,
  resource_type VARCHAR(50),
  resource_id INT,
  details JSON,
  ip_address VARCHAR(45),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Analytics table
CREATE TABLE analytics (
  id INT PRIMARY KEY AUTO_INCREMENT,
  date DATE NOT NULL,
  metric_type VARCHAR(50) NOT NULL,
  metric_value INT DEFAULT 0,
  category_id INT NULL,
  document_id INT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
  FOREIGN KEY (document_id) REFERENCES documents(id) ON DELETE SET NULL,
  UNIQUE KEY unique_daily_metric (date, metric_type, category_id, document_id)
);

-- Insert default categories
INSERT INTO categories (name, slug, description, color, icon) VALUES
('Crops', 'crops', 'Crop research and development', '#22c55e', 'Wheat'),
('Livestock', 'livestock', 'Animal husbandry and livestock research', '#3b82f6', 'Cow'),
('Natural Resources', 'natural-resources', 'Environmental and natural resource management', '#10b981', 'TreePine'),
('Socio Economics', 'socio-economics', 'Agricultural economics and social research', '#f59e0b', 'TrendingUp'),
('Cross-cutting', 'cross-cutting', 'Interdisciplinary research themes', '#8b5cf6', 'Network');

-- Insert cross-cutting subcategories
INSERT INTO categories (name, slug, description, parent_id, color, icon) VALUES
('Climate Change', 'climate-change', 'Climate adaptation and mitigation strategies', 5, '#ef4444', 'CloudRain'),
('Gender & Youth', 'gender-youth', 'Inclusive agricultural development', 5, '#ec4899', 'Users'),
('Nutrition & Food Security', 'nutrition', 'Food systems and nutrition research', 5, '#f97316', 'Apple'),
('Technology Transfer', 'technology-transfer', 'Innovation adoption and scaling', 5, '#06b6d4', 'Zap'),
('Capacity Building', 'capacity-building', 'Skills development and training', 5, '#8b5cf6', 'GraduationCap'),
('Policy & Governance', 'policy', 'Agricultural policy research', 5, '#64748b', 'Scale'),
('Market Linkages', 'market-linkages', 'Value chain development', 5, '#059669', 'ShoppingCart'),
('Innovation Systems', 'innovation', 'Agricultural innovation ecosystems', 5, '#dc2626', 'Lightbulb');
