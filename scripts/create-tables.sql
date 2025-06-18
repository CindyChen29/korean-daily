-- Create articles table
CREATE TABLE IF NOT EXISTS articles (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  category TEXT NOT NULL,
  tags TEXT[],
  author TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft',
  featured BOOLEAN DEFAULT false,
  image_url TEXT,
  seo_title TEXT,
  seo_description TEXT,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  published_at TIMESTAMP WITH TIME ZONE
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_articles_status ON articles(status);
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category);
CREATE INDEX IF NOT EXISTS idx_articles_published_at ON articles(published_at);

-- Insert sample articles
INSERT INTO articles (title, content, excerpt, category, tags, author, status, featured, image_url, views, published_at) VALUES
(
  'New Korean Cultural Center Opens in San Francisco',
  '<p>The Korean Cultural Center of San Francisco (KCCSF) officially opened its doors yesterday in the heart of the city''s Japantown district, marking a significant milestone for the Korean community in the Bay Area.</p><p>The 15,000-square-foot facility features multiple classrooms for language instruction, a performance hall, art gallery, and community gathering spaces. The center aims to serve as a hub for Korean cultural preservation and exchange.</p>',
  'The center will offer language classes, cultural events, and community gatherings for the growing Korean population.',
  'Community',
  ARRAY['culture', 'community', 'education'],
  'Sarah Kim',
  'published',
  true,
  '/placeholder.svg?height=400&width=600',
  1245,
  NOW() - INTERVAL '2 days'
),
(
  'Korean Tech Startup Raises $10M in Series A Funding',
  '<p>A Korean-founded startup based in San Francisco has successfully raised $10 million in Series A funding to expand their AI-powered language learning platform.</p><p>The company, founded by former Google engineers, aims to revolutionize how people learn Korean and other Asian languages through personalized AI tutoring.</p>',
  'Local Korean-founded startup secures major funding round to expand AI-powered language learning platform.',
  'Business',
  ARRAY['business', 'technology', 'startup'],
  'Michael Park',
  'published',
  false,
  '/placeholder.svg?height=400&width=600',
  987,
  NOW() - INTERVAL '1 day'
),
(
  'Korean Food Festival Returns to Union Square',
  '<p>The annual Korean Food Festival is back this weekend at Union Square, featuring over 30 vendors serving authentic Korean cuisine.</p><p>Visitors can enjoy everything from traditional bulgogi and kimchi to modern Korean fusion dishes, along with live performances of traditional Korean music and dance.</p>',
  'Annual celebration of Korean cuisine features 30+ vendors and traditional performances this weekend.',
  'Food',
  ARRAY['food', 'festival', 'culture'],
  'Jennifer Lee',
  'published',
  false,
  '/placeholder.svg?height=400&width=600',
  2156,
  NOW() - INTERVAL '3 hours'
);
