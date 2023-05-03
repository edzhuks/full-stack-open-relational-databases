CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author TEXT,
    url TEXT NOT NULL,
    title TEXT NOT NULL,
    likes INTEGER DEFAULT 0
 );

 INSERT INTO blogs (author, url, title, likes) VALUES ('John', 'www.google.com', 'Google', 0);
 INSERT INTO blogs (author, url, title) VALUES ('Peter', 'www.bing.com', 'Bing');

 SELECT * FROM blogs;