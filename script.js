console.log("接続成功");

const saveBtn = document.getElementById("saveBtn");
let memos = [];
let editingIndex = -1;
const searchInput = document.getElementById("search");
const tag = document.getElementById("tag").value;

saveBtn.addEventListener("click", () => {

    const title = document.getElementById("title").value;

    const content = document.getElementById("content").value;
    
    const memo = {
        title: title,
        tag: tag,
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

function displayMemos(searchText =""){

    const memoList = document.getElementById("memoList");

    memoList.innerHTML = "";

    const filteredMemos = memos.filter((memo) => { //フィルタリングして、タイトルまたは内容に検索テキストが含まれているメモだけを表示

        return( //タイトルまたは内容に検索テキストが含まれているかをチェック
            memo.title.includes(searchText) || memo.content.includes(searchText) //検索テキストがタイトルまたは内容に含まれている場合はtrueを返す
        );
    });

    filteredMemos.forEach((memo, index) => { //フィルタリングされたメモを表示

        memoList.innerHTML += `
        <div class="memo">
            <p>#${memo.tag}</p>
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

searchInput.addEventListener("input", () => {

    displayMemos(searchInput.value);

});