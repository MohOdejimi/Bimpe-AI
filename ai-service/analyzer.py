"""
AI INTENT ANALYZER ENGINE

Evaluates post text against target customer criteria.
"""

def analyze_opportunity(post, business):
    """
    TODO: Implement AI intent analysis (keyword rules or LLM prompt).
    
    Expected return format:
    {
        "isOpportunity": True,
        "intent": "high",  # 'high' | 'medium' | 'low'
        "service": "...",
        "location": "...",
        "urgency": "...",
        "reason": "...",
        "suggestedReply": "..."
    }
    """
    # TODO: Add analysis logic here
    return {
        "isOpportunity": False,
        "intent": "low",
        "service": business.get("whatTheySell", ""),
        "location": post.get("location", ""),
        "urgency": "low",
        "reason": "Analysis pending implementation.",
        "suggestedReply": ""
    }
