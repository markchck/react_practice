import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function Header(props){ 
  return <header> 
      <h1><a href="/"  onClick={function(event){
        event.preventDefault();
        props.onChangeMode();
      }}>{props.title}</a></h1>
    </header>
}
function Nav(props){
  const lis = [
  ]
  for(let i = 0; i<props.topics.length; i++){
    let t = props.topics[i]
    lis.push(<li key={t.id}>
      <a id={t.id} href={'/read/'+t.id} onClick={function(event){
                                        // onClick={(event)=>{블라블라~~}} 로 축약가능(에로우펑션)
        event.preventDefault();
        props.onChangeMode(event.target.id);
      }}>{t.title}</a>
    </li>)
  }
  return <nav>
    <ol>
      {lis}
    </ol>
  </nav>
}
function Article(props){
  return <article>
    <h2>{props.title}</h2>
    {props.body}
  </article>
}
function Create(props){
    return <article>
      <h2>Create</h2>
      <form onSubmit={(event)=>{
        event.preventDefault();
        const _title = event.target.title.value
        const _body = event.target.body.value
        // 아래 굉장히 중요한 순간임..(사용자정의 태그에서 function으로는 props를 통해 정보를 보내면 되는데 그 반대로 function에서 
        // 사용자 정의 태그로 정보를 보낼 때는 props.onCreate(title,body)처럼 보낼 정보를 정의를 해서 보낸다.)
        props.onCreate(_title, _body)     
      }}>
        <input type="text" name="title"></input>
        <input type="text" name="body"></input>
        <input type="submit"></input>
      </form>
    </article> 
}
function Update(props){
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);
  return<article>
    <h2>Update</h2>
    <form onSubmit={(event)=>{
      event.preventDefault();
      const _title = title
      const _body = body
      props.onUpdate(_title,_body);
    }}>
      <input type="text" name="title" value={title} onChange={(event)=>{
        setTitle(event.target.value);
      }}></input>
      <input type="text" name="body" value={body} onChange={(event)=>{
        setBody(event.target.value);
      }}></input>
      <input type="submit"></input>
    </form>
  </article>
}
function App() {
  const [mode, setMode] = useState('Welcome')
  const [id, setId] = useState(null)
  const [nextId, setNextId] = useState(3)
  const [topics, setTopics] =useState(
    [
      {id: 0, title: 'html', body: 'html is ...'},
      {id: 1, title: 'Csss', body: 'Csss is ...'},
      {id: 2, title: 'Javascript', body: 'javascript is ...'}
    ]
  )
  let content = null;
  let updateForm =null;
  if(mode === 'Welcome'){
    content = <Article  title="Welcome" body="hello, Web"></Article>
  }else if(mode === 'Read'){
    content = <Article title={topics[id].title} body={topics[id].body}></Article>
    updateForm = <a href="/update/" onClick={(event)=>{
      event.preventDefault();
      setMode('Update')
    }}>Update</a>
  }else if(mode === 'Create'){
    content = <Create onCreate={(_title,_body)=>{
      // 1번 이케는 하지 말래
      // console.log([...topics])
      // console.log(topics)
      // const newTopic = {id:nextId, title:_title, body: _body}
      // topics.push(newTopic)
      // setTopics(topics)
      // console.log(topics)
      
      // 2번 재민
      topics.push({id: nextId, title: _title, body: _body})
      const newTopic = topics
      setTopics(newTopic)
      setMode('Read')
      setId(nextId)
      
      // 3번 생활코딩
      // const newTopic = ({id: nextId, title: _title, body: _body})
      // const newTopics = [...topics]
      // newTopics.push(newTopic)      
      // setTopics(newTopics)
      setNextId(nextId+1)
    }}></Create>
  }else if(mode === 'Update'){
    content = <Update id={id} title={topics[id].title} body={topics[id].body} onUpdate={(_title,_body)=>{
      topics[id].title = _title;
      topics[id].body = _body;
      setTopics(topics)
      setMode('Read')
    }}></Update>
  }
  return (
    <div>
      <Header title="sample" onChangeMode={function(){
        setMode('Welcome')
      }}></Header>
      <Nav topics={topics} onChangeMode={function(id){
        setMode('Read')
        setId(topics[id].id)
      }}> </Nav>
      {content} <br></br>
      {updateForm} <br></br>
      <a href='/create' onClick={(event)=>{
        event.preventDefault();
        setMode('Create')
      }}>Create</a> <br></br>
    </div>
  );
}
export default App;
