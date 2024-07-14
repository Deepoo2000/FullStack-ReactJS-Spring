use `reactlibrarydatabase`;
DROP TABLE if exists payment;

CREATE TABLE payment (
    id BIGINT(20) NOT NULL AUTO_INCREMENT,
    user_email VARCHAR(45) DEFAULT NULL,
    amount DECIMAL(10, 2) DEFAULT NULL,
    primary key(id)
)engine = InnoDB auto_increment = 1 default charset=latin1;

 