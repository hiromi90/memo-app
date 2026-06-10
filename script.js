console.log("接続成功");

const saveBtn = document.getElementById("saveBtn");
let memos = [];
let editingIndex = -1;

saveBtn.addEventListener("click", () => {

    const title = document.getElementById("title").value;

    const content = document.getElementById("content").value;
    
    const memo = {
        title: title,
        content: content
    };

    if(editingIndex == -1){

        memos.push(memo);

    }

    else{

        memos[editingIndex] = memo;

        editingIndex = -1;
    }

    localStorage.setItem(
        "memos",
        JSON.stringify(memos)
    );

    document.getElementById("title").value = "";
    
    document.getElementById("content").value = "";

    displayMemos();

    console.log("タイトル:", title);
    console.log("内容:", content);
});

function displayMemos(){

    const memoList = document.getElementById("memoList");

    memoList.innerHTML = "";

    memos.forEach((memo, index) => {

        memoList.innerHTML += `
        <div class="memo">
            <h3>${memo.title}</h3>
            <p>${memo.content}</p>

            <button onclick="editMemo(${index})">編集</button>
            <button onclick="deleteMemo(${index})">削除</button>
        </div>
        `;
    });
}

memos = JSON.parse(
    localStorage.getItem("memos")
) || [];

function deleteMemo(index) {

    memos.splice(index,1);

    localStorage.setItem(
        "memos",
        JSON.stringify(memos)
    );

    displayMemos();
}

function editMemo(index){

    editingIndex = index;
    
    document.getElementById("title").value = memos[index].title;

    document.getElementById("content").value = memos[index].content;
}


displayMemos();