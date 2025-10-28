// 新增数据函数
function AddRow() {
    // 定位结点
    var table = document.getElementById('table');
    // console.log(table);

    // 获取插入位置
    var length = table.rows.length;
    // console.log(length);

    // 插入行节点 在table里插入tr
    var newRow = table.insertRow(length);
    // console.log(newRow);
    
    // 插入结点对象 在tr里插入td
    var nameCol = newRow.insertCell(0);
    var phoneCol = newRow.insertCell(1);
    var actionCol = newRow.insertCell(2);

    // 修改节点内容 在td里插入内容
    nameCol.innerHTML = '未命名';
    phoneCol.innerHTML = '无联系方式';
    actionCol.innerHTML = ' <button onclick="EditRow(this)">编辑</button><button onclick="DeletRow(this)">删除</button>';
}

// 删除数据函数
function DeletRow(button) {
    // console.log(button);

    // 定位button父节点的父节点 !! tr !! -> td -> button 
    var row = button.parentNode.parentNode;
    // console.log(row);
    
    // 因为无法自己删自己 于是找到父节点让它删除自己的子节点 !! table !! -> delet(tr)
    row.parentNode.removeChild(row);
}

// 编辑数据函数
function EditRow(button) {
    // console.log(button);

    var row = button.parentNode.parentNode;
    var name = row.cells[0];
    var phone = row.cells[1];

    var inputname = prompt("请输入名字：");
    var inputphone = prompt("请输入联系方式：");

    name.innerHTML = inputname;
    phone.innerHTML = inputphone;
}