import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function Header(props){ 
  return <header> 
      <h1><a href="/"  onClick={function(event){
        event.preventDefault();
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
  if(mode === 'Welcome'){
    content = <Article  title="Welcome" body="hello, Web"></Article>
  }else if(mode === 'Read'){
    content = <Article title={topics[id].title} body={topics[id].body}></Article>
  }else if(mode === 'Create'){
    content = <Create onCreate={(_title,_body)=>{
      topics.push({id: nextId, title: _title, body: _body})
      const newTopics = topics
      setTopics(newTopics)
      setMode('Read')
      setId(nextId)
      setNextId(nextId+1)
    }}></Create>
  }

  return (
    <div>
      <Header title="sample"></Header>

      <Nav topics={topics} onChangeMode={function(id){
        setMode('Read')
        setId(topics[id].id)
      }}> </Nav>

      {content}

      <a href='/create' onClick={(event)=>{
        event.preventDefault();
        setMode('Create')
      }}>Create</a>
    </div>
  );
}
export default App;
