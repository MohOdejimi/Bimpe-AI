import os
from dotenv import load_dotenv
from bimpeai import BimpeAI

load_dotenv()
client = BimpeAI(api_key=os.environ['BIMPEAI_APII_KEY'])

#url = "/api/v1/console"

def test_connection():
    agents = list(client.agents.list(limit=50))
    for agent in agents:
        print(agent.id, agent.name)

if __name__ == "__main__":
    test_connection()