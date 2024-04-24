import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = () => {
    const [records, setRecords] = useState([]);
    const [archive, setArchive] = useState([]);

    const [newRecord, setNewRecord] = useState({
        author: "",
        head: "",
        category: "",
        description: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewRecord({
            ...newRecord,
            [name]: value
        });
    };

    const handleCreateRecord = () => {
        if (newRecord.author.trim() === "" || newRecord.head.trim() === "" || newRecord.category.trim() === "" || newRecord.description.trim() === "") {
            const alertBox = document.createElement('div');
            alertBox.innerHTML = `
            <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: #f44336; color: white; padding: 20px; border-radius: 5px; box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2); z-index: 999;">
                <span style="font-size: 20px;"> Пожалуйста, заполните все поля! </span>
            </div>
        `;
            document.body.appendChild(alertBox);

            setTimeout(() => {
                alertBox.remove();
            }, 3000);
            return;
        }
        setRecords([...records, newRecord]);
        setNewRecord({
            author: "",
            head: "",
            category: "",
            description: ""
        });
    };

    const handleDeleteRecord = (index) => {
        const updatedRecords = records.filter((record, i) => i !== index);
        setRecords(updatedRecords);
    };

    const handleArchiveRecord = (index) => {
        const archivedRecord = records[index];
        setArchive([...archive, archivedRecord]);
        handleDeleteRecord(index);
    };

    return (
        <React.StrictMode>
                <main id="main" style={{ flex: '1', overflowY: 'auto',border: 'dashed 0.1rem #006b09', marginRight: '3%', borderRadius: '15px', boxShadow: '0.5em 1em 0.5em 0em rgba(64, 73, 59, 0.281)', padding: '0 20px 20px 20px' }}>
                    <h1 style={{ color: 'black', borderBottom: '3px solid #07b148' }}> Записи </h1>
                    {records.map((record, index) => (
                        <article key={index} style={{borderBottom: '3px solid #40493B'}}>
                            <h1>{record.head}</h1>
                            <p>
                                Категория: <strong>{record.category}</strong>
                            </p>
                            <p>
                                Автор: <strong>{record.author}</strong>
                            </p>
                            <p style={{ wordWrap: 'break-word', boxSizing: 'border-box', textAlign: 'justify'}}>{record.description}</p>
                            <div style={{marginBottom: '20px', textAlign: 'right'}}>
                                <button id="deleteRecord" onClick={() => handleDeleteRecord(index)}> Удалить</button>
                                <button id="addArchiveBtn" onClick={() => handleArchiveRecord(index)}> Архив</button>
                            </div>
                        </article>
                    ))}
                </main>
            <aside style={{
                width: '25%', border: 'dashed 0.1rem #006b09', borderRadius: '15px', boxShadow: '0.5em 1em 0.5em 0em rgba(64, 73, 59, 0.281)' }}>
                    <section id="create" style={{ padding: '20px 20px 0 20px' }}>
                        <form method="post" id="createRecord">
                            <h2 style={{ color: 'black', borderBottom: '3px solid #07b148' }}> Создать запись </h2>
                            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
                                <label htmlFor="author"> Автор </label>
                                <input style={{ padding: '5px'}} type="text" name="author" id="author" value={newRecord.author} onChange={handleInputChange} required />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
                                <label htmlFor="head"> Заголовок </label>
                                <input style={{ padding: '5px'}} type="text" name="head" id="head" value={newRecord.head} onChange={handleInputChange} required />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
                                <label htmlFor="category"> Категория </label>
                                <input style={{ padding: '5px'}} type="text" name="category" id="category" value={newRecord.category} onChange={handleInputChange} required />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <label> Содержание </label>
                                <textarea style={{ border: '3px solid #40493B' }} id="description" name="description" value={newRecord.description} onChange={handleInputChange}></textarea>
                            </div>
                            <button id="CreateBtn" type="button" onClick={handleCreateRecord}> Создать </button>
                        </form>
                    </section>
                    <section id="archive" style={{ padding: '0 20px 20px 20px', marginTop: '0' }}>
                        <h2 style={{ color: 'black', borderBottom: '3px solid #07b148' }}> Архив </h2>
                        <ol style={{listStyleType: 'square'}}>
                        {archive.map((item, index) => (
                            <li key={index}>{item.head}</li>
                        ))}
                        </ol>
                    </section>
                </aside>
        </React.StrictMode>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
