import logo from './logo.svg';
import './App.css';
import {useState} from 'react';

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
        props.onChangeMode(Number(event.target.id));
        console.log(event.target)
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
    <form onSubmit={event=>{
      event.preventDefault();
      const title = event.target.title.value
      const body = event.target.body.value
      props.onCreate(title, body);
    }}>
      <p><input type="text" name="title" placeholder='title'></input> </p>
      <p><textarea name="body" placeholder='body'></textarea></p>
      <p><input type="submit" value='Create'></input></p>
    </form>
  </article>
}

function App() {
  const [mode, setMode] = useState('Welcome');
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4)
  const [topics, setTopics ]= useState([
    {id: 1, title: 'html', body: 'html is ...'},
    {id: 2, title: 'Csss', body: 'Csss is ...'},
    {id: 3, title: 'Javascript', body: 'javascript is ...'}
  ])

  let content =null;
  if(mode=== 'Welcome') {
    content =  <Article  title="welcome" body="hello, Web"></Article>
  }else if (mode === 'Read'){

    let title, body = null;
    for(let i=0; i<topics.length; i++){
      console.log(topics[i].id, id)
      if(topics[i].id === id){
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article  title={title} body={body}></Article>
  }else if(mode === 'Create'){
    content = <Create onCreate={(_title, _body)=>{
      const newTopic = {id: nextId, title: _title, body: _body}
      const newTopics = [...topics]
      newTopics.push(newTopic)
      setTopics(newTopics)
      setMode('Read')
      setId(nextId)
      setNextId(nextId+1)
    }}></Create>
  }

  return (
    <div>
      <Header title="sample" onChangeMode={function(){
        // mode = 'Welcome'
        setMode('Welcome')
      }}></Header>
      <Nav topics={topics} onChangeMode={function(_id){
        // mode = "Read"
        setMode('Read')
        setId(_id)
      }}> </Nav>
      {content}
      <a href="/create" onClick={event=>{
        event.preventDefault();
        setMode('Create')
      }}>Create</a>
    </div>
  );
}

export default App;
