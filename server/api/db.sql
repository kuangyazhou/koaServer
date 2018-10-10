#查询
SElECT column_name,column_name FROM table_name
WHERE Clause LIMIT N OFFSET M;

#更新
UPDATE table_name SET field1=new value,field2=new value2 WHERE clause:

#JOIN
SELECT a.runoob_id, a.runoob_author, b.runoob_count FROM runoob_tbl a INNER JOIN tcount_tbl b ON a.runoob_author = b.runoob_author;

从tcount_tbl表中查找所有与runoob_tbl表中runoob_author相等的runoob_count值;

SELECT * from data;

SELECT name from data;
