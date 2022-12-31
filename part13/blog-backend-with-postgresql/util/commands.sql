CREATE TABLE blogs (
    id SERIAL PRIMARY KEY, 
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes integer DEFAULT 0
);

insert into blogs (author, title, url) values ('Michael Chan','React patterns','https://reactpatterns.com/');
insert into blogs (author, title, url) values ('Edsger W. Dijkstra','Go To Statement Considered Harmful','http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html');