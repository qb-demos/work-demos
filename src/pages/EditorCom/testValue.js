export const sql =
  `CREATE TABLE dbo.EmployeePhoto
(
    EmployeeId INT NOT NULL PRIMARY KEY,
    Photo VARBINARY(MAX) FILESTREAM NULL,
    MyRowGuidColumn UNIQUEIDENTIFIER NOT NULL ROWGUIDCOL
                    UNIQUE DEFAULT NEWID()
);

GO

/*
text_of_comment
/* nested comment */
*/

-- line comment

CREATE NONCLUSTERED INDEX IX_WorkOrder_ProductID
    ON Production.WorkOrder(ProductID)
    WITH (FILLFACTOR = 80,
        PAD_INDEX = ON,
        DROP_EXISTING = ON);

WHILE (SELECT AVG(ListPrice) FROM Production.Product) < $300
BEGIN
   UPDATE Production.Product
      SET ListPrice = ListPrice * 2
   SELECT MAX(ListPrice) FROM Production.Product
   IF (SELECT MAX(ListPrice) FROM Production.Product) > $500
      BREAK
   ELSE
      CONTINUE
END
PRINT 'Too much for the market to bear';

MERGE INTO Sales.SalesReason AS [Target]
USING (VALUES ('Recommendation','Other'), ('Review', 'Marketing'), ('Internet', 'Promotion'))
       AS [Source] ([NewName], NewReasonType)
ON [Target].[Name] = [Source].[NewName]
WHEN MATCHED
THEN UPDATE SET ReasonType = [Source].NewReasonType
WHEN NOT MATCHED BY TARGET
THEN INSERT ([Name], ReasonType) VALUES ([NewName], NewReasonType)
OUTPUT $action INTO @SummaryOfChanges;

SELECT ProductID, OrderQty, SUM(LineTotal) AS Total
FROM Sales.SalesOrderDetail
WHERE UnitPrice < $5.00
GROUP BY ProductID, OrderQty
ORDER BY ProductID, OrderQty
OPTION (HASH GROUP, FAST 10);`

export const sql2 =
  `CREATE TABLE dbo.EmployeePhoto
(
    EmployeeId INT NOT NULL PRIMARY KEY,
    Photo VARBINARY(MAX) FILESTREAM NULL,
    MyRowGuidColumn UNIQUEIDENTIFIER NOT NULL ROWGUIDCOL
                    UNIQUE DEFAULT NEWID()
);

SELECT 1;

GO

/*
text_of_comment
/* nested comment */
*/

-- line comment

CREATE NONCLUSTERED INDEX IX_WorkOrder_ProductID
    ON Production.WorkOrder(ProductID)
    WITH (FILLFACTOR = 80,
        PAD_INDEX = ON,
        DROP_EXISTING = ON);
GO

WHILE (SELECT AVG(ListPrice) FROM Production.Product) < $300
BEGIN
   UPDATE Production.Product
      SET ListPrice = ListPrice * 2
   IF (SELECT MAX(ListPrice) FROM Production.Product) > $500
      BREAK
   ELSE
      CONTINUE
END
PRINT 'Too much for the market to bear';

MERGE INTO Sales.SalesReason AS [Target]
USING (VALUES ('Recommendation','Other'), ('Review', 'Marketing'), ('Internet', 'Promotion'))
       AS [Source] ([NewName], NewReasonType)
ON [Target].[Name] = [Source].[NewName]
WHEN MATCHED
THEN UPDATE SET ReasonType = [Source].NewReasonType
WHEN NOT MATCHED BY TARGET
THEN INSERT ([Name], ReasonType) VALUES ([NewName], NewReasonType)
OUTPUT $action INTO @SummaryOfChanges;

SELECT ProductID, OrderQty, SUM(LineTotal) AS Total
FROM Sales.SalesOrderDetail
WHERE UnitPrice < $5.00
GROUP BY ProductID, OrderQty
ORDER BY ProductID, OrderQty
OPTION (HASH GROUP, FAST 10);`

export const js = `
(function (global, undefined) {
  "use strict";
  undefinedVariable = {};
  undefinedVariable.prop = 5;

  function initializeProperties(target, members) {
    var keys = Object.keys(members);
    var properties;
    var i, len;
    for (i = 0, len = keys.length; i < len; i++) {
    var key = keys[i];
    var enumerable = key.charCodeAt(0) !== /*_*/95;
    var member = members[key];
    if (member && typeof member === 'object') {
        if (member.value !== undefined || typeof member.get === 'function' || typeof member.set === 'function') {
        if (member.enumerable === undefined) {
            member.enumerable = enumerable;
          }
          properties = properties || {};
          properties[key] = member;
          continue;
        }
      }
      if (!enumerable) {
        properties = properties || {};
        properties[key] = { value: member, enumerable: enumerable, configurable: true, writable: true }
        continue;
      }
      target[key] = member;
    }
    if (properties) {
      Object.defineProperties(target, properties);
    }
  }
})("WinJS");`

export const python = `# Python program to check if the number provided by the user is an Armstrong number or not
# take input from the user
num = int(input("Enter a number: "))
# initialize sum
sum = 0
# find the sum of the cube of each digit
temp = num
while temp > 0:
   digit = temp % 10
   sum += digit ** 3
   temp //= 10
# display the result
if num == sum:
   print(num,"is an Armstrong number")
else:
   print(num,"is not an Armstrong number")`
