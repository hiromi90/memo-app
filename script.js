console.log("接続成功");

const saveBtn = document.getElementById("saveBtn");
let memos = [];

saveBtn.addEventListener("click", () => {

    const title = document.getElementById("title").value;

    const content = document.getElementById("content").value;
    
    const memo = {
        title: title,
        content: content
    };

    memos.push(memo);

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

            <button onclick="deleteMemo(${index})">削除</button>
        </div>
        `;
    });
}

localStorage.setItem(
    "memos",
    JSON.stringify(memos)
);

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

displayMemos();