from langchain.chains import RetrievalQA
from langchain.chat_models import ChatOpenAI
from langchain.vectorstores import Pinecone
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.prompts import PromptTemplate
import pinecone, os

def run_agent():
    pinecone.init(api_key=os.getenv("PINECONE_API_KEY"), environment=os.getenv("PINECONE_ENVIRONMENT"))
    index = pinecone.Index(os.getenv("PINECONE_INDEX_NAME"))

    embedder = OpenAIEmbeddings(openai_api_key=os.getenv("OPENAI_API_KEY"))
    vectorstore = Pinecone(index, embedder.embed_query, "text")

    with open("prompts/lead_planner.txt") as f:
        prompt_template = f.read()

    prompt = PromptTemplate(input_variables=["context", "question"], template=prompt_template)
    llm = ChatOpenAI(model="gpt-4", temperature=0.7)

    qa = RetrievalQA.from_chain_type(llm=llm, retriever=vectorstore.as_retriever(), chain_type_kwargs={"prompt": prompt})

    question = "What should I say to a Head of Ops at OpenAI?"
    result = qa.run(question)
    print("Response:", result)
