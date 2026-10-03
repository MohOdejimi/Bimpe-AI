import os
import uuid
from dotenv import load_dotenv
from bimpeai import BimpeAI

load_dotenv()

client = BimpeAI(
    api_key=os.environ["BIMPEAI_API_KEY"]
)

WORKFLOW_ID = "cml4wyizn000ns4229w3l18pn"

# Create an agent attached to the workflow
agent = client.agents.create(
    name="Bimpe Lead Analyzer",
    description="Analyzes sales leads and identifies buying intent.",
    workflow_id=WORKFLOW_ID
)

print("Created agent:", agent.id)


def analyze_lead(text, location):

    response = client.conversations.send(
        agent.id,
        message=f"""
Analyze this sales lead.

Lead:
{text}

Location:
{location}

Return the following:

1. Lead quality: hot, warm, or cold
2. Main need/problem
3. Buying intent
4. Recommended next action
5. Short reason for your assessment
""",
        channel_type="webchat",
        channel_user_id=str(uuid.uuid4()),
        is_test_channel=True
    )

    return {
    "id": response.id,
    "role": response.role,
    "message": response.message,
    "message_type": response.message_type,
    "created_at": str(response.created_at)
}