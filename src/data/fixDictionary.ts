// Auto-generated from QuickFIX and TT FIX spec files — do not edit by hand
// Run: node scripts/generateDictionary.mjs

export interface FieldDef {
  name: string
  type: string
  values?: Record<string, string>
}

export const FIELDS: Record<number, FieldDef> = {
  "1": {
    "name": "Account",
    "type": "STRING"
  },
  "2": {
    "name": "AdvId",
    "type": "STRING"
  },
  "3": {
    "name": "AdvRefID",
    "type": "STRING"
  },
  "4": {
    "name": "AdvSide",
    "type": "CHAR",
    "values": {
      "B": "Buy",
      "S": "Sell",
      "X": "Cross",
      "T": "Trade"
    }
  },
  "5": {
    "name": "AdvTransType",
    "type": "STRING",
    "values": {
      "N": "New",
      "C": "Cancel",
      "R": "Replace"
    }
  },
  "6": {
    "name": "AvgPx",
    "type": "PRICE"
  },
  "7": {
    "name": "BeginSeqNo",
    "type": "SEQNUM"
  },
  "8": {
    "name": "BeginString",
    "type": "STRING"
  },
  "9": {
    "name": "BodyLength",
    "type": "LENGTH"
  },
  "10": {
    "name": "CheckSum",
    "type": "STRING"
  },
  "11": {
    "name": "ClOrdID",
    "type": "STRING"
  },
  "12": {
    "name": "Commission",
    "type": "AMT"
  },
  "13": {
    "name": "CommType",
    "type": "CHAR",
    "values": {
      "1": "Per Unit",
      "2": "Percent",
      "3": "Absolute",
      "4": "Percentage Waived Cash Discount",
      "5": "Percentage Waived Enhanced Units",
      "6": "Points Per Bond Or Contract"
    }
  },
  "14": {
    "name": "CumQty",
    "type": "QTY"
  },
  "15": {
    "name": "Currency",
    "type": "CURRENCY"
  },
  "16": {
    "name": "EndSeqNo",
    "type": "SEQNUM"
  },
  "17": {
    "name": "ExecID",
    "type": "STRING"
  },
  "18": {
    "name": "ExecInst",
    "type": "MULTIPLEVALUESTRING",
    "values": {
      "0": "Stay On Offer Side",
      "1": "Not Held",
      "2": "Work",
      "3": "Go Along",
      "4": "Over The Day",
      "5": "Held",
      "6": "Participate Do Not Initiate",
      "7": "Strict Scale",
      "8": "Try To Scale",
      "9": "Stay On Bid Side",
      "A": "No Cross",
      "B": "Ok To Cross",
      "C": "Call First",
      "D": "Percent Of Volume",
      "E": "Do Not Increase",
      "F": "Do Not Reduce",
      "G": "All Or None",
      "H": "Reinstate On System Failure",
      "I": "Institutions Only",
      "J": "Reinstate On Trading Halt",
      "K": "Cancel On Trading Halt",
      "L": "Last Peg",
      "M": "Mid Price Peg",
      "N": "Non Negotiable",
      "O": "Opening Peg",
      "P": "Market Peg",
      "Q": "Cancel On System Failure",
      "R": "Primary Peg",
      "S": "Suspend",
      "U": "Customer Display Instruction",
      "V": "Netting",
      "W": "Peg To Vwap",
      "X": "Trade Along",
      "Y": "Try To Stop",
      "Z": "Cancel If Not Best",
      "a": "Trailing Stop Peg",
      "b": "Strict Limit",
      "c": "Ignore Price Validity Checks",
      "d": "Peg To Limit Price",
      "e": "Work To Target Strategy"
    }
  },
  "19": {
    "name": "ExecRefID",
    "type": "STRING"
  },
  "20": {
    "name": "ExecTransType",
    "type": "CHAR",
    "values": {
      "0": "New",
      "1": "Cancel",
      "2": "Correct",
      "3": "Status"
    }
  },
  "21": {
    "name": "HandlInst",
    "type": "CHAR",
    "values": {
      "1": "Automated Execution No Intervention",
      "2": "Automated Execution Intervention Ok",
      "3": "Manual Order"
    }
  },
  "22": {
    "name": "SecurityIDSource",
    "type": "STRING",
    "values": {
      "1": "Cusip",
      "2": "Sedol",
      "3": "Quik",
      "4": "Isin Number",
      "5": "Ric Code",
      "6": "Iso Currency Code",
      "7": "Iso Country Code",
      "8": "Exchange Symbol",
      "9": "Consolidated Tape Association",
      "A": "Bloomberg Symbol",
      "B": "Wertpapier",
      "C": "Dutch",
      "D": "Valoren",
      "E": "Sicovam",
      "F": "Belgian",
      "G": "Common",
      "H": "Clearing House",
      "I": "Isda Fp Ml Specification",
      "J": "Option Price Reporting Authority"
    }
  },
  "23": {
    "name": "IOIID",
    "type": "STRING"
  },
  "24": {
    "name": "IOIOthSvc",
    "type": "CHAR"
  },
  "25": {
    "name": "IOIQltyInd",
    "type": "CHAR",
    "values": {
      "L": "Low",
      "M": "Medium",
      "H": "High"
    }
  },
  "26": {
    "name": "IOIRefID",
    "type": "STRING"
  },
  "27": {
    "name": "IOIQty",
    "type": "STRING",
    "values": {
      "S": "Small",
      "M": "Medium",
      "L": "Large"
    }
  },
  "28": {
    "name": "IOITransType",
    "type": "CHAR",
    "values": {
      "N": "New",
      "C": "Cancel",
      "R": "Replace"
    }
  },
  "29": {
    "name": "LastCapacity",
    "type": "CHAR",
    "values": {
      "1": "Agent",
      "2": "Cross As Agent",
      "3": "Cross As Principal",
      "4": "Principal"
    }
  },
  "30": {
    "name": "LastMkt",
    "type": "EXCHANGE"
  },
  "31": {
    "name": "LastPx",
    "type": "PRICE"
  },
  "32": {
    "name": "LastQty",
    "type": "QTY"
  },
  "33": {
    "name": "NoLinesOfText",
    "type": "NUMINGROUP"
  },
  "34": {
    "name": "MsgSeqNum",
    "type": "SEQNUM"
  },
  "35": {
    "name": "MsgType",
    "type": "STRING",
    "values": {
      "0": "Heartbeat",
      "1": "Test Request",
      "2": "Resend Request",
      "3": "Reject",
      "4": "Sequence Reset",
      "5": "Logout",
      "6": "Ioi",
      "7": "Advertisement",
      "8": "Execution Report",
      "9": "Order Cancel Reject",
      "A": "Logon",
      "B": "News",
      "C": "Email",
      "D": "New Order Single",
      "E": "New Order List",
      "F": "Order Cancel Request",
      "G": "Order Cancel Replace Request",
      "H": "Order Status Request",
      "J": "Allocation Instruction",
      "K": "List Cancel Request",
      "L": "List Execute",
      "M": "List Status Request",
      "N": "List Status",
      "P": "Allocation Instruction Ack",
      "Q": "Dont Know Trade",
      "R": "Quote Request",
      "S": "Quote",
      "T": "Settlement Instructions",
      "V": "Market Data Request",
      "W": "Market Data Snapshot Full Refresh",
      "X": "Market Data Incremental Refresh",
      "Y": "Market Data Request Reject",
      "Z": "Quote Cancel",
      "a": "Quote Status Request",
      "b": "Mass Quote Acknowledgement",
      "c": "Security Definition Request",
      "d": "Security Definition",
      "e": "Security Status Request",
      "f": "Security Status",
      "g": "Trading Session Status Request",
      "h": "Trading Session Status",
      "i": "Mass Quote",
      "j": "Business Message Reject",
      "k": "Bid Request",
      "l": "Bid Response",
      "m": "List Strike Price",
      "n": "Xml Non Fix",
      "o": "Registration Instructions",
      "p": "Registration Instructions Response",
      "q": "Order Mass Cancel Request",
      "r": "Order Mass Cancel Report",
      "s": "New Order Cross",
      "t": "Cross Order Cancel Replace Request",
      "u": "Cross Order Cancel Request",
      "v": "Security Type Request",
      "w": "Security Types",
      "x": "Security List Request",
      "y": "Security List",
      "z": "Derivative Security List Request",
      "AA": "Derivative Security List",
      "AB": "New Order Multileg",
      "AC": "Multileg Order Cancel Replace",
      "AD": "Trade Capture Report Request",
      "AE": "Trade Capture Report",
      "AF": "Order Mass Status Request",
      "AG": "Quote Request Reject",
      "AH": "Rfq Request",
      "AI": "Quote Status Report",
      "AJ": "Quote Response",
      "AK": "Confirmation",
      "AL": "Position Maintenance Request",
      "AM": "Position Maintenance Report",
      "AN": "Request For Positions",
      "AO": "Request For Positions Ack",
      "AP": "Position Report",
      "AQ": "Trade Capture Report Request Ack",
      "AR": "Trade Capture Report Ack",
      "AS": "Allocation Report",
      "AT": "Allocation Report Ack",
      "AU": "Confirmation Ack",
      "AV": "Settlement Instruction Request",
      "AW": "Assignment Report",
      "AX": "Collateral Request",
      "AY": "Collateral Assignment",
      "AZ": "Collateral Response",
      "BA": "Collateral Report",
      "BB": "Collateral Inquiry",
      "BC": "Network Counterparty System Status Request",
      "BD": "Network Counterparty System Status Response",
      "BE": "User Request",
      "BF": "User Response",
      "BG": "Collateral Inquiry Ack",
      "BH": "Confirmation Request"
    }
  },
  "36": {
    "name": "NewSeqNo",
    "type": "SEQNUM"
  },
  "37": {
    "name": "OrderID",
    "type": "STRING"
  },
  "38": {
    "name": "OrderQty",
    "type": "QTY"
  },
  "39": {
    "name": "OrdStatus",
    "type": "CHAR",
    "values": {
      "0": "New",
      "1": "Partially Filled",
      "2": "Filled",
      "3": "Done For Day",
      "4": "Canceled",
      "6": "Pending Cancel",
      "7": "Stopped",
      "8": "Rejected",
      "9": "Suspended",
      "A": "Pending New",
      "B": "Calculated",
      "C": "Expired",
      "D": "Accepted For Bidding",
      "E": "Pending Replace"
    }
  },
  "40": {
    "name": "OrdType",
    "type": "CHAR",
    "values": {
      "1": "Market",
      "2": "Limit",
      "3": "Stop",
      "4": "Stop Limit",
      "6": "With Or Without",
      "7": "Limit Or Better",
      "8": "Limit With Or Without",
      "9": "On Basis",
      "D": "Previously Quoted",
      "E": "Previously Indicated",
      "G": "Forex Swap",
      "I": "Funari",
      "J": "Market If Touched",
      "K": "Market With Left Over As Limit",
      "L": "Previous Fund Valuation Point",
      "M": "Next Fund Valuation Point",
      "P": "Pegged"
    }
  },
  "41": {
    "name": "OrigClOrdID",
    "type": "STRING"
  },
  "42": {
    "name": "OrigTime",
    "type": "UTCTIMESTAMP"
  },
  "43": {
    "name": "PossDupFlag",
    "type": "BOOLEAN",
    "values": {
      "Y": "Yes",
      "N": "No"
    }
  },
  "44": {
    "name": "Price",
    "type": "PRICE"
  },
  "45": {
    "name": "RefSeqNum",
    "type": "SEQNUM"
  },
  "46": {
    "name": "RelatdSym",
    "type": "STRING"
  },
  "47": {
    "name": "Rule80A",
    "type": "CHAR",
    "values": {
      "A": "Agency Single Order",
      "B": "Short Exempt Transaction A Type",
      "C": "Proprietary Non Algo",
      "D": "Program Order Member",
      "E": "Short Exempt Transaction For Principal",
      "F": "Short Exempt Transaction W Type",
      "H": "Short Exempt Transaction I Type",
      "I": "Individual Investor",
      "J": "Proprietary Algo",
      "K": "Agency Algo",
      "L": "Short Exempt Transaction Member Affliated",
      "M": "Program Order Other Member",
      "N": "Agent For Other Member",
      "O": "Proprietary Transaction Affiliated",
      "P": "Principal",
      "R": "Transaction Non Member",
      "S": "Specialist Trades",
      "T": "Transaction Unaffiliated Member",
      "U": "Agency Index Arb",
      "W": "All Other Orders As Agent For Other Member",
      "X": "Short Exempt Transaction Member Not Affliated",
      "Y": "Agency Non Algo",
      "Z": "Short Exempt Transaction Non Member"
    }
  },
  "48": {
    "name": "SecurityID",
    "type": "STRING"
  },
  "49": {
    "name": "SenderCompID",
    "type": "STRING"
  },
  "50": {
    "name": "SenderSubID",
    "type": "STRING"
  },
  "51": {
    "name": "SendingDate",
    "type": "LOCALMKTDATE"
  },
  "52": {
    "name": "SendingTime",
    "type": "UTCTIMESTAMP"
  },
  "53": {
    "name": "Quantity",
    "type": "QTY"
  },
  "54": {
    "name": "Side",
    "type": "CHAR",
    "values": {
      "1": "Buy",
      "2": "Sell",
      "3": "Buy Minus",
      "4": "Sell Plus",
      "5": "Sell Short",
      "6": "Sell Short Exempt",
      "7": "Undisclosed",
      "8": "Cross",
      "9": "Cross Short",
      "A": "Cross Short Exempt",
      "B": "As Defined",
      "C": "Opposite",
      "D": "Subscribe",
      "E": "Redeem",
      "F": "Lend",
      "G": "Borrow"
    }
  },
  "55": {
    "name": "Symbol",
    "type": "STRING"
  },
  "56": {
    "name": "TargetCompID",
    "type": "STRING"
  },
  "57": {
    "name": "TargetSubID",
    "type": "STRING"
  },
  "58": {
    "name": "Text",
    "type": "STRING"
  },
  "59": {
    "name": "TimeInForce",
    "type": "CHAR",
    "values": {
      "0": "Day",
      "1": "Good Till Cancel",
      "2": "At The Opening",
      "3": "Immediate Or Cancel",
      "4": "Fill Or Kill",
      "5": "Good Till Crossing",
      "6": "Good Till Date",
      "7": "At The Close"
    }
  },
  "60": {
    "name": "TransactTime",
    "type": "UTCTIMESTAMP"
  },
  "61": {
    "name": "Urgency",
    "type": "CHAR",
    "values": {
      "0": "Normal",
      "1": "Flash",
      "2": "Background"
    }
  },
  "62": {
    "name": "ValidUntilTime",
    "type": "UTCTIMESTAMP"
  },
  "63": {
    "name": "SettlType",
    "type": "CHAR",
    "values": {
      "0": "Regular",
      "1": "Cash",
      "2": "Next Day",
      "3": "T Plus2",
      "4": "T Plus3",
      "5": "T Plus4",
      "6": "Future",
      "7": "When And If Issued",
      "8": "Sellers Option",
      "9": "T Plus5"
    }
  },
  "64": {
    "name": "SettlDate",
    "type": "LOCALMKTDATE"
  },
  "65": {
    "name": "SymbolSfx",
    "type": "STRING"
  },
  "66": {
    "name": "ListID",
    "type": "STRING"
  },
  "67": {
    "name": "ListSeqNo",
    "type": "INT"
  },
  "68": {
    "name": "TotNoOrders",
    "type": "INT"
  },
  "69": {
    "name": "ListExecInst",
    "type": "STRING"
  },
  "70": {
    "name": "AllocID",
    "type": "STRING"
  },
  "71": {
    "name": "AllocTransType",
    "type": "CHAR",
    "values": {
      "0": "New",
      "1": "Replace",
      "2": "Cancel"
    }
  },
  "72": {
    "name": "RefAllocID",
    "type": "STRING"
  },
  "73": {
    "name": "NoOrders",
    "type": "NUMINGROUP"
  },
  "74": {
    "name": "AvgPxPrecision",
    "type": "INT"
  },
  "75": {
    "name": "TradeDate",
    "type": "LOCALMKTDATE"
  },
  "76": {
    "name": "ExecBroker",
    "type": "STRING"
  },
  "77": {
    "name": "PositionEffect",
    "type": "CHAR",
    "values": {
      "O": "Open",
      "C": "Close",
      "R": "Rolled",
      "F": "Fifo"
    }
  },
  "78": {
    "name": "NoAllocs",
    "type": "NUMINGROUP"
  },
  "79": {
    "name": "AllocAccount",
    "type": "STRING"
  },
  "80": {
    "name": "AllocQty",
    "type": "QTY"
  },
  "81": {
    "name": "ProcessCode",
    "type": "CHAR",
    "values": {
      "0": "Regular",
      "1": "Soft Dollar",
      "2": "Step In",
      "3": "Step Out",
      "4": "Soft Dollar Step In",
      "5": "Soft Dollar Step Out",
      "6": "Plan Sponsor"
    }
  },
  "82": {
    "name": "NoRpts",
    "type": "INT"
  },
  "83": {
    "name": "RptSeq",
    "type": "INT"
  },
  "84": {
    "name": "CxlQty",
    "type": "QTY"
  },
  "85": {
    "name": "NoDlvyInst",
    "type": "NUMINGROUP"
  },
  "86": {
    "name": "DlvyInst",
    "type": "STRING"
  },
  "87": {
    "name": "AllocStatus",
    "type": "INT",
    "values": {
      "0": "Accepted",
      "1": "Block Level Reject",
      "2": "Account Level Reject",
      "3": "Received",
      "4": "Incomplete",
      "5": "Rejected By Intermediary"
    }
  },
  "88": {
    "name": "AllocRejCode",
    "type": "INT",
    "values": {
      "0": "Unknown Account",
      "1": "Incorrect Quantity",
      "2": "Incorrect Averageg Price",
      "3": "Unknown Executing Broker Mnemonic",
      "4": "Commission Difference",
      "5": "Unknown Order Id",
      "6": "Unknown List Id",
      "7": "Other See Text",
      "8": "Incorrect Allocated Quantity",
      "9": "Calculation Difference",
      "10": "Unknown Or Stale Exec Id",
      "11": "Mismatched Data",
      "12": "Unknown Cl Ord Id",
      "13": "Warehouse Request Rejected"
    }
  },
  "89": {
    "name": "Signature",
    "type": "DATA"
  },
  "90": {
    "name": "SecureDataLen",
    "type": "LENGTH"
  },
  "91": {
    "name": "SecureData",
    "type": "DATA"
  },
  "92": {
    "name": "BrokerOfCredit",
    "type": "STRING"
  },
  "93": {
    "name": "SignatureLength",
    "type": "LENGTH"
  },
  "94": {
    "name": "EmailType",
    "type": "CHAR",
    "values": {
      "0": "New",
      "1": "Reply",
      "2": "Admin Reply"
    }
  },
  "95": {
    "name": "RawDataLength",
    "type": "LENGTH"
  },
  "96": {
    "name": "RawData",
    "type": "DATA"
  },
  "97": {
    "name": "PossResend",
    "type": "BOOLEAN",
    "values": {
      "Y": "Yes",
      "N": "No"
    }
  },
  "98": {
    "name": "EncryptMethod",
    "type": "INT",
    "values": {
      "0": "None",
      "1": "Pkcs",
      "2": "Des",
      "3": "Pkcsdes",
      "4": "Pgpdes",
      "5": "Pgpdesmd5",
      "6": "Pem"
    }
  },
  "99": {
    "name": "StopPx",
    "type": "PRICE"
  },
  "100": {
    "name": "ExDestination",
    "type": "EXCHANGE"
  },
  "102": {
    "name": "CxlRejReason",
    "type": "INT",
    "values": {
      "0": "Too Late To Cancel",
      "1": "Unknown Order",
      "2": "Broker Credit",
      "3": "Order Already In Pending Status",
      "4": "Unable To Process Order Mass Cancel Request",
      "5": "Orig Ord Mod Time",
      "6": "Duplicate Cl Ord Id",
      "99": "Other"
    }
  },
  "103": {
    "name": "OrdRejReason",
    "type": "INT",
    "values": {
      "0": "Broker Credit",
      "1": "Unknown Symbol",
      "2": "Exchange Closed",
      "3": "Order Exceeds Limit",
      "4": "Too Late To Enter",
      "5": "Unknown Order",
      "6": "Duplicate Order",
      "7": "Duplicate Of A Verbally Communicated Order",
      "8": "Stale Order",
      "9": "Trade Along Required",
      "10": "Invalid Investor Id",
      "11": "Unsupported Order Characteristic",
      "13": "Incorrect Quantity",
      "14": "Incorrect Allocated Quantity",
      "15": "Unknown Account",
      "99": "Other"
    }
  },
  "104": {
    "name": "IOIQualifier",
    "type": "CHAR",
    "values": {
      "A": "All Or None",
      "B": "Market On Close",
      "C": "At The Close",
      "D": "Vwap",
      "I": "In Touch With",
      "L": "Limit",
      "M": "More Behind",
      "O": "At The Open",
      "P": "Taking A Position",
      "Q": "At The Market",
      "R": "Ready To Trade",
      "S": "Portfolio Shown",
      "T": "Through The Day",
      "V": "Versus",
      "W": "Indication",
      "X": "Crossing Opportunity",
      "Y": "At The Midpoint",
      "Z": "Pre Open"
    }
  },
  "105": {
    "name": "WaveNo",
    "type": "STRING"
  },
  "106": {
    "name": "Issuer",
    "type": "STRING"
  },
  "107": {
    "name": "SecurityDesc",
    "type": "STRING"
  },
  "108": {
    "name": "HeartBtInt",
    "type": "INT"
  },
  "109": {
    "name": "ClientID",
    "type": "STRING"
  },
  "110": {
    "name": "MinQty",
    "type": "QTY"
  },
  "111": {
    "name": "MaxFloor",
    "type": "QTY"
  },
  "112": {
    "name": "TestReqID",
    "type": "STRING"
  },
  "113": {
    "name": "ReportToExch",
    "type": "BOOLEAN",
    "values": {
      "Y": "Yes",
      "N": "No"
    }
  },
  "114": {
    "name": "LocateReqd",
    "type": "BOOLEAN",
    "values": {
      "Y": "Yes",
      "N": "No"
    }
  },
  "115": {
    "name": "OnBehalfOfCompID",
    "type": "STRING"
  },
  "116": {
    "name": "OnBehalfOfSubID",
    "type": "STRING"
  },
  "117": {
    "name": "QuoteID",
    "type": "STRING"
  },
  "118": {
    "name": "NetMoney",
    "type": "AMT"
  },
  "119": {
    "name": "SettlCurrAmt",
    "type": "AMT"
  },
  "120": {
    "name": "SettlCurrency",
    "type": "CURRENCY"
  },
  "121": {
    "name": "ForexReq",
    "type": "BOOLEAN",
    "values": {
      "Y": "Yes",
      "N": "No"
    }
  },
  "122": {
    "name": "OrigSendingTime",
    "type": "UTCTIMESTAMP"
  },
  "123": {
    "name": "GapFillFlag",
    "type": "BOOLEAN",
    "values": {
      "Y": "Yes",
      "N": "No"
    }
  },
  "124": {
    "name": "NoExecs",
    "type": "NUMINGROUP"
  },
  "125": {
    "name": "CxlType",
    "type": "CHAR"
  },
  "126": {
    "name": "ExpireTime",
    "type": "UTCTIMESTAMP"
  },
  "127": {
    "name": "DKReason",
    "type": "CHAR",
    "values": {
      "A": "Unknown Symbol",
      "B": "Wrong Side",
      "C": "Quantity Exceeds Order",
      "D": "No Matching Order",
      "E": "Price Exceeds Limit",
      "F": "Calculation Difference",
      "Z": "Other"
    }
  },
  "128": {
    "name": "DeliverToCompID",
    "type": "STRING"
  },
  "129": {
    "name": "DeliverToSubID",
    "type": "STRING"
  },
  "130": {
    "name": "IOINaturalFlag",
    "type": "BOOLEAN",
    "values": {
      "Y": "Yes",
      "N": "No"
    }
  },
  "131": {
    "name": "QuoteReqID",
    "type": "STRING"
  },
  "132": {
    "name": "BidPx",
    "type": "PRICE"
  },
  "133": {
    "name": "OfferPx",
    "type": "PRICE"
  },
  "134": {
    "name": "BidSize",
    "type": "QTY"
  },
  "135": {
    "name": "OfferSize",
    "type": "QTY"
  },
  "136": {
    "name": "NoMiscFees",
    "type": "NUMINGROUP"
  },
  "137": {
    "name": "MiscFeeAmt",
    "type": "AMT"
  },
  "138": {
    "name": "MiscFeeCurr",
    "type": "CURRENCY"
  },
  "139": {
    "name": "MiscFeeType",
    "type": "STRING",
    "values": {
      "1": "Regulatory",
      "2": "Tax",
      "3": "Local Commission",
      "4": "Exchange Fees",
      "5": "Stamp",
      "6": "Levy",
      "7": "Other",
      "8": "Markup",
      "9": "Consumption Tax",
      "10": "Per Transaction",
      "11": "Conversion",
      "12": "Agent"
    }
  },
  "140": {
    "name": "PrevClosePx",
    "type": "PRICE"
  },
  "141": {
    "name": "ResetSeqNumFlag",
    "type": "BOOLEAN",
    "values": {
      "Y": "Yes",
      "N": "No"
    }
  },
  "142": {
    "name": "SenderLocationID",
    "type": "STRING"
  },
  "143": {
    "name": "TargetLocationID",
    "type": "STRING"
  },
  "144": {
    "name": "OnBehalfOfLocationID",
    "type": "STRING"
  },
  "145": {
    "name": "DeliverToLocationID",
    "type": "STRING"
  },
  "146": {
    "name": "NoRelatedSym",
    "type": "NUMINGROUP"
  },
  "147": {
    "name": "Subject",
    "type": "STRING"
  },
  "148": {
    "name": "Headline",
    "type": "STRING"
  },
  "149": {
    "name": "URLLink",
    "type": "STRING"
  },
  "150": {
    "name": "ExecType",
    "type": "CHAR",
    "values": {
      "0": "New",
      "3": "Done For Day",
      "4": "Canceled",
      "5": "Replaced",
      "6": "Pending Cancel",
      "7": "Stopped",
      "8": "Rejected",
      "9": "Suspended",
      "A": "Pending New",
      "B": "Calculated",
      "C": "Expired",
      "D": "Restated",
      "E": "Pending Replace",
      "F": "Trade",
      "G": "Trade Correct",
      "H": "Trade Cancel",
      "I": "Order Status"
    }
  },
  "151": {
    "name": "LeavesQty",
    "type": "QTY"
  },
  "152": {
    "name": "CashOrderQty",
    "type": "QTY"
  },
  "153": {
    "name": "AllocAvgPx",
    "type": "PRICE"
  },
  "154": {
    "name": "AllocNetMoney",
    "type": "AMT"
  },
  "155": {
    "name": "SettlCurrFxRate",
    "type": "FLOAT"
  },
  "156": {
    "name": "SettlCurrFxRateCalc",
    "type": "CHAR",
    "values": {
      "M": "Multiply",
      "D": "Divide"
    }
  },
  "157": {
    "name": "NumDaysInterest",
    "type": "INT"
  },
  "158": {
    "name": "AccruedInterestRate",
    "type": "PERCENTAGE"
  },
  "159": {
    "name": "AccruedInterestAmt",
    "type": "AMT"
  },
  "160": {
    "name": "SettlInstMode",
    "type": "CHAR",
    "values": {
      "1": "Standing Instructions Provided",
      "4": "Specific Order For A Single Account",
      "5": "Request Reject"
    }
  },
  "161": {
    "name": "AllocText",
    "type": "STRING"
  },
  "162": {
    "name": "SettlInstID",
    "type": "STRING"
  },
  "163": {
    "name": "SettlInstTransType",
    "type": "CHAR",
    "values": {
      "N": "New",
      "C": "Cancel",
      "R": "Replace",
      "T": "Restate"
    }
  },
  "164": {
    "name": "EmailThreadID",
    "type": "STRING"
  },
  "165": {
    "name": "SettlInstSource",
    "type": "CHAR",
    "values": {
      "1": "Broker Credit",
      "2": "Institution",
      "3": "Investor"
    }
  },
  "166": {
    "name": "SettlLocation",
    "type": "STRING",
    "values": {
      "CED": "Cedel",
      "DTC": "Depository Trust Company",
      "EUR": "Euro Clear",
      "FED": "Federal Book Entry",
      "ISO Country Code": "Local Market Settle Location",
      "PNY": "Physical",
      "PTC": "Participant Trust Company"
    }
  },
  "167": {
    "name": "SecurityType",
    "type": "STRING",
    "values": {
      "EUSUPRA": "Euro Supranational Coupons",
      "FAC": "Federal Agency Coupon",
      "FADN": "Federal Agency Discount Note",
      "PEF": "Private Export Funding",
      "SUPRA": "Usd Supranational Coupons",
      "CORP": "Corporate Bond",
      "CPP": "Corporate Private Placement",
      "CB": "Convertible Bond",
      "DUAL": "Dual Currency",
      "EUCORP": "Euro Corporate Bond",
      "XLINKD": "Indexed Linked",
      "STRUCT": "Structured Notes",
      "YANK": "Yankee Corporate Bond",
      "FOR": "Foreign Exchange Contract",
      "CS": "Common Stock",
      "PS": "Preferred Stock",
      "BRADY": "Brady Bond",
      "EUSOV": "Euro Sovereigns",
      "TBOND": "Us Treasury Bond",
      "TINT": "Interest Strip From Any Bond Or Note",
      "TIPS": "Treasury Inflation Protected Securities",
      "TCAL": "Principal Strip Of A Callable Bond Or Note",
      "TPRN": "Principal Strip From A Non Callable Bond Or Note",
      "UST": "Us Treasury Note Old",
      "USTB": "Us Treasury Bill Old",
      "TNOTE": "Us Treasury Note",
      "TBILL": "Us Treasury Bill",
      "REPO": "Repurchase",
      "FORWARD": "Forward",
      "BUYSELL": "Buy Sellback",
      "SECLOAN": "Securities Loan",
      "SECPLEDGE": "Securities Pledge",
      "TERM": "Term Loan",
      "RVLV": "Revolver Loan",
      "RVLVTRM": "Revolver",
      "BRIDGE": "Bridge Loan",
      "LOFC": "Letter Of Credit",
      "SWING": "Swing Line Facility",
      "DINP": "Debtor In Possession",
      "DEFLTED": "Defaulted",
      "WITHDRN": "Withdrawn",
      "REPLACD": "Replaced",
      "MATURED": "Matured",
      "AMENDED": "Amended",
      "RETIRED": "Retired",
      "BA": "Bankers Acceptance",
      "BN": "Bank Notes",
      "BOX": "Bill Of Exchanges",
      "CD": "Certificate Of Deposit",
      "CL": "Call Loans",
      "CP": "Commercial Paper",
      "DN": "Deposit Notes",
      "EUCD": "Euro Certificate Of Deposit",
      "EUCP": "Euro Commercial Paper",
      "LQN": "Liquidity Note",
      "MTN": "Medium Term Notes",
      "ONITE": "Overnight",
      "PN": "Promissory Note",
      "PZFJ": "Plazos Fijos",
      "STN": "Short Term Loan Note",
      "TD": "Time Deposit",
      "XCN": "Extended Comm Note",
      "YCD": "Yankee Certificate Of Deposit",
      "ABS": "Asset Backed Securities",
      "CMBS": "Corp",
      "CMO": "Collateralized Mortgage Obligation",
      "IET": "Ioette Mortgage",
      "MBS": "Mortgage Backed Securities",
      "MIO": "Mortgage Interest Only",
      "MPO": "Mortgage Principal Only",
      "MPP": "Mortgage Private Placement",
      "MPT": "Miscellaneous Pass Through",
      "PFAND": "Pfandbriefe",
      "TBA": "To Be Announced",
      "AN": "Other Anticipation Notes",
      "COFO": "Certificate Of Obligation",
      "COFP": "Certificate Of Participation",
      "GO": "General Obligation Bonds",
      "MT": "Mandatory Tender",
      "RAN": "Revenue Anticipation Note",
      "REV": "Revenue Bonds",
      "SPCLA": "Special Assessment",
      "SPCLO": "Special Obligation",
      "SPCLT": "Special Tax",
      "TAN": "Tax Anticipation Note",
      "TAXA": "Tax Allocation",
      "TECP": "Tax Exempt Commercial Paper",
      "TRAN": "Tax Revenue Anticipation Note",
      "VRDN": "Variable Rate Demand Note",
      "WAR": "Warrant",
      "MF": "Mutual Fund",
      "MLEG": "Multileg Instrument",
      "NONE": "No Security Type",
      "FUT": "Future",
      "OPT": "Option"
    }
  },
  "168": {
    "name": "EffectiveTime",
    "type": "UTCTIMESTAMP"
  },
  "169": {
    "name": "StandInstDbType",
    "type": "INT",
    "values": {
      "0": "Other",
      "1": "Dtcsid",
      "2": "Thomson Alert",
      "3": "A Global Custodian",
      "4": "Account Net"
    }
  },
  "170": {
    "name": "StandInstDbName",
    "type": "STRING"
  },
  "171": {
    "name": "StandInstDbID",
    "type": "STRING"
  },
  "172": {
    "name": "SettlDeliveryType",
    "type": "INT",
    "values": {
      "0": "Versus",
      "1": "Free",
      "2": "Tri Party",
      "3": "Hold In Custody"
    }
  },
  "173": {
    "name": "SettlDepositoryCode",
    "type": "STRING"
  },
  "174": {
    "name": "SettlBrkrCode",
    "type": "STRING"
  },
  "175": {
    "name": "SettlInstCode",
    "type": "STRING"
  },
  "176": {
    "name": "SecuritySettlAgentName",
    "type": "STRING"
  },
  "177": {
    "name": "SecuritySettlAgentCode",
    "type": "STRING"
  },
  "178": {
    "name": "SecuritySettlAgentAcctNum",
    "type": "STRING"
  },
  "179": {
    "name": "SecuritySettlAgentAcctName",
    "type": "STRING"
  },
  "180": {
    "name": "SecuritySettlAgentContactName",
    "type": "STRING"
  },
  "181": {
    "name": "SecuritySettlAgentContactPhone",
    "type": "STRING"
  },
  "182": {
    "name": "CashSettlAgentName",
    "type": "STRING"
  },
  "183": {
    "name": "CashSettlAgentCode",
    "type": "STRING"
  },
  "184": {
    "name": "CashSettlAgentAcctNum",
    "type": "STRING"
  },
  "185": {
    "name": "CashSettlAgentAcctName",
    "type": "STRING"
  },
  "186": {
    "name": "CashSettlAgentContactName",
    "type": "STRING"
  },
  "187": {
    "name": "CashSettlAgentContactPhone",
    "type": "STRING"
  },
  "188": {
    "name": "BidSpotRate",
    "type": "PRICE"
  },
  "189": {
    "name": "BidForwardPoints",
    "type": "PRICEOFFSET"
  },
  "190": {
    "name": "OfferSpotRate",
    "type": "PRICE"
  },
  "191": {
    "name": "OfferForwardPoints",
    "type": "PRICEOFFSET"
  },
  "192": {
    "name": "OrderQty2",
    "type": "QTY"
  },
  "193": {
    "name": "SettlDate2",
    "type": "LOCALMKTDATE"
  },
  "194": {
    "name": "LastSpotRate",
    "type": "PRICE"
  },
  "195": {
    "name": "LastForwardPoints",
    "type": "PRICEOFFSET"
  },
  "196": {
    "name": "AllocLinkID",
    "type": "STRING"
  },
  "197": {
    "name": "AllocLinkType",
    "type": "INT",
    "values": {
      "0": "Fx Netting",
      "1": "Fx Swap"
    }
  },
  "198": {
    "name": "SecondaryOrderID",
    "type": "STRING"
  },
  "199": {
    "name": "NoIOIQualifiers",
    "type": "NUMINGROUP"
  },
  "200": {
    "name": "MaturityMonthYear",
    "type": "MONTHYEAR"
  },
  "201": {
    "name": "PutOrCall",
    "type": "INT",
    "values": {
      "0": "Put",
      "1": "Call"
    }
  },
  "202": {
    "name": "StrikePrice",
    "type": "PRICE"
  },
  "203": {
    "name": "CoveredOrUncovered",
    "type": "INT",
    "values": {
      "0": "Covered",
      "1": "Uncovered"
    }
  },
  "204": {
    "name": "CustomerOrFirm",
    "type": "INT",
    "values": {
      "0": "Customer",
      "1": "Firm"
    }
  },
  "205": {
    "name": "MaturityDay",
    "type": "DAYOFMONTH"
  },
  "206": {
    "name": "OptAttribute",
    "type": "CHAR"
  },
  "207": {
    "name": "SecurityExchange",
    "type": "EXCHANGE"
  },
  "208": {
    "name": "NotifyBrokerOfCredit",
    "type": "BOOLEAN",
    "values": {
      "Y": "Yes",
      "N": "No"
    }
  },
  "209": {
    "name": "AllocHandlInst",
    "type": "INT",
    "values": {
      "1": "Match",
      "2": "Forward",
      "3": "Forward And Match"
    }
  },
  "210": {
    "name": "MaxShow",
    "type": "QTY"
  },
  "211": {
    "name": "PegOffsetValue",
    "type": "FLOAT"
  },
  "212": {
    "name": "XmlDataLen",
    "type": "LENGTH"
  },
  "213": {
    "name": "XmlData",
    "type": "DATA"
  },
  "214": {
    "name": "SettlInstRefID",
    "type": "STRING"
  },
  "215": {
    "name": "NoRoutingIDs",
    "type": "NUMINGROUP"
  },
  "216": {
    "name": "RoutingType",
    "type": "INT",
    "values": {
      "1": "Target Firm",
      "2": "Target List",
      "3": "Block Firm",
      "4": "Block List"
    }
  },
  "217": {
    "name": "RoutingID",
    "type": "STRING"
  },
  "218": {
    "name": "Spread",
    "type": "PRICEOFFSET"
  },
  "219": {
    "name": "Benchmark",
    "type": "CHAR",
    "values": {
      "1": "Curve",
      "2": "Five Yr",
      "3": "Old5",
      "4": "Ten Yr",
      "5": "Old10",
      "6": "Thirty Yr",
      "7": "Old30",
      "8": "Three Molibor",
      "9": "Six Molibor"
    }
  },
  "220": {
    "name": "BenchmarkCurveCurrency",
    "type": "CURRENCY"
  },
  "221": {
    "name": "BenchmarkCurveName",
    "type": "STRING"
  },
  "222": {
    "name": "BenchmarkCurvePoint",
    "type": "STRING"
  },
  "223": {
    "name": "CouponRate",
    "type": "PERCENTAGE"
  },
  "224": {
    "name": "CouponPaymentDate",
    "type": "LOCALMKTDATE"
  },
  "225": {
    "name": "IssueDate",
    "type": "LOCALMKTDATE"
  },
  "226": {
    "name": "RepurchaseTerm",
    "type": "INT"
  },
  "227": {
    "name": "RepurchaseRate",
    "type": "PERCENTAGE"
  },
  "228": {
    "name": "Factor",
    "type": "FLOAT"
  },
  "229": {
    "name": "TradeOriginationDate",
    "type": "LOCALMKTDATE"
  },
  "230": {
    "name": "ExDate",
    "type": "LOCALMKTDATE"
  },
  "231": {
    "name": "ContractMultiplier",
    "type": "FLOAT"
  },
  "232": {
    "name": "NoStipulations",
    "type": "NUMINGROUP"
  },
  "233": {
    "name": "StipulationType",
    "type": "STRING",
    "values": {
      "AMT": "Alternative Minimum Tax",
      "AUTOREINV": "Auto Reinvestment",
      "BANKQUAL": "Bank Qualified",
      "BGNCON": "Bargain Conditions",
      "COUPON": "Coupon Range",
      "CURRENCY": "Iso Currency Code",
      "CUSTOMDATE": "Custom Start",
      "GEOG": "Geographics",
      "HAIRCUT": "Valuation Discount",
      "INSURED": "Insured",
      "ISSUE": "Issue Date",
      "ISSUER": "Issuer",
      "ISSUESIZE": "Issue Size Range",
      "LOOKBACK": "Lookback Days",
      "LOT": "Explicit Lot Identifier",
      "LOTVAR": "Lot Variance",
      "MAT": "Maturity Year And Month",
      "MATURITY": "Maturity Range",
      "MAXSUBS": "Maximum Substitutions",
      "MINQTY": "Minimum Quantity",
      "MININCR": "Minimum Increment",
      "MINDNOM": "Minimum Denomination",
      "PAYFREQ": "Payment Frequency",
      "PIECES": "Number Of Pieces",
      "PMAX": "Pools Maximum",
      "PPM": "Pools Per Million",
      "PPL": "Pools Per Lot",
      "PPT": "Pools Per Trade",
      "PRICE": "Price Range",
      "PRICEFREQ": "Pricing Frequency",
      "PROD": "Production Year",
      "PROTECT": "Call Protection",
      "PURPOSE": "Purpose",
      "PXSOURCE": "Benchmark Price Source",
      "RATING": "Rating Source And Range",
      "REDEMPTION": "Type Of Redemption",
      "RESTRICTED": "Restricted",
      "SECTOR": "Market Sector",
      "SECTYPE": "Security Type Included Or Excluded",
      "STRUCT": "Structure",
      "SUBSFREQ": "Substitutions Frequency",
      "SUBSLEFT": "Substitutions Left",
      "TEXT": "Freeform Text",
      "TRDVAR": "Trade Variance",
      "WAC": "Weighted Average Coupon",
      "WAL": "Weighted Average Life Coupon",
      "WALA": "Weighted Average Loan Age",
      "WAM": "Weighted Average Maturity",
      "WHOLE": "Whole Pool",
      "YIELD": "Yield Range"
    }
  },
  "234": {
    "name": "StipulationValue",
    "type": "STRING"
  },
  "235": {
    "name": "YieldType",
    "type": "STRING",
    "values": {
      "AFTERTAX": "After Tax Yield",
      "ANNUAL": "Annual Yield",
      "ATISSUE": "Yield At Issue",
      "AVGMATURITY": "Yield To Average Maturity",
      "BOOK": "Book Yield",
      "CALL": "Yield To Next Call",
      "CHANGE": "Yield Change Since Close",
      "CLOSE": "Closing Yield",
      "COMPOUND": "Compound Yield",
      "CURRENT": "Current Yield",
      "GROSS": "True Gross Yield",
      "GOVTEQUIV": "Gvnt Equivalent Yield",
      "INFLATION": "Yield With Inflation Assumption",
      "INVERSEFLOATER": "Inverse Floater Bond Yield",
      "LASTCLOSE": "Most Recent Closing Yield",
      "LASTMONTH": "Closing Yield Most Recent Month",
      "LASTQUARTER": "Closing Yield Most Recent Quarter",
      "LASTYEAR": "Closing Yield Most Recent Year",
      "LONGAVGLIFE": "Yield To Longest Average Life",
      "MARK": "Mark To Market Yield",
      "MATURITY": "Yield To Maturity",
      "NEXTREFUND": "Yield To Next Refund",
      "OPENAVG": "Open Average Yield",
      "PUT": "Yield To Next Put",
      "PREVCLOSE": "Previous Close Yield",
      "PROCEEDS": "Proceeds Yield",
      "SEMIANNUAL": "Semi Annual Yield",
      "SHORTAVGLIFE": "Yield To Shortest Average Life",
      "SIMPLE": "Simple Yield",
      "TAXEQUIV": "Tax Equivalent Yield",
      "TENDER": "Yield To Tender Date",
      "TRUE": "True Yield",
      "VALUE1/32": "Yield Value Of132",
      "WORST": "Yield To Worst"
    }
  },
  "236": {
    "name": "Yield",
    "type": "PERCENTAGE"
  },
  "237": {
    "name": "TotalTakedown",
    "type": "AMT"
  },
  "238": {
    "name": "Concession",
    "type": "AMT"
  },
  "239": {
    "name": "RepoCollateralSecurityType",
    "type": "STRING"
  },
  "240": {
    "name": "RedemptionDate",
    "type": "LOCALMKTDATE"
  },
  "241": {
    "name": "UnderlyingCouponPaymentDate",
    "type": "LOCALMKTDATE"
  },
  "242": {
    "name": "UnderlyingIssueDate",
    "type": "LOCALMKTDATE"
  },
  "243": {
    "name": "UnderlyingRepoCollateralSecurityType",
    "type": "STRING"
  },
  "244": {
    "name": "UnderlyingRepurchaseTerm",
    "type": "INT"
  },
  "245": {
    "name": "UnderlyingRepurchaseRate",
    "type": "PERCENTAGE"
  },
  "246": {
    "name": "UnderlyingFactor",
    "type": "FLOAT"
  },
  "247": {
    "name": "UnderlyingRedemptionDate",
    "type": "LOCALMKTDATE"
  },
  "248": {
    "name": "LegCouponPaymentDate",
    "type": "LOCALMKTDATE"
  },
  "249": {
    "name": "LegIssueDate",
    "type": "LOCALMKTDATE"
  },
  "250": {
    "name": "LegRepoCollateralSecurityType",
    "type": "STRING"
  },
  "251": {
    "name": "LegRepurchaseTerm",
    "type": "INT"
  },
  "252": {
    "name": "LegRepurchaseRate",
    "type": "PERCENTAGE"
  },
  "253": {
    "name": "LegFactor",
    "type": "FLOAT"
  },
  "254": {
    "name": "LegRedemptionDate",
    "type": "LOCALMKTDATE"
  },
  "255": {
    "name": "CreditRating",
    "type": "STRING"
  },
  "256": {
    "name": "UnderlyingCreditRating",
    "type": "STRING"
  },
  "257": {
    "name": "LegCreditRating",
    "type": "STRING"
  },
  "258": {
    "name": "TradedFlatSwitch",
    "type": "BOOLEAN",
    "values": {
      "Y": "Yes",
      "N": "No"
    }
  },
  "259": {
    "name": "BasisFeatureDate",
    "type": "LOCALMKTDATE"
  },
  "260": {
    "name": "BasisFeaturePrice",
    "type": "PRICE"
  },
  "262": {
    "name": "MDReqID",
    "type": "STRING"
  },
  "263": {
    "name": "SubscriptionRequestType",
    "type": "CHAR",
    "values": {
      "0": "Snapshot",
      "1": "Snapshot And Updates",
      "2": "Disable Previous Snapshot"
    }
  },
  "264": {
    "name": "MarketDepth",
    "type": "INT"
  },
  "265": {
    "name": "MDUpdateType",
    "type": "INT",
    "values": {
      "0": "Full Refresh",
      "1": "Incremental Refresh"
    }
  },
  "266": {
    "name": "AggregatedBook",
    "type": "BOOLEAN",
    "values": {
      "Y": "Yes",
      "N": "No"
    }
  },
  "267": {
    "name": "NoMDEntryTypes",
    "type": "NUMINGROUP"
  },
  "268": {
    "name": "NoMDEntries",
    "type": "NUMINGROUP"
  },
  "269": {
    "name": "MDEntryType",
    "type": "CHAR",
    "values": {
      "0": "Bid",
      "1": "Offer",
      "2": "Trade",
      "3": "Index Value",
      "4": "Opening Price",
      "5": "Closing Price",
      "6": "Settlement Price",
      "7": "Trading Session High Price",
      "8": "Trading Session Low Price",
      "9": "Trading Session Vwap Price",
      "A": "Imbalance",
      "B": "Trade Volume",
      "C": "Open Interest"
    }
  },
  "270": {
    "name": "MDEntryPx",
    "type": "PRICE"
  },
  "271": {
    "name": "MDEntrySize",
    "type": "QTY"
  },
  "272": {
    "name": "MDEntryDate",
    "type": "UTCDATEONLY"
  },
  "273": {
    "name": "MDEntryTime",
    "type": "UTCTIMEONLY"
  },
  "274": {
    "name": "TickDirection",
    "type": "CHAR",
    "values": {
      "0": "Plus Tick",
      "1": "Zero Plus Tick",
      "2": "Minus Tick",
      "3": "Zero Minus Tick"
    }
  },
  "275": {
    "name": "MDMkt",
    "type": "EXCHANGE"
  },
  "276": {
    "name": "QuoteCondition",
    "type": "MULTIPLEVALUESTRING",
    "values": {
      "A": "Open",
      "B": "Closed",
      "C": "Exchange Best",
      "D": "Consolidated Best",
      "E": "Locked",
      "F": "Crossed",
      "G": "Depth",
      "H": "Fast Trading",
      "I": "Non Firm"
    }
  },
  "277": {
    "name": "TradeCondition",
    "type": "MULTIPLEVALUESTRING",
    "values": {
      "A": "Cash",
      "B": "Average Price Trade",
      "C": "Cash Trade",
      "D": "Next Day",
      "E": "Opening",
      "F": "Intraday Trade Detail",
      "G": "Rule127 Trade",
      "H": "Rule155 Trade",
      "I": "Sold Last",
      "J": "Next Day Trade",
      "K": "Opened",
      "L": "Seller",
      "M": "Sold",
      "N": "Stopped Stock",
      "P": "Imbalance More Buyers",
      "Q": "Imbalance More Sellers",
      "R": "Opening Price"
    }
  },
  "278": {
    "name": "MDEntryID",
    "type": "STRING"
  },
  "279": {
    "name": "MDUpdateAction",
    "type": "CHAR",
    "values": {
      "0": "New",
      "1": "Change",
      "2": "Delete"
    }
  },
  "280": {
    "name": "MDEntryRefID",
    "type": "STRING"
  },
  "281": {
    "name": "MDReqRejReason",
    "type": "CHAR",
    "values": {
      "0": "Unknown Symbol",
      "1": "Duplicate Md Req Id",
      "2": "Insufficient Bandwidth",
      "3": "Insufficient Permissions",
      "4": "Unsupported Subscription Request Type",
      "5": "Unsupported Market Depth",
      "6": "Unsupported Md Update Type",
      "7": "Unsupported Aggregated Book",
      "8": "Unsupported Md Entry Type",
      "9": "Unsupported Trading Session Id",
      "A": "Unsupported Scope",
      "B": "Unsupported Open Close Settle Flag",
      "C": "Unsupported Md Implicit Delete"
    }
  },
  "282": {
    "name": "MDEntryOriginator",
    "type": "STRING"
  },
  "283": {
    "name": "LocationID",
    "type": "STRING"
  },
  "284": {
    "name": "DeskID",
    "type": "STRING"
  },
  "285": {
    "name": "DeleteReason",
    "type": "CHAR",
    "values": {
      "0": "Cancellation",
      "1": "Error"
    }
  },
  "286": {
    "name": "OpenCloseSettlFlag",
    "type": "MULTIPLEVALUESTRING",
    "values": {
      "0": "Daily Open",
      "1": "Session Open",
      "2": "Delivery Settlement Entry",
      "3": "Expected Entry",
      "4": "Entry From Previous Business Day",
      "5": "Theoretical Price Value"
    }
  },
  "287": {
    "name": "SellerDays",
    "type": "INT"
  },
  "288": {
    "name": "MDEntryBuyer",
    "type": "STRING"
  },
  "289": {
    "name": "MDEntrySeller",
    "type": "STRING"
  },
  "290": {
    "name": "MDEntryPositionNo",
    "type": "INT"
  },
  "291": {
    "name": "FinancialStatus",
    "type": "MULTIPLEVALUESTRING",
    "values": {
      "1": "Bankrupt",
      "2": "Pending Delisting"
    }
  },
  "292": {
    "name": "CorporateAction",
    "type": "MULTIPLEVALUESTRING",
    "values": {
      "A": "Ex Dividend",
      "B": "Ex Distribution",
      "C": "Ex Rights",
      "D": "New",
      "E": "Ex Interest"
    }
  },
  "293": {
    "name": "DefBidSize",
    "type": "QTY"
  },
  "294": {
    "name": "DefOfferSize",
    "type": "QTY"
  },
  "295": {
    "name": "NoQuoteEntries",
    "type": "NUMINGROUP"
  },
  "296": {
    "name": "NoQuoteSets",
    "type": "NUMINGROUP"
  },
  "297": {
    "name": "QuoteStatus",
    "type": "INT",
    "values": {
      "0": "Accepted",
      "1": "Cancel For Symbol",
      "2": "Canceled For Security Type",
      "3": "Canceled For Underlying",
      "4": "Canceled All",
      "5": "Rejected",
      "6": "Removed From Market",
      "7": "Expired",
      "8": "Query",
      "9": "Quote Not Found",
      "10": "Pending",
      "11": "Pass",
      "12": "Locked Market Warning",
      "13": "Cross Market Warning",
      "14": "Canceled Due To Lock Market",
      "15": "Canceled Due To Cross Market"
    }
  },
  "298": {
    "name": "QuoteCancelType",
    "type": "INT",
    "values": {
      "1": "Cancel For One Or More Securities",
      "2": "Cancel For Security Type",
      "3": "Cancel For Underlying Security",
      "4": "Cancel All Quotes"
    }
  },
  "299": {
    "name": "QuoteEntryID",
    "type": "STRING"
  },
  "300": {
    "name": "QuoteRejectReason",
    "type": "INT",
    "values": {
      "1": "Unknown Symbol",
      "2": "Exchange",
      "3": "Quote Request Exceeds Limit",
      "4": "Too Late To Enter",
      "5": "Unknown Quote",
      "6": "Duplicate Quote",
      "7": "Invalid Bid",
      "8": "Invalid Price",
      "9": "Not Authorized To Quote Security",
      "99": "Other"
    }
  },
  "301": {
    "name": "QuoteResponseLevel",
    "type": "INT",
    "values": {
      "0": "No Acknowledgement",
      "1": "Acknowledge Only Negative Or Erroneous Quotes",
      "2": "Acknowledge Each Quote Message"
    }
  },
  "302": {
    "name": "QuoteSetID",
    "type": "STRING"
  },
  "303": {
    "name": "QuoteRequestType",
    "type": "INT",
    "values": {
      "1": "Manual",
      "2": "Automatic"
    }
  },
  "304": {
    "name": "TotNoQuoteEntries",
    "type": "INT"
  },
  "305": {
    "name": "UnderlyingSecurityIDSource",
    "type": "STRING"
  },
  "306": {
    "name": "UnderlyingIssuer",
    "type": "STRING"
  },
  "307": {
    "name": "UnderlyingSecurityDesc",
    "type": "STRING"
  },
  "308": {
    "name": "UnderlyingSecurityExchange",
    "type": "EXCHANGE"
  },
  "309": {
    "name": "UnderlyingSecurityID",
    "type": "STRING"
  },
  "310": {
    "name": "UnderlyingSecurityType",
    "type": "STRING"
  },
  "311": {
    "name": "UnderlyingSymbol",
    "type": "STRING"
  },
  "312": {
    "name": "UnderlyingSymbolSfx",
    "type": "STRING"
  },
  "313": {
    "name": "UnderlyingMaturityMonthYear",
    "type": "MONTHYEAR"
  },
  "314": {
    "name": "UnderlyingMaturityDay",
    "type": "DAYOFMONTH"
  },
  "315": {
    "name": "UnderlyingPutOrCall",
    "type": "INT"
  },
  "316": {
    "name": "UnderlyingStrikePrice",
    "type": "PRICE"
  },
  "317": {
    "name": "UnderlyingOptAttribute",
    "type": "CHAR"
  },
  "318": {
    "name": "UnderlyingCurrency",
    "type": "CURRENCY"
  },
  "319": {
    "name": "RatioQty",
    "type": "QTY"
  },
  "320": {
    "name": "SecurityReqID",
    "type": "STRING"
  },
  "321": {
    "name": "SecurityRequestType",
    "type": "INT",
    "values": {
      "0": "Request Security Identity And Specifications",
      "1": "Request Security Identity For Specifications",
      "2": "Request List Security Types",
      "3": "Request List Securities"
    }
  },
  "322": {
    "name": "SecurityResponseID",
    "type": "STRING"
  },
  "323": {
    "name": "SecurityResponseType",
    "type": "INT",
    "values": {
      "1": "Accept As Is",
      "2": "Accept With Revisions",
      "5": "Reject Security Proposal",
      "6": "Cannot Match Selection Criteria"
    }
  },
  "324": {
    "name": "SecurityStatusReqID",
    "type": "STRING"
  },
  "325": {
    "name": "UnsolicitedIndicator",
    "type": "BOOLEAN",
    "values": {
      "Y": "Yes",
      "N": "No"
    }
  },
  "326": {
    "name": "SecurityTradingStatus",
    "type": "INT",
    "values": {
      "1": "Opening Delay",
      "2": "Trading Halt",
      "3": "Resume",
      "4": "No Open",
      "5": "Price Indication",
      "6": "Trading Range Indication",
      "7": "Market Imbalance Buy",
      "8": "Market Imbalance Sell",
      "9": "Market On Close Imbalance Buy",
      "10": "Market On Close Imbalance Sell",
      "12": "No Market Imbalance",
      "13": "No Market On Close Imbalance",
      "14": "Its Pre Opening",
      "15": "New Price Indication",
      "16": "Trade Dissemination Time",
      "17": "Ready To Trade",
      "18": "Not Available For Trading",
      "19": "Not Traded On This Market",
      "20": "Unknown Or Invalid",
      "21": "Pre Open",
      "22": "Opening Rotation",
      "23": "Fast Market"
    }
  },
  "327": {
    "name": "HaltReasonChar",
    "type": "CHAR",
    "values": {
      "I": "Order Imbalance",
      "X": "Equipment Changeover",
      "P": "News Pending",
      "D": "News Dissemination",
      "E": "Order Influx",
      "M": "Additional Information"
    }
  },
  "328": {
    "name": "InViewOfCommon",
    "type": "BOOLEAN",
    "values": {
      "Y": "Yes",
      "N": "No"
    }
  },
  "329": {
    "name": "DueToRelated",
    "type": "BOOLEAN",
    "values": {
      "Y": "Yes",
      "N": "No"
    }
  },
  "330": {
    "name": "BuyVolume",
    "type": "QTY"
  },
  "331": {
    "name": "SellVolume",
    "type": "QTY"
  },
  "332": {
    "name": "HighPx",
    "type": "PRICE"
  },
  "333": {
    "name": "LowPx",
    "type": "PRICE"
  },
  "334": {
    "name": "Adjustment",
    "type": "INT",
    "values": {
      "1": "Cancel",
      "2": "Error",
      "3": "Correction"
    }
  },
  "335": {
    "name": "TradSesReqID",
    "type": "STRING"
  },
  "336": {
    "name": "TradingSessionID",
    "type": "STRING"
  },
  "337": {
    "name": "ContraTrader",
    "type": "STRING"
  },
  "338": {
    "name": "TradSesMethod",
    "type": "INT",
    "values": {
      "1": "Electronic",
      "2": "Open Outcry",
      "3": "Two Party"
    }
  },
  "339": {
    "name": "TradSesMode",
    "type": "INT",
    "values": {
      "1": "Testing",
      "2": "Simulated",
      "3": "Production"
    }
  },
  "340": {
    "name": "TradSesStatus",
    "type": "INT",
    "values": {
      "0": "Unknown",
      "1": "Halted",
      "2": "Open",
      "3": "Closed",
      "4": "Pre Open",
      "5": "Pre Close",
      "6": "Request Rejected"
    }
  },
  "341": {
    "name": "TradSesStartTime",
    "type": "UTCTIMESTAMP"
  },
  "342": {
    "name": "TradSesOpenTime",
    "type": "UTCTIMESTAMP"
  },
  "343": {
    "name": "TradSesPreCloseTime",
    "type": "UTCTIMESTAMP"
  },
  "344": {
    "name": "TradSesCloseTime",
    "type": "UTCTIMESTAMP"
  },
  "345": {
    "name": "TradSesEndTime",
    "type": "UTCTIMESTAMP"
  },
  "346": {
    "name": "NumberOfOrders",
    "type": "INT"
  },
  "347": {
    "name": "MessageEncoding",
    "type": "STRING",
    "values": {
      "ISO-2022-JP": "Iso2022 Jp",
      "EUC-JP": "Eucjp",
      "Shift_JIS": "Shift Jis",
      "UTF-8": "Utf8"
    }
  },
  "348": {
    "name": "EncodedIssuerLen",
    "type": "LENGTH"
  },
  "349": {
    "name": "EncodedIssuer",
    "type": "DATA"
  },
  "350": {
    "name": "EncodedSecurityDescLen",
    "type": "LENGTH"
  },
  "351": {
    "name": "EncodedSecurityDesc",
    "type": "DATA"
  },
  "352": {
    "name": "EncodedListExecInstLen",
    "type": "LENGTH"
  },
  "353": {
    "name": "EncodedListExecInst",
    "type": "DATA"
  },
  "354": {
    "name": "EncodedTextLen",
    "type": "LENGTH"
  },
  "355": {
    "name": "EncodedText",
    "type": "DATA"
  },
  "356": {
    "name": "EncodedSubjectLen",
    "type": "LENGTH"
  },
  "357": {
    "name": "EncodedSubject",
    "type": "DATA"
  },
  "358": {
    "name": "EncodedHeadlineLen",
    "type": "LENGTH"
  },
  "359": {
    "name": "EncodedHeadline",
    "type": "DATA"
  },
  "360": {
    "name": "EncodedAllocTextLen",
    "type": "LENGTH"
  },
  "361": {
    "name": "EncodedAllocText",
    "type": "DATA"
  },
  "362": {
    "name": "EncodedUnderlyingIssuerLen",
    "type": "LENGTH"
  },
  "363": {
    "name": "EncodedUnderlyingIssuer",
    "type": "DATA"
  },
  "364": {
    "name": "EncodedUnderlyingSecurityDescLen",
    "type": "LENGTH"
  },
  "365": {
    "name": "EncodedUnderlyingSecurityDesc",
    "type": "DATA"
  },
  "366": {
    "name": "AllocPrice",
    "type": "PRICE"
  },
  "367": {
    "name": "QuoteSetValidUntilTime",
    "type": "UTCTIMESTAMP"
  },
  "368": {
    "name": "QuoteEntryRejectReason",
    "type": "INT",
    "values": {
      "1": "Unknown Symbol",
      "2": "Exchange",
      "3": "Quote Exceeds Limit",
      "4": "Too Late To Enter",
      "5": "Unknown Quote",
      "6": "Duplicate Quote",
      "7": "Invalid Bid Ask Spread",
      "8": "Invalid Price",
      "9": "Not Authorized To Quote Security"
    }
  },
  "369": {
    "name": "LastMsgSeqNumProcessed",
    "type": "SEQNUM"
  },
  "370": {
    "name": "OnBehalfOfSendingTime",
    "type": "UTCTIMESTAMP"
  },
  "371": {
    "name": "RefTagID",
    "type": "INT"
  },
  "372": {
    "name": "RefMsgType",
    "type": "STRING"
  },
  "373": {
    "name": "SessionRejectReason",
    "type": "INT",
    "values": {
      "0": "Invalid Tag Number",
      "1": "Required Tag Missing",
      "2": "Tag Not Defined For This Message Type",
      "3": "Undefined Tag",
      "4": "Tag Specified Without A Value",
      "5": "Value Is Incorrect",
      "6": "Incorrect Data Format For Value",
      "7": "Decryption Problem",
      "8": "Signature Problem",
      "9": "Comp Id Problem",
      "10": "Sending Time Accuracy Problem",
      "11": "Invalid Msg Type",
      "12": "Xml Validation Error",
      "13": "Tag Appears More Than Once",
      "14": "Tag Specified Out Of Required Order",
      "15": "Repeating Group Fields Out Of Order",
      "16": "Incorrect Num In Group Count For Repeating Group",
      "17": "Non",
      "99": "Other"
    }
  },
  "374": {
    "name": "BidRequestTransType",
    "type": "CHAR",
    "values": {
      "N": "New",
      "C": "Cancel"
    }
  },
  "375": {
    "name": "ContraBroker",
    "type": "STRING"
  },
  "376": {
    "name": "ComplianceID",
    "type": "STRING"
  },
  "377": {
    "name": "SolicitedFlag",
    "type": "BOOLEAN",
    "values": {
      "Y": "Yes",
      "N": "No"
    }
  },
  "378": {
    "name": "ExecRestatementReason",
    "type": "INT",
    "values": {
      "0": "Gt Corporate Action",
      "1": "Gt Renewal",
      "2": "Verbal Change",
      "3": "Repricing Of Order",
      "4": "Broker Option",
      "5": "Partial Decline Of Order Qty",
      "6": "Cancel On Trading Halt",
      "7": "Cancel On System Failure",
      "8": "Market",
      "9": "Canceled",
      "10": "Warehouse Recap",
      "99": "Other"
    }
  },
  "379": {
    "name": "BusinessRejectRefID",
    "type": "STRING"
  },
  "380": {
    "name": "BusinessRejectReason",
    "type": "INT",
    "values": {
      "0": "Other",
      "1": "Unknown Id",
      "2": "Unknown Security",
      "3": "Unsupported Message Type",
      "4": "Application Not Available",
      "5": "Conditionally Required Field Missing",
      "6": "Not Authorized",
      "7": "Deliver To Firm Not Available At This Time"
    }
  },
  "381": {
    "name": "GrossTradeAmt",
    "type": "AMT"
  },
  "382": {
    "name": "NoContraBrokers",
    "type": "NUMINGROUP"
  },
  "383": {
    "name": "MaxMessageSize",
    "type": "LENGTH"
  },
  "384": {
    "name": "NoMsgTypes",
    "type": "NUMINGROUP"
  },
  "385": {
    "name": "MsgDirection",
    "type": "CHAR",
    "values": {
      "S": "Send",
      "R": "Receive"
    }
  },
  "386": {
    "name": "NoTradingSessions",
    "type": "NUMINGROUP"
  },
  "387": {
    "name": "TotalVolumeTraded",
    "type": "QTY"
  },
  "388": {
    "name": "DiscretionInst",
    "type": "CHAR",
    "values": {
      "0": "Related To Displayed Price",
      "1": "Related To Market Price",
      "2": "Related To Primary Price",
      "3": "Related To Local Primary Price",
      "4": "Related To Midpoint Price",
      "5": "Related To Last Trade Price",
      "6": "Related To Vwap"
    }
  },
  "389": {
    "name": "DiscretionOffsetValue",
    "type": "FLOAT"
  },
  "390": {
    "name": "BidID",
    "type": "STRING"
  },
  "391": {
    "name": "ClientBidID",
    "type": "STRING"
  },
  "392": {
    "name": "ListName",
    "type": "STRING"
  },
  "393": {
    "name": "TotNoRelatedSym",
    "type": "INT"
  },
  "394": {
    "name": "BidType",
    "type": "INT",
    "values": {
      "1": "Non Disclosed",
      "2": "Disclosed",
      "3": "No Bidding Process"
    }
  },
  "395": {
    "name": "NumTickets",
    "type": "INT"
  },
  "396": {
    "name": "SideValue1",
    "type": "AMT"
  },
  "397": {
    "name": "SideValue2",
    "type": "AMT"
  },
  "398": {
    "name": "NoBidDescriptors",
    "type": "NUMINGROUP"
  },
  "399": {
    "name": "BidDescriptorType",
    "type": "INT",
    "values": {
      "1": "Sector",
      "2": "Country",
      "3": "Index"
    }
  },
  "400": {
    "name": "BidDescriptor",
    "type": "STRING"
  },
  "401": {
    "name": "SideValueInd",
    "type": "INT",
    "values": {
      "1": "Side Value1",
      "2": "Side Value2"
    }
  },
  "402": {
    "name": "LiquidityPctLow",
    "type": "PERCENTAGE"
  },
  "403": {
    "name": "LiquidityPctHigh",
    "type": "PERCENTAGE"
  },
  "404": {
    "name": "LiquidityValue",
    "type": "AMT"
  },
  "405": {
    "name": "EFPTrackingError",
    "type": "PERCENTAGE"
  },
  "406": {
    "name": "FairValue",
    "type": "AMT"
  },
  "407": {
    "name": "OutsideIndexPct",
    "type": "PERCENTAGE"
  },
  "408": {
    "name": "ValueOfFutures",
    "type": "AMT"
  },
  "409": {
    "name": "LiquidityIndType",
    "type": "INT",
    "values": {
      "1": "Five Day Moving Average",
      "2": "Twenty Day Moving Average",
      "3": "Normal Market Size",
      "4": "Other"
    }
  },
  "410": {
    "name": "WtAverageLiquidity",
    "type": "PERCENTAGE"
  },
  "411": {
    "name": "ExchangeForPhysical",
    "type": "BOOLEAN",
    "values": {
      "Y": "Yes",
      "N": "No"
    }
  },
  "412": {
    "name": "OutMainCntryUIndex",
    "type": "AMT"
  },
  "413": {
    "name": "CrossPercent",
    "type": "PERCENTAGE"
  },
  "414": {
    "name": "ProgRptReqs",
    "type": "INT",
    "values": {
      "1": "Buy Side Requests",
      "2": "Sell Side Sends",
      "3": "Real Time Execution Reports"
    }
  },
  "415": {
    "name": "ProgPeriodInterval",
    "type": "INT"
  },
  "416": {
    "name": "IncTaxInd",
    "type": "INT",
    "values": {
      "1": "Net",
      "2": "Gross"
    }
  },
  "417": {
    "name": "NumBidders",
    "type": "INT"
  },
  "418": {
    "name": "BidTradeType",
    "type": "CHAR",
    "values": {
      "R": "Risk Trade",
      "G": "Vwap Guarantee",
      "A": "Agency",
      "J": "Guaranteed Close"
    }
  },
  "419": {
    "name": "BasisPxType",
    "type": "CHAR",
    "values": {
      "2": "Closing Price At Morning Session",
      "3": "Closing Price",
      "4": "Current Price",
      "5": "Sq",
      "6": "Vwap Through A Day",
      "7": "Vwap Through A Morning Session",
      "8": "Vwap Through An Afternoon Session",
      "9": "Vwap Through A Day Except",
      "A": "Vwap Through A Morning Session Except",
      "B": "Vwap Through An Afternoon Session Except",
      "C": "Strike",
      "D": "Open",
      "Z": "Others"
    }
  },
  "420": {
    "name": "NoBidComponents",
    "type": "NUMINGROUP"
  },
  "421": {
    "name": "Country",
    "type": "COUNTRY"
  },
  "422": {
    "name": "TotNoStrikes",
    "type": "INT"
  },
  "423": {
    "name": "PriceType",
    "type": "INT",
    "values": {
      "1": "Percentage",
      "2": "Per Unit",
      "3": "Fixed Amount",
      "4": "Discount",
      "5": "Premium",
      "6": "Spread",
      "7": "Ted Price",
      "8": "Ted Yield",
      "9": "Yield",
      "10": "Fixed Cabinet Trade Price",
      "11": "Variable Cabinet Trade Price"
    }
  },
  "424": {
    "name": "DayOrderQty",
    "type": "QTY"
  },
  "425": {
    "name": "DayCumQty",
    "type": "QTY"
  },
  "426": {
    "name": "DayAvgPx",
    "type": "PRICE"
  },
  "427": {
    "name": "GTBookingInst",
    "type": "INT",
    "values": {
      "0": "Book Out All Trades On Day Of Execution",
      "1": "Accumulate Until Filled Or Expired",
      "2": "Accumulate Until Verballly Notified Otherwise"
    }
  },
  "428": {
    "name": "NoStrikes",
    "type": "NUMINGROUP"
  },
  "429": {
    "name": "ListStatusType",
    "type": "INT",
    "values": {
      "1": "Ack",
      "2": "Response",
      "3": "Timed",
      "4": "Exec Started",
      "5": "All Done",
      "6": "Alert"
    }
  },
  "430": {
    "name": "NetGrossInd",
    "type": "INT",
    "values": {
      "1": "Net",
      "2": "Gross"
    }
  },
  "431": {
    "name": "ListOrderStatus",
    "type": "INT",
    "values": {
      "1": "In Bidding Process",
      "2": "Received For Execution",
      "3": "Executing",
      "4": "Cancelling",
      "5": "Alert",
      "6": "All Done",
      "7": "Reject"
    }
  },
  "432": {
    "name": "ExpireDate",
    "type": "LOCALMKTDATE"
  },
  "433": {
    "name": "ListExecInstType",
    "type": "CHAR",
    "values": {
      "1": "Immediate",
      "2": "Wait For Instruction",
      "3": "Sell Driven",
      "4": "Buy Driven Cash Top Up",
      "5": "Buy Driven Cash Withdraw"
    }
  },
  "434": {
    "name": "CxlRejResponseTo",
    "type": "CHAR",
    "values": {
      "1": "Order Cancel Request",
      "2": "Order Cancel"
    }
  },
  "435": {
    "name": "UnderlyingCouponRate",
    "type": "PERCENTAGE"
  },
  "436": {
    "name": "UnderlyingContractMultiplier",
    "type": "FLOAT"
  },
  "437": {
    "name": "ContraTradeQty",
    "type": "QTY"
  },
  "438": {
    "name": "ContraTradeTime",
    "type": "UTCTIMESTAMP"
  },
  "439": {
    "name": "ClearingFirm",
    "type": "STRING"
  },
  "440": {
    "name": "ClearingAccount",
    "type": "STRING"
  },
  "441": {
    "name": "LiquidityNumSecurities",
    "type": "INT"
  },
  "442": {
    "name": "MultiLegReportingType",
    "type": "CHAR",
    "values": {
      "1": "Single Security",
      "2": "Individual Leg Of A Multi Leg Security",
      "3": "Multi Leg Security"
    }
  },
  "443": {
    "name": "StrikeTime",
    "type": "UTCTIMESTAMP"
  },
  "444": {
    "name": "ListStatusText",
    "type": "STRING"
  },
  "445": {
    "name": "EncodedListStatusTextLen",
    "type": "LENGTH"
  },
  "446": {
    "name": "EncodedListStatusText",
    "type": "DATA"
  },
  "447": {
    "name": "PartyIDSource",
    "type": "CHAR",
    "values": {
      "1": "Korean Investor Id",
      "2": "Taiwanese Foreign Investor Id",
      "3": "Taiwanese Trading Acct",
      "4": "Malaysian Central Depository",
      "5": "Chinese Investor Id",
      "6": "Uk National Insurance Or Pension Number",
      "7": "Us Social Security Number",
      "8": "Us Employer Or Tax Id Number",
      "9": "Australian Business Number",
      "B": "Bic",
      "C": "General Identifier",
      "D": "Proprietary",
      "E": "Iso Country Code",
      "F": "Settlement Entity Location",
      "G": "Mic",
      "H": "Csd Participant",
      "A": "Australian Tax File Number",
      "I": "Isitc Acronym"
    }
  },
  "448": {
    "name": "PartyID",
    "type": "STRING"
  },
  "451": {
    "name": "NetChgPrevDay",
    "type": "PRICEOFFSET"
  },
  "452": {
    "name": "PartyRole",
    "type": "INT",
    "values": {
      "1": "Executing Firm",
      "2": "Broker Of Credit",
      "3": "Client Id",
      "4": "Clearing Firm",
      "5": "Investor Id",
      "6": "Introducing Firm",
      "7": "Entering Firm",
      "8": "Locate",
      "9": "Fund Manager Client Id",
      "10": "Settlement Location",
      "11": "Order Origination Trader",
      "12": "Executing Trader",
      "13": "Order Origination Firm",
      "14": "Giveup Clearing Firm",
      "15": "Correspondant Clearing Firm",
      "16": "Executing System",
      "17": "Contra Firm",
      "18": "Contra Clearing Firm",
      "19": "Sponsoring Firm",
      "20": "Underlying Contra Firm",
      "21": "Clearing Organization",
      "22": "Exchange",
      "24": "Customer Account",
      "25": "Correspondent Clearing Organization",
      "26": "Correspondent Broker",
      "27": "Buyer",
      "28": "Custodian",
      "29": "Intermediary",
      "30": "Agent",
      "31": "Sub Custodian",
      "32": "Beneficiary",
      "33": "Interested Party",
      "34": "Regulatory Body",
      "35": "Liquidity Provider",
      "36": "Entering Trader",
      "37": "Contra Trader",
      "38": "Position Account"
    }
  },
  "453": {
    "name": "NoPartyIDs",
    "type": "NUMINGROUP"
  },
  "454": {
    "name": "NoSecurityAltID",
    "type": "NUMINGROUP"
  },
  "455": {
    "name": "SecurityAltID",
    "type": "STRING"
  },
  "456": {
    "name": "SecurityAltIDSource",
    "type": "STRING"
  },
  "457": {
    "name": "NoUnderlyingSecurityAltID",
    "type": "NUMINGROUP"
  },
  "458": {
    "name": "UnderlyingSecurityAltID",
    "type": "STRING"
  },
  "459": {
    "name": "UnderlyingSecurityAltIDSource",
    "type": "STRING"
  },
  "460": {
    "name": "Product",
    "type": "INT",
    "values": {
      "1": "Agency",
      "2": "Commodity",
      "3": "Corporate",
      "4": "Currency",
      "5": "Equity",
      "6": "Government",
      "7": "Index",
      "8": "Loan",
      "9": "Moneymarket",
      "10": "Mortgage",
      "11": "Municipal",
      "12": "Other",
      "13": "Financing"
    }
  },
  "461": {
    "name": "CFICode",
    "type": "STRING"
  },
  "462": {
    "name": "UnderlyingProduct",
    "type": "INT"
  },
  "463": {
    "name": "UnderlyingCFICode",
    "type": "STRING"
  },
  "464": {
    "name": "TestMessageIndicator",
    "type": "BOOLEAN",
    "values": {
      "Y": "Yes",
      "N": "No"
    }
  },
  "466": {
    "name": "BookingRefID",
    "type": "STRING"
  },
  "467": {
    "name": "IndividualAllocID",
    "type": "STRING"
  },
  "468": {
    "name": "RoundingDirection",
    "type": "CHAR",
    "values": {
      "0": "Round To Nearest",
      "1": "Round Down",
      "2": "Round Up"
    }
  },
  "469": {
    "name": "RoundingModulus",
    "type": "FLOAT"
  },
  "470": {
    "name": "CountryOfIssue",
    "type": "COUNTRY"
  },
  "471": {
    "name": "StateOrProvinceOfIssue",
    "type": "STRING"
  },
  "472": {
    "name": "LocaleOfIssue",
    "type": "STRING"
  },
  "473": {
    "name": "NoRegistDtls",
    "type": "NUMINGROUP"
  },
  "474": {
    "name": "MailingDtls",
    "type": "STRING"
  },
  "475": {
    "name": "InvestorCountryOfResidence",
    "type": "COUNTRY"
  },
  "476": {
    "name": "PaymentRef",
    "type": "STRING"
  },
  "477": {
    "name": "DistribPaymentMethod",
    "type": "INT",
    "values": {
      "1": "Crest",
      "2": "Nscc",
      "3": "Euroclear",
      "4": "Clearstream",
      "5": "Cheque",
      "6": "Telegraphic Transfer",
      "7": "Fed Wire",
      "8": "Direct Credit",
      "9": "Ach Credit",
      "10": "Bpay",
      "11": "High Value Clearing System Hvacs",
      "12": "Reinvest In Fund"
    }
  },
  "478": {
    "name": "CashDistribCurr",
    "type": "CURRENCY"
  },
  "479": {
    "name": "CommCurrency",
    "type": "CURRENCY"
  },
  "480": {
    "name": "CancellationRights",
    "type": "CHAR",
    "values": {
      "Y": "Yes",
      "N": "No Execution Only",
      "M": "No Waiver Agreement",
      "O": "No Institutional"
    }
  },
  "481": {
    "name": "MoneyLaunderingStatus",
    "type": "CHAR",
    "values": {
      "1": "Exempt Below Limit",
      "2": "Exempt Money Type",
      "3": "Exempt Authorised",
      "Y": "Passed",
      "N": "Not Checked"
    }
  },
  "482": {
    "name": "MailingInst",
    "type": "STRING"
  },
  "483": {
    "name": "TransBkdTime",
    "type": "UTCTIMESTAMP"
  },
  "484": {
    "name": "ExecPriceType",
    "type": "CHAR",
    "values": {
      "B": "Bid Price",
      "C": "Creation Price",
      "D": "Creation Price Plus Adjustment Percent",
      "E": "Creation Price Plus Adjustment Amount",
      "O": "Offer Price",
      "P": "Offer Price Minus Adjustment Percent",
      "Q": "Offer Price Minus Adjustment Amount",
      "S": "Single Price"
    }
  },
  "485": {
    "name": "ExecPriceAdjustment",
    "type": "FLOAT"
  },
  "486": {
    "name": "DateOfBirth",
    "type": "LOCALMKTDATE"
  },
  "487": {
    "name": "TradeReportTransType",
    "type": "INT"
  },
  "488": {
    "name": "CardHolderName",
    "type": "STRING"
  },
  "489": {
    "name": "CardNumber",
    "type": "STRING"
  },
  "490": {
    "name": "CardExpDate",
    "type": "LOCALMKTDATE"
  },
  "491": {
    "name": "CardIssNum",
    "type": "STRING"
  },
  "492": {
    "name": "PaymentMethod",
    "type": "INT",
    "values": {
      "1": "Crest",
      "2": "Nscc",
      "3": "Euroclear",
      "4": "Clearstream",
      "5": "Cheque",
      "6": "Telegraphic Transfer",
      "7": "Fed Wire",
      "8": "Debit Card",
      "9": "Direct Debit",
      "10": "Direct Credit",
      "11": "Credit Card",
      "12": "Ach Debit",
      "13": "Ach Credit",
      "14": "Bpay",
      "15": "High Value Clearing System"
    }
  },
  "493": {
    "name": "RegistAcctType",
    "type": "STRING"
  },
  "494": {
    "name": "Designation",
    "type": "STRING"
  },
  "495": {
    "name": "TaxAdvantageType",
    "type": "INT",
    "values": {
      "0": "None",
      "1": "Maxi Isa",
      "2": "Tessa",
      "3": "Mini Cash Isa",
      "4": "Mini Stocks And Shares Isa",
      "5": "Mini Insurance Isa",
      "6": "Current Year Payment",
      "7": "Prior Year Payment",
      "8": "Asset Transfer",
      "9": "Employee Prior Year",
      "10": "Employee Current Year",
      "11": "Employer Prior Year",
      "12": "Employer Current Year",
      "13": "Non Fund Prototype Ira",
      "14": "Non Fund Qualified Plan",
      "15": "Defined Contribution Plan",
      "16": "Ira",
      "17": "Ira Rollover",
      "18": "Keogh",
      "19": "Profit Sharing Plan",
      "20": "Us401 K",
      "21": "Self Directed Ira",
      "22": "Us403b",
      "23": "Us457",
      "24": "Roth Ira Prototype",
      "25": "Roth Ira Non Prototype",
      "26": "Roth Conversion Ira Prototype",
      "27": "Roth Conversion Ira Non Prototype",
      "28": "Education Ira Prototype",
      "29": "Education Ira Non Prototype"
    }
  },
  "496": {
    "name": "RegistRejReasonText",
    "type": "STRING"
  },
  "497": {
    "name": "FundRenewWaiv",
    "type": "CHAR",
    "values": {
      "Y": "Yes",
      "N": "No"
    }
  },
  "498": {
    "name": "CashDistribAgentName",
    "type": "STRING"
  },
  "499": {
    "name": "CashDistribAgentCode",
    "type": "STRING"
  },
  "500": {
    "name": "CashDistribAgentAcctNumber",
    "type": "STRING"
  },
  "501": {
    "name": "CashDistribPayRef",
    "type": "STRING"
  },
  "502": {
    "name": "CashDistribAgentAcctName",
    "type": "STRING"
  },
  "503": {
    "name": "CardStartDate",
    "type": "LOCALMKTDATE"
  },
  "504": {
    "name": "PaymentDate",
    "type": "LOCALMKTDATE"
  },
  "505": {
    "name": "PaymentRemitterID",
    "type": "STRING"
  },
  "506": {
    "name": "RegistStatus",
    "type": "CHAR",
    "values": {
      "A": "Accepted",
      "R": "Rejected",
      "H": "Held",
      "N": "Reminder"
    }
  },
  "507": {
    "name": "RegistRejReasonCode",
    "type": "INT",
    "values": {
      "1": "Invalid Account Type",
      "2": "Invalid Tax Exempt Type",
      "3": "Invalid Ownership Type",
      "4": "No Reg Details",
      "5": "Invalid Reg Seq No",
      "6": "Invalid Reg Details",
      "7": "Invalid Mailing Details",
      "8": "Invalid Mailing Instructions",
      "9": "Invalid Investor Id",
      "10": "Invalid Investor Id Source",
      "11": "Invalid Date Of Birth",
      "12": "Invalid Country",
      "13": "Invalid Distrib Instns",
      "14": "Invalid Percentage",
      "15": "Invalid Payment Method",
      "16": "Invalid Account Name",
      "17": "Invalid Agent Code",
      "18": "Invalid Account Num",
      "99": "Other"
    }
  },
  "508": {
    "name": "RegistRefID",
    "type": "STRING"
  },
  "509": {
    "name": "RegistDtls",
    "type": "STRING"
  },
  "510": {
    "name": "NoDistribInsts",
    "type": "NUMINGROUP"
  },
  "511": {
    "name": "RegistEmail",
    "type": "STRING"
  },
  "512": {
    "name": "DistribPercentage",
    "type": "PERCENTAGE"
  },
  "513": {
    "name": "RegistID",
    "type": "STRING"
  },
  "514": {
    "name": "RegistTransType",
    "type": "CHAR",
    "values": {
      "0": "New",
      "1": "Replace",
      "2": "Cancel"
    }
  },
  "515": {
    "name": "ExecValuationPoint",
    "type": "UTCTIMESTAMP"
  },
  "516": {
    "name": "OrderPercent",
    "type": "PERCENTAGE"
  },
  "517": {
    "name": "OwnershipType",
    "type": "CHAR",
    "values": {
      "2": "Joint Trustees",
      "J": "Joint Investors",
      "T": "Tenants In Common"
    }
  },
  "518": {
    "name": "NoContAmts",
    "type": "NUMINGROUP"
  },
  "519": {
    "name": "ContAmtType",
    "type": "INT",
    "values": {
      "1": "Commission Amount",
      "2": "Commission Percent",
      "3": "Initial Charge Amount",
      "4": "Initial Charge Percent",
      "5": "Discount Amount",
      "6": "Discount Percent",
      "7": "Dilution Levy Amount",
      "8": "Dilution Levy Percent",
      "9": "Exit Charge Amount",
      "10": "Exit Charge Percent",
      "11": "Fund Based Renewal Commission Percent",
      "12": "Projected Fund Value",
      "13": "Fund Based Renewal Commission On Order",
      "14": "Fund Based Renewal Commission On Fund",
      "15": "Net Settlement Amount"
    }
  },
  "520": {
    "name": "ContAmtValue",
    "type": "FLOAT"
  },
  "521": {
    "name": "ContAmtCurr",
    "type": "CURRENCY"
  },
  "522": {
    "name": "OwnerType",
    "type": "INT",
    "values": {
      "1": "Individual Investor",
      "2": "Public Company",
      "3": "Private Company",
      "4": "Individual Trustee",
      "5": "Company Trustee",
      "6": "Pension Plan",
      "7": "Custodian Under Gifts To Minors Act",
      "8": "Trusts",
      "9": "Fiduciaries",
      "10": "Networking Sub Account",
      "11": "Non Profit Organization",
      "12": "Corporate Body",
      "13": "Nominee"
    }
  },
  "523": {
    "name": "PartySubID",
    "type": "STRING"
  },
  "524": {
    "name": "NestedPartyID",
    "type": "STRING"
  },
  "525": {
    "name": "NestedPartyIDSource",
    "type": "CHAR"
  },
  "526": {
    "name": "SecondaryClOrdID",
    "type": "STRING"
  },
  "527": {
    "name": "SecondaryExecID",
    "type": "STRING"
  },
  "528": {
    "name": "OrderCapacity",
    "type": "CHAR",
    "values": {
      "A": "Agency",
      "G": "Proprietary",
      "I": "Individual",
      "P": "Principal",
      "R": "Riskless Principal",
      "W": "Agent For Other Member"
    }
  },
  "529": {
    "name": "OrderRestrictions",
    "type": "MULTIPLEVALUESTRING",
    "values": {
      "1": "Program Trade",
      "2": "Index Arbitrage",
      "3": "Non Index Arbitrage",
      "4": "Competing Market Maker",
      "5": "Acting As Market Maker Or Specialist In Security",
      "6": "Acting As Market Maker Or Specialist In Underlying",
      "7": "Foreign Entity",
      "8": "External Market Participant",
      "9": "External Inter Connected Market Linkage",
      "A": "Riskless Arbitrage"
    }
  },
  "530": {
    "name": "MassCancelRequestType",
    "type": "CHAR",
    "values": {
      "1": "Cancel Orders For A Security",
      "2": "Cancel Orders For An Underlying Security",
      "3": "Cancel Orders For A Product",
      "4": "Cancel Orders For Acfi Code",
      "5": "Cancel Orders For A Security Type",
      "6": "Cancel Orders For A Trading Session",
      "7": "Cancel All Orders"
    }
  },
  "531": {
    "name": "MassCancelResponse",
    "type": "CHAR",
    "values": {
      "0": "Cancel Request Rejected",
      "1": "Cancel Orders For A Security",
      "2": "Cancel Orders For An Underlying Security",
      "3": "Cancel Orders For A Product",
      "4": "Cancel Orders For Acfi Code",
      "5": "Cancel Orders For A Security Type",
      "6": "Cancel Orders For A Trading Session",
      "7": "Cancel All Orders"
    }
  },
  "532": {
    "name": "MassCancelRejectReason",
    "type": "STRING",
    "values": {
      "0": "Mass Cancel Not Supported",
      "1": "Invalid Or Unknown Security",
      "2": "Invalid Or Unkown Underlying Security",
      "3": "Invalid Or Unknown Product",
      "4": "Invalid Or Unknown Cfi Code",
      "5": "Invalid Or Unknown Security Type",
      "6": "Invalid Or Unknown Trading Session",
      "99": "Other"
    }
  },
  "533": {
    "name": "TotalAffectedOrders",
    "type": "INT"
  },
  "534": {
    "name": "NoAffectedOrders",
    "type": "NUMINGROUP"
  },
  "535": {
    "name": "AffectedOrderID",
    "type": "STRING"
  },
  "536": {
    "name": "AffectedSecondaryOrderID",
    "type": "STRING"
  },
  "537": {
    "name": "QuoteType",
    "type": "INT",
    "values": {
      "0": "Indicative",
      "1": "Tradeable",
      "2": "Restricted Tradeable",
      "3": "Counter"
    }
  },
  "538": {
    "name": "NestedPartyRole",
    "type": "INT"
  },
  "539": {
    "name": "NoNestedPartyIDs",
    "type": "NUMINGROUP"
  },
  "540": {
    "name": "TotalAccruedInterestAmt",
    "type": "AMT"
  },
  "541": {
    "name": "MaturityDate",
    "type": "LOCALMKTDATE"
  },
  "542": {
    "name": "UnderlyingMaturityDate",
    "type": "LOCALMKTDATE"
  },
  "543": {
    "name": "InstrRegistry",
    "type": "STRING"
  },
  "544": {
    "name": "CashMargin",
    "type": "CHAR",
    "values": {
      "1": "Cash",
      "2": "Margin Open",
      "3": "Margin Close"
    }
  },
  "545": {
    "name": "NestedPartySubID",
    "type": "STRING"
  },
  "546": {
    "name": "Scope",
    "type": "MULTIPLEVALUESTRING",
    "values": {
      "1": "Local Market",
      "2": "National",
      "3": "Global"
    }
  },
  "547": {
    "name": "MDImplicitDelete",
    "type": "BOOLEAN",
    "values": {
      "Y": "Yes",
      "N": "No"
    }
  },
  "548": {
    "name": "CrossID",
    "type": "STRING"
  },
  "549": {
    "name": "CrossType",
    "type": "INT",
    "values": {
      "1": "Cross Aon",
      "2": "Cross Ioc",
      "3": "Cross One Side",
      "4": "Cross Same Price"
    }
  },
  "550": {
    "name": "CrossPrioritization",
    "type": "INT",
    "values": {
      "0": "None",
      "1": "Buy Side Is Prioritized",
      "2": "Sell Side Is Prioritized"
    }
  },
  "551": {
    "name": "OrigCrossID",
    "type": "STRING"
  },
  "552": {
    "name": "NoSides",
    "type": "NUMINGROUP",
    "values": {
      "1": "One Side",
      "2": "Both Sides"
    }
  },
  "553": {
    "name": "Username",
    "type": "STRING"
  },
  "554": {
    "name": "Password",
    "type": "STRING"
  },
  "555": {
    "name": "NoLegs",
    "type": "NUMINGROUP"
  },
  "556": {
    "name": "LegCurrency",
    "type": "CURRENCY"
  },
  "557": {
    "name": "TotNoSecurityTypes",
    "type": "INT"
  },
  "558": {
    "name": "NoSecurityTypes",
    "type": "NUMINGROUP"
  },
  "559": {
    "name": "SecurityListRequestType",
    "type": "INT",
    "values": {
      "0": "Symbol",
      "1": "Security Type And",
      "2": "Product",
      "3": "Trading Session Id",
      "4": "All Securities"
    }
  },
  "560": {
    "name": "SecurityRequestResult",
    "type": "INT",
    "values": {
      "0": "Valid Request",
      "1": "Invalid Or Unsupported Request",
      "2": "No Instruments Found",
      "3": "Not Authorized To Retrieve Instrument Data",
      "4": "Instrument Data Temporarily Unavailable",
      "5": "Request For Instrument Data Not Supported"
    }
  },
  "561": {
    "name": "RoundLot",
    "type": "QTY"
  },
  "562": {
    "name": "MinTradeVol",
    "type": "QTY"
  },
  "563": {
    "name": "MultiLegRptTypeReq",
    "type": "INT",
    "values": {
      "0": "Report By Mulitleg Security Only",
      "1": "Report By Multileg Security And Instrument Legs",
      "2": "Report By Instrument Legs Only"
    }
  },
  "564": {
    "name": "LegPositionEffect",
    "type": "CHAR"
  },
  "565": {
    "name": "LegCoveredOrUncovered",
    "type": "INT"
  },
  "566": {
    "name": "LegPrice",
    "type": "PRICE"
  },
  "567": {
    "name": "TradSesStatusRejReason",
    "type": "INT",
    "values": {
      "1": "Unknown Or Invalid Trading Session Id",
      "99": "Other"
    }
  },
  "568": {
    "name": "TradeRequestID",
    "type": "STRING"
  },
  "569": {
    "name": "TradeRequestType",
    "type": "INT",
    "values": {
      "0": "All Trades",
      "1": "Matched Trades Matching Criteria",
      "2": "Unmatched Trades That Match Criteria",
      "3": "Unreported Trades That Match Criteria",
      "4": "Advisories That Match Criteria"
    }
  },
  "570": {
    "name": "PreviouslyReported",
    "type": "BOOLEAN",
    "values": {
      "Y": "Yes",
      "N": "No"
    }
  },
  "571": {
    "name": "TradeReportID",
    "type": "STRING"
  },
  "572": {
    "name": "TradeReportRefID",
    "type": "STRING"
  },
  "573": {
    "name": "MatchStatus",
    "type": "CHAR",
    "values": {
      "0": "Compared",
      "1": "Uncompared",
      "2": "Advisory Or Alert"
    }
  },
  "574": {
    "name": "MatchType",
    "type": "STRING",
    "values": {
      "A1": "Exact Match Plus4 Badges Exec Time",
      "A2": "Exact Match Plus4 Badges",
      "A3": "Exact Match Plus2 Badges Exec Time",
      "A4": "Exact Match Plus2 Badges",
      "A5": "Exact Match Plus Exec Time",
      "AQ": "Stamped Advisories Or Specialist Accepts",
      "S1": "A1 Exact Match Summarized Quantity",
      "S2": "A2 Exact Match Summarized Quantity",
      "S3": "A3 Exact Match Summarized Quantity",
      "S4": "A4 Exact Match Summarized Quantity",
      "S5": "A5 Exact Match Summarized Quantity",
      "M1": "Exact Match Minus Badges Times",
      "M2": "Summarized Match Minus Badges Times",
      "MT": "Ocs Locked In",
      "M3": "Act Accepted Trade",
      "M4": "Act Default Trade",
      "M5": "Act Default After M2",
      "M6": "Actm6 Match"
    }
  },
  "575": {
    "name": "OddLot",
    "type": "BOOLEAN",
    "values": {
      "Y": "Yes",
      "N": "No"
    }
  },
  "576": {
    "name": "NoClearingInstructions",
    "type": "NUMINGROUP"
  },
  "577": {
    "name": "ClearingInstruction",
    "type": "INT",
    "values": {
      "0": "Process Normally",
      "1": "Exclude From All Netting",
      "2": "Bilateral Netting Only",
      "3": "Ex Clearing",
      "4": "Special Trade",
      "5": "Multilateral Netting",
      "6": "Clear Against Central Counterparty",
      "7": "Exclude From Central Counterparty",
      "8": "Manual Mode",
      "9": "Automatic Posting Mode",
      "10": "Automatic Give Up Mode",
      "11": "Qualified Service Representative Qsr",
      "12": "Customer Trade",
      "13": "Self Clearing"
    }
  },
  "578": {
    "name": "TradeInputSource",
    "type": "STRING"
  },
  "579": {
    "name": "TradeInputDevice",
    "type": "STRING"
  },
  "580": {
    "name": "NoDates",
    "type": "NUMINGROUP"
  },
  "581": {
    "name": "AccountType",
    "type": "INT",
    "values": {
      "1": "Carried Customer Side",
      "2": "Carried Non Customer Side",
      "3": "House Trader",
      "4": "Floor Trader",
      "6": "Carried Non Customer Side Cross Margined",
      "7": "House Trader Cross Margined",
      "8": "Joint Back Office Account"
    }
  },
  "582": {
    "name": "CustOrderCapacity",
    "type": "INT",
    "values": {
      "1": "Member Trading For Their Own Account",
      "2": "Clearing Firm Trading For Its Proprietary Account",
      "3": "Member Trading For Another Member",
      "4": "All Other"
    }
  },
  "583": {
    "name": "ClOrdLinkID",
    "type": "STRING"
  },
  "584": {
    "name": "MassStatusReqID",
    "type": "STRING"
  },
  "585": {
    "name": "MassStatusReqType",
    "type": "INT",
    "values": {
      "1": "Status For Orders For A Security",
      "2": "Status For Orders For An Underlying Security",
      "3": "Status For Orders For A Product",
      "4": "Status For Orders For Acfi Code",
      "5": "Status For Orders For A Security Type",
      "6": "Status For Orders For A Trading Session",
      "7": "Status For All Orders",
      "8": "Status For Orders For A Party Id"
    }
  },
  "586": {
    "name": "OrigOrdModTime",
    "type": "UTCTIMESTAMP"
  },
  "587": {
    "name": "LegSettlType",
    "type": "CHAR"
  },
  "588": {
    "name": "LegSettlDate",
    "type": "LOCALMKTDATE"
  },
  "589": {
    "name": "DayBookingInst",
    "type": "CHAR",
    "values": {
      "0": "Auto",
      "1": "Speak With Order Initiator Before Booking",
      "2": "Accumulate"
    }
  },
  "590": {
    "name": "BookingUnit",
    "type": "CHAR",
    "values": {
      "0": "Each Partial Execution Is A Bookable Unit",
      "1": "Aggregate Partial Executions On This Order",
      "2": "Aggregate Executions For This Symbol"
    }
  },
  "591": {
    "name": "PreallocMethod",
    "type": "CHAR",
    "values": {
      "0": "Pro Rata",
      "1": "Do Not Pro Rata"
    }
  },
  "592": {
    "name": "UnderlyingCountryOfIssue",
    "type": "COUNTRY"
  },
  "593": {
    "name": "UnderlyingStateOrProvinceOfIssue",
    "type": "STRING"
  },
  "594": {
    "name": "UnderlyingLocaleOfIssue",
    "type": "STRING"
  },
  "595": {
    "name": "UnderlyingInstrRegistry",
    "type": "STRING"
  },
  "596": {
    "name": "LegCountryOfIssue",
    "type": "COUNTRY"
  },
  "597": {
    "name": "LegStateOrProvinceOfIssue",
    "type": "STRING"
  },
  "598": {
    "name": "LegLocaleOfIssue",
    "type": "STRING"
  },
  "599": {
    "name": "LegInstrRegistry",
    "type": "STRING"
  },
  "600": {
    "name": "LegSymbol",
    "type": "STRING"
  },
  "601": {
    "name": "LegSymbolSfx",
    "type": "STRING"
  },
  "602": {
    "name": "LegSecurityID",
    "type": "STRING"
  },
  "603": {
    "name": "LegSecurityIDSource",
    "type": "STRING"
  },
  "604": {
    "name": "NoLegSecurityAltID",
    "type": "NUMINGROUP"
  },
  "605": {
    "name": "LegSecurityAltID",
    "type": "STRING"
  },
  "606": {
    "name": "LegSecurityAltIDSource",
    "type": "STRING"
  },
  "607": {
    "name": "LegProduct",
    "type": "INT"
  },
  "608": {
    "name": "LegCFICode",
    "type": "STRING"
  },
  "609": {
    "name": "LegSecurityType",
    "type": "STRING"
  },
  "610": {
    "name": "LegMaturityMonthYear",
    "type": "MONTHYEAR"
  },
  "611": {
    "name": "LegMaturityDate",
    "type": "LOCALMKTDATE"
  },
  "612": {
    "name": "LegStrikePrice",
    "type": "PRICE"
  },
  "613": {
    "name": "LegOptAttribute",
    "type": "CHAR"
  },
  "614": {
    "name": "LegContractMultiplier",
    "type": "FLOAT"
  },
  "615": {
    "name": "LegCouponRate",
    "type": "PERCENTAGE"
  },
  "616": {
    "name": "LegSecurityExchange",
    "type": "EXCHANGE"
  },
  "617": {
    "name": "LegIssuer",
    "type": "STRING"
  },
  "618": {
    "name": "EncodedLegIssuerLen",
    "type": "LENGTH"
  },
  "619": {
    "name": "EncodedLegIssuer",
    "type": "DATA"
  },
  "620": {
    "name": "LegSecurityDesc",
    "type": "STRING"
  },
  "621": {
    "name": "EncodedLegSecurityDescLen",
    "type": "LENGTH"
  },
  "622": {
    "name": "EncodedLegSecurityDesc",
    "type": "DATA"
  },
  "623": {
    "name": "LegRatioQty",
    "type": "FLOAT"
  },
  "624": {
    "name": "LegSide",
    "type": "CHAR"
  },
  "625": {
    "name": "TradingSessionSubID",
    "type": "STRING"
  },
  "626": {
    "name": "AllocType",
    "type": "INT",
    "values": {
      "1": "Calculated",
      "2": "Preliminary",
      "5": "Ready To Book",
      "7": "Warehouse Instruction",
      "8": "Request To Intermediary"
    }
  },
  "627": {
    "name": "NoHops",
    "type": "NUMINGROUP"
  },
  "628": {
    "name": "HopCompID",
    "type": "STRING"
  },
  "629": {
    "name": "HopSendingTime",
    "type": "UTCTIMESTAMP"
  },
  "630": {
    "name": "HopRefID",
    "type": "SEQNUM"
  },
  "631": {
    "name": "MidPx",
    "type": "PRICE"
  },
  "632": {
    "name": "BidYield",
    "type": "PERCENTAGE"
  },
  "633": {
    "name": "MidYield",
    "type": "PERCENTAGE"
  },
  "634": {
    "name": "OfferYield",
    "type": "PERCENTAGE"
  },
  "635": {
    "name": "ClearingFeeIndicator",
    "type": "STRING",
    "values": {
      "1": "First Year Delegate",
      "2": "Second Year Delegate",
      "3": "Third Year Delegate",
      "4": "Fourth Year Delegate",
      "5": "Fifth Year Delegate",
      "9": "Sixth Year Delegate",
      "B": "Cboe Member",
      "C": "Non Member And Customer",
      "E": "Equity Member And Clearing Member",
      "F": "Full And Associate Member",
      "H": "Firms106 H And106 J",
      "I": "Gim",
      "L": "Lessee106 F Employees",
      "M": "All Other Ownership Types"
    }
  },
  "636": {
    "name": "WorkingIndicator",
    "type": "BOOLEAN",
    "values": {
      "Y": "Yes",
      "N": "No"
    }
  },
  "637": {
    "name": "LegLastPx",
    "type": "PRICE"
  },
  "638": {
    "name": "PriorityIndicator",
    "type": "INT",
    "values": {
      "0": "Priority Unchanged",
      "1": "Lost Priority As Result Of Order Change"
    }
  },
  "639": {
    "name": "PriceImprovement",
    "type": "PRICEOFFSET"
  },
  "640": {
    "name": "Price2",
    "type": "PRICE"
  },
  "641": {
    "name": "LastForwardPoints2",
    "type": "PRICEOFFSET"
  },
  "642": {
    "name": "BidForwardPoints2",
    "type": "PRICEOFFSET"
  },
  "643": {
    "name": "OfferForwardPoints2",
    "type": "PRICEOFFSET"
  },
  "644": {
    "name": "RFQReqID",
    "type": "STRING"
  },
  "645": {
    "name": "MktBidPx",
    "type": "PRICE"
  },
  "646": {
    "name": "MktOfferPx",
    "type": "PRICE"
  },
  "647": {
    "name": "MinBidSize",
    "type": "QTY"
  },
  "648": {
    "name": "MinOfferSize",
    "type": "QTY"
  },
  "649": {
    "name": "QuoteStatusReqID",
    "type": "STRING"
  },
  "650": {
    "name": "LegalConfirm",
    "type": "BOOLEAN",
    "values": {
      "Y": "Yes",
      "N": "No"
    }
  },
  "651": {
    "name": "UnderlyingLastPx",
    "type": "PRICE"
  },
  "652": {
    "name": "UnderlyingLastQty",
    "type": "QTY"
  },
  "654": {
    "name": "LegRefID",
    "type": "STRING"
  },
  "655": {
    "name": "ContraLegRefID",
    "type": "STRING"
  },
  "656": {
    "name": "SettlCurrBidFxRate",
    "type": "FLOAT"
  },
  "657": {
    "name": "SettlCurrOfferFxRate",
    "type": "FLOAT"
  },
  "658": {
    "name": "QuoteRequestRejectReason",
    "type": "INT",
    "values": {
      "1": "Unknown Symbol",
      "2": "Exchange",
      "3": "Quote Request Exceeds Limit",
      "4": "Too Late To Enter",
      "5": "Invalid Price",
      "6": "Not Authorized To Request Quote",
      "7": "No Match For Inquiry",
      "8": "No Market For Instrument",
      "9": "No Inventory",
      "10": "Pass",
      "99": "Other"
    }
  },
  "659": {
    "name": "SideComplianceID",
    "type": "STRING"
  },
  "660": {
    "name": "AcctIDSource",
    "type": "INT",
    "values": {
      "1": "Bic",
      "2": "Sid Code",
      "3": "Tfm",
      "4": "Omgeo",
      "5": "Dtcc Code",
      "99": "Other"
    }
  },
  "661": {
    "name": "AllocAcctIDSource",
    "type": "INT"
  },
  "662": {
    "name": "BenchmarkPrice",
    "type": "PRICE"
  },
  "663": {
    "name": "BenchmarkPriceType",
    "type": "INT"
  },
  "664": {
    "name": "ConfirmID",
    "type": "STRING"
  },
  "665": {
    "name": "ConfirmStatus",
    "type": "INT",
    "values": {
      "1": "Received",
      "2": "Mismatched Account",
      "3": "Missing Settlement Instructions",
      "4": "Confirmed",
      "5": "Request Rejected"
    }
  },
  "666": {
    "name": "ConfirmTransType",
    "type": "INT",
    "values": {
      "0": "New",
      "1": "Replace",
      "2": "Cancel"
    }
  },
  "667": {
    "name": "ContractSettlMonth",
    "type": "MONTHYEAR"
  },
  "668": {
    "name": "DeliveryForm",
    "type": "INT",
    "values": {
      "1": "Book Entry",
      "2": "Bearer"
    }
  },
  "669": {
    "name": "LastParPx",
    "type": "PRICE"
  },
  "670": {
    "name": "NoLegAllocs",
    "type": "NUMINGROUP"
  },
  "671": {
    "name": "LegAllocAccount",
    "type": "STRING"
  },
  "672": {
    "name": "LegIndividualAllocID",
    "type": "STRING"
  },
  "673": {
    "name": "LegAllocQty",
    "type": "QTY"
  },
  "674": {
    "name": "LegAllocAcctIDSource",
    "type": "STRING"
  },
  "675": {
    "name": "LegSettlCurrency",
    "type": "CURRENCY"
  },
  "676": {
    "name": "LegBenchmarkCurveCurrency",
    "type": "CURRENCY"
  },
  "677": {
    "name": "LegBenchmarkCurveName",
    "type": "STRING"
  },
  "678": {
    "name": "LegBenchmarkCurvePoint",
    "type": "STRING"
  },
  "679": {
    "name": "LegBenchmarkPrice",
    "type": "PRICE"
  },
  "680": {
    "name": "LegBenchmarkPriceType",
    "type": "INT"
  },
  "681": {
    "name": "LegBidPx",
    "type": "PRICE"
  },
  "682": {
    "name": "LegIOIQty",
    "type": "STRING"
  },
  "683": {
    "name": "NoLegStipulations",
    "type": "NUMINGROUP"
  },
  "684": {
    "name": "LegOfferPx",
    "type": "PRICE"
  },
  "686": {
    "name": "LegPriceType",
    "type": "INT"
  },
  "687": {
    "name": "LegQty",
    "type": "QTY"
  },
  "688": {
    "name": "LegStipulationType",
    "type": "STRING"
  },
  "689": {
    "name": "LegStipulationValue",
    "type": "STRING"
  },
  "690": {
    "name": "LegSwapType",
    "type": "INT",
    "values": {
      "1": "Par For Par",
      "2": "Modified Duration",
      "4": "Risk",
      "5": "Proceeds"
    }
  },
  "691": {
    "name": "Pool",
    "type": "STRING"
  },
  "692": {
    "name": "QuotePriceType",
    "type": "INT",
    "values": {
      "1": "Percent",
      "2": "Per Share",
      "3": "Fixed Amount",
      "4": "Discount",
      "5": "Premium",
      "6": "Spread",
      "7": "Ted Price",
      "8": "Ted Yield",
      "9": "Yield Spread",
      "10": "Yield"
    }
  },
  "693": {
    "name": "QuoteRespID",
    "type": "STRING"
  },
  "694": {
    "name": "QuoteRespType",
    "type": "INT",
    "values": {
      "1": "Hit",
      "2": "Counter",
      "3": "Expired",
      "4": "Cover",
      "5": "Done Away",
      "6": "Pass"
    }
  },
  "695": {
    "name": "QuoteQualifier",
    "type": "CHAR"
  },
  "696": {
    "name": "YieldRedemptionDate",
    "type": "LOCALMKTDATE"
  },
  "697": {
    "name": "YieldRedemptionPrice",
    "type": "PRICE"
  },
  "698": {
    "name": "YieldRedemptionPriceType",
    "type": "INT"
  },
  "699": {
    "name": "BenchmarkSecurityID",
    "type": "STRING"
  },
  "700": {
    "name": "ReversalIndicator",
    "type": "BOOLEAN"
  },
  "701": {
    "name": "YieldCalcDate",
    "type": "LOCALMKTDATE"
  },
  "702": {
    "name": "NoPositions",
    "type": "NUMINGROUP"
  },
  "703": {
    "name": "PosType",
    "type": "STRING",
    "values": {
      "TQ": "Transaction Quantity",
      "IAS": "Intra Spread Qty",
      "IES": "Inter Spread Qty",
      "FIN": "End Of Day Qty",
      "SOD": "Start Of Day Qty",
      "EX": "Option Exercise Qty",
      "AS": "Option Assignment",
      "TX": "Transaction From Exercise",
      "TA": "Transaction From Assignment",
      "PIT": "Pit Trade Qty",
      "TRF": "Transfer Trade Qty",
      "ETR": "Electronic Trade Qty",
      "ALC": "Allocation Trade Qty",
      "PA": "Adjustment Qty",
      "ASF": "As Of Trade Qty",
      "DLV": "Delivery Qty",
      "TOT": "Total Transaction Qty",
      "XM": "Cross Margin Qty",
      "SPL": "Integral Split"
    }
  },
  "704": {
    "name": "LongQty",
    "type": "QTY"
  },
  "705": {
    "name": "ShortQty",
    "type": "QTY"
  },
  "706": {
    "name": "PosQtyStatus",
    "type": "INT",
    "values": {
      "0": "Submitted",
      "1": "Accepted",
      "2": "Rejected"
    }
  },
  "707": {
    "name": "PosAmtType",
    "type": "STRING",
    "values": {
      "FMTM": "Final Mark To Market Amount",
      "IMTM": "Incremental Mark To Market Amount",
      "TVAR": "Trade Variation Amount",
      "SMTM": "Start Of Day Mark To Market Amount",
      "PREM": "Premium Amount",
      "CRES": "Cash Residual Amount",
      "CASH": "Cash Amount",
      "VADJ": "Value Adjusted Amount"
    }
  },
  "708": {
    "name": "PosAmt",
    "type": "AMT"
  },
  "709": {
    "name": "PosTransType",
    "type": "INT",
    "values": {
      "1": "Exercise",
      "2": "Do Not Exercise",
      "3": "Position Adjustment",
      "4": "Position Change Submission",
      "5": "Pledge"
    }
  },
  "710": {
    "name": "PosReqID",
    "type": "STRING"
  },
  "711": {
    "name": "NoUnderlyings",
    "type": "NUMINGROUP"
  },
  "712": {
    "name": "PosMaintAction",
    "type": "INT",
    "values": {
      "1": "New",
      "2": "Replace",
      "3": "Cancel"
    }
  },
  "713": {
    "name": "OrigPosReqRefID",
    "type": "STRING"
  },
  "714": {
    "name": "PosMaintRptRefID",
    "type": "STRING"
  },
  "715": {
    "name": "ClearingBusinessDate",
    "type": "LOCALMKTDATE"
  },
  "716": {
    "name": "SettlSessID",
    "type": "STRING",
    "values": {
      "ITD": "Intraday",
      "RTH": "Regular Trading Hours",
      "ETH": "Electronic Trading Hours"
    }
  },
  "717": {
    "name": "SettlSessSubID",
    "type": "STRING"
  },
  "718": {
    "name": "AdjustmentType",
    "type": "INT",
    "values": {
      "0": "Process Request As Margin Disposition",
      "1": "Delta Plus",
      "2": "Delta Minus",
      "3": "Final"
    }
  },
  "719": {
    "name": "ContraryInstructionIndicator",
    "type": "BOOLEAN"
  },
  "720": {
    "name": "PriorSpreadIndicator",
    "type": "BOOLEAN"
  },
  "721": {
    "name": "PosMaintRptID",
    "type": "STRING"
  },
  "722": {
    "name": "PosMaintStatus",
    "type": "INT",
    "values": {
      "0": "Accepted",
      "1": "Accepted With Warnings",
      "2": "Rejected",
      "3": "Completed",
      "4": "Completed With Warnings"
    }
  },
  "723": {
    "name": "PosMaintResult",
    "type": "INT",
    "values": {
      "0": "Successful Completion",
      "1": "Rejected",
      "99": "Other"
    }
  },
  "724": {
    "name": "PosReqType",
    "type": "INT",
    "values": {
      "0": "Positions",
      "1": "Trades",
      "2": "Exercises",
      "3": "Assignments"
    }
  },
  "725": {
    "name": "ResponseTransportType",
    "type": "INT",
    "values": {
      "0": "Inband",
      "1": "Out Of Band"
    }
  },
  "726": {
    "name": "ResponseDestination",
    "type": "STRING"
  },
  "727": {
    "name": "TotalNumPosReports",
    "type": "INT"
  },
  "728": {
    "name": "PosReqResult",
    "type": "INT",
    "values": {
      "0": "Valid Request",
      "1": "Invalid Or Unsupported Request",
      "2": "No Positions Found That Match Criteria",
      "3": "Not Authorized To Request Positions",
      "4": "Request For Position Not Supported",
      "99": "Other"
    }
  },
  "729": {
    "name": "PosReqStatus",
    "type": "INT",
    "values": {
      "0": "Completed",
      "1": "Completed With Warnings",
      "2": "Rejected"
    }
  },
  "730": {
    "name": "SettlPrice",
    "type": "PRICE"
  },
  "731": {
    "name": "SettlPriceType",
    "type": "INT",
    "values": {
      "1": "Final",
      "2": "Theoretical"
    }
  },
  "732": {
    "name": "UnderlyingSettlPrice",
    "type": "PRICE"
  },
  "733": {
    "name": "UnderlyingSettlPriceType",
    "type": "INT"
  },
  "734": {
    "name": "PriorSettlPrice",
    "type": "PRICE"
  },
  "735": {
    "name": "NoQuoteQualifiers",
    "type": "NUMINGROUP"
  },
  "736": {
    "name": "AllocSettlCurrency",
    "type": "CURRENCY"
  },
  "737": {
    "name": "AllocSettlCurrAmt",
    "type": "AMT"
  },
  "738": {
    "name": "InterestAtMaturity",
    "type": "AMT"
  },
  "739": {
    "name": "LegDatedDate",
    "type": "LOCALMKTDATE"
  },
  "740": {
    "name": "LegPool",
    "type": "STRING"
  },
  "741": {
    "name": "AllocInterestAtMaturity",
    "type": "AMT"
  },
  "742": {
    "name": "AllocAccruedInterestAmt",
    "type": "AMT"
  },
  "743": {
    "name": "DeliveryDate",
    "type": "LOCALMKTDATE"
  },
  "744": {
    "name": "AssignmentMethod",
    "type": "CHAR",
    "values": {
      "R": "Random",
      "P": "Pro Rata"
    }
  },
  "745": {
    "name": "AssignmentUnit",
    "type": "QTY"
  },
  "746": {
    "name": "OpenInterest",
    "type": "AMT"
  },
  "747": {
    "name": "ExerciseMethod",
    "type": "CHAR",
    "values": {
      "A": "Automatic",
      "M": "Manual"
    }
  },
  "748": {
    "name": "TotNumTradeReports",
    "type": "INT"
  },
  "749": {
    "name": "TradeRequestResult",
    "type": "INT",
    "values": {
      "0": "Successful",
      "1": "Invalid Or Unknown Instrument",
      "2": "Invalid Type Of Trade Requested",
      "3": "Invalid Parties",
      "4": "Invalid Transport Type Requested",
      "5": "Invalid Destination Requested",
      "8": "Trade Request Type Not Supported",
      "9": "Not Authorized",
      "99": "Other"
    }
  },
  "750": {
    "name": "TradeRequestStatus",
    "type": "INT",
    "values": {
      "0": "Accepted",
      "1": "Completed",
      "2": "Rejected"
    }
  },
  "751": {
    "name": "TradeReportRejectReason",
    "type": "INT",
    "values": {
      "0": "Successful",
      "1": "Invalid Party Onformation",
      "2": "Unknown Instrument",
      "3": "Unauthorized To Report Trades",
      "4": "Invalid Trade Type",
      "99": "Other"
    }
  },
  "752": {
    "name": "SideMultiLegReportingType",
    "type": "INT",
    "values": {
      "1": "Single Security",
      "2": "Individual Leg Of A Multileg Security",
      "3": "Multileg Security"
    }
  },
  "753": {
    "name": "NoPosAmt",
    "type": "NUMINGROUP"
  },
  "754": {
    "name": "AutoAcceptIndicator",
    "type": "BOOLEAN"
  },
  "755": {
    "name": "AllocReportID",
    "type": "STRING"
  },
  "756": {
    "name": "NoNested2PartyIDs",
    "type": "NUMINGROUP"
  },
  "757": {
    "name": "Nested2PartyID",
    "type": "STRING"
  },
  "758": {
    "name": "Nested2PartyIDSource",
    "type": "CHAR"
  },
  "759": {
    "name": "Nested2PartyRole",
    "type": "INT"
  },
  "760": {
    "name": "Nested2PartySubID",
    "type": "STRING"
  },
  "761": {
    "name": "BenchmarkSecurityIDSource",
    "type": "STRING"
  },
  "762": {
    "name": "SecuritySubType",
    "type": "STRING"
  },
  "763": {
    "name": "UnderlyingSecuritySubType",
    "type": "STRING"
  },
  "764": {
    "name": "LegSecuritySubType",
    "type": "STRING"
  },
  "765": {
    "name": "AllowableOneSidednessPct",
    "type": "PERCENTAGE"
  },
  "766": {
    "name": "AllowableOneSidednessValue",
    "type": "AMT"
  },
  "767": {
    "name": "AllowableOneSidednessCurr",
    "type": "CURRENCY"
  },
  "768": {
    "name": "NoTrdRegTimestamps",
    "type": "NUMINGROUP"
  },
  "769": {
    "name": "TrdRegTimestamp",
    "type": "UTCTIMESTAMP"
  },
  "770": {
    "name": "TrdRegTimestampType",
    "type": "INT",
    "values": {
      "1": "Execution Time",
      "2": "Time In",
      "3": "Time Out",
      "4": "Broker Receipt",
      "5": "Broker Execution"
    }
  },
  "771": {
    "name": "TrdRegTimestampOrigin",
    "type": "STRING"
  },
  "772": {
    "name": "ConfirmRefID",
    "type": "STRING"
  },
  "773": {
    "name": "ConfirmType",
    "type": "INT",
    "values": {
      "1": "Status",
      "2": "Confirmation",
      "3": "Confirmation Request Rejected"
    }
  },
  "774": {
    "name": "ConfirmRejReason",
    "type": "INT",
    "values": {
      "1": "Mismatched Account",
      "2": "Missing Settlement Instructions",
      "99": "Other"
    }
  },
  "775": {
    "name": "BookingType",
    "type": "INT",
    "values": {
      "0": "Regular Booking",
      "1": "Cfd",
      "2": "Total Return Swap"
    }
  },
  "776": {
    "name": "IndividualAllocRejCode",
    "type": "INT"
  },
  "777": {
    "name": "SettlInstMsgID",
    "type": "STRING"
  },
  "778": {
    "name": "NoSettlInst",
    "type": "NUMINGROUP"
  },
  "779": {
    "name": "LastUpdateTime",
    "type": "UTCTIMESTAMP"
  },
  "780": {
    "name": "AllocSettlInstType",
    "type": "INT",
    "values": {
      "0": "Use Default Instructions",
      "1": "Derive From Parameters Provided",
      "2": "Full Details Provided",
      "3": "Ssidbi Ds Provided",
      "4": "Phone For Instructions"
    }
  },
  "781": {
    "name": "NoSettlPartyIDs",
    "type": "NUMINGROUP"
  },
  "782": {
    "name": "SettlPartyID",
    "type": "STRING"
  },
  "783": {
    "name": "SettlPartyIDSource",
    "type": "CHAR"
  },
  "784": {
    "name": "SettlPartyRole",
    "type": "INT"
  },
  "785": {
    "name": "SettlPartySubID",
    "type": "STRING"
  },
  "786": {
    "name": "SettlPartySubIDType",
    "type": "INT"
  },
  "787": {
    "name": "DlvyInstType",
    "type": "CHAR",
    "values": {
      "S": "Securities",
      "C": "Cash"
    }
  },
  "788": {
    "name": "TerminationType",
    "type": "INT",
    "values": {
      "1": "Overnight",
      "2": "Term",
      "3": "Flexible",
      "4": "Open"
    }
  },
  "789": {
    "name": "NextExpectedMsgSeqNum",
    "type": "SEQNUM"
  },
  "790": {
    "name": "OrdStatusReqID",
    "type": "STRING"
  },
  "791": {
    "name": "SettlInstReqID",
    "type": "STRING"
  },
  "792": {
    "name": "SettlInstReqRejCode",
    "type": "INT",
    "values": {
      "0": "Unable To Process Request",
      "1": "Unknown Account",
      "2": "No Matching Settlement Instructions Found",
      "99": "Other"
    }
  },
  "793": {
    "name": "SecondaryAllocID",
    "type": "STRING"
  },
  "794": {
    "name": "AllocReportType",
    "type": "INT",
    "values": {
      "3": "Sellside Calculated Using Preliminary",
      "4": "Sellside Calculated Without Preliminary",
      "5": "Warehouse Recap",
      "8": "Request To Intermediary"
    }
  },
  "795": {
    "name": "AllocReportRefID",
    "type": "STRING"
  },
  "796": {
    "name": "AllocCancReplaceReason",
    "type": "INT",
    "values": {
      "1": "Original Details Incomplete",
      "2": "Change In Underlying Order Details",
      "99": "Other"
    }
  },
  "797": {
    "name": "CopyMsgIndicator",
    "type": "BOOLEAN"
  },
  "798": {
    "name": "AllocAccountType",
    "type": "INT",
    "values": {
      "1": "Carried Customer Side",
      "2": "Carried Non Customer Side",
      "3": "House Trader",
      "4": "Floor Trader",
      "6": "Carried Non Customer Side Cross Margined",
      "7": "House Trader Cross Margined",
      "8": "Joint Back Office Account"
    }
  },
  "799": {
    "name": "OrderAvgPx",
    "type": "PRICE"
  },
  "800": {
    "name": "OrderBookingQty",
    "type": "QTY"
  },
  "801": {
    "name": "NoSettlPartySubIDs",
    "type": "NUMINGROUP"
  },
  "802": {
    "name": "NoPartySubIDs",
    "type": "NUMINGROUP"
  },
  "803": {
    "name": "PartySubIDType",
    "type": "INT",
    "values": {
      "1": "Firm",
      "2": "Person",
      "3": "System",
      "4": "Application",
      "5": "Full Legal Name Of Firm",
      "6": "Postal Address",
      "7": "Phone Number",
      "8": "Email Address",
      "9": "Contact Name",
      "10": "Securities Account Number",
      "11": "Registration Number",
      "12": "Registered Address For Confirmation",
      "13": "Regulatory Status",
      "14": "Registration Name",
      "15": "Cash Account Number",
      "16": "Bic",
      "17": "Csd Participant Member Code",
      "18": "Registered Address",
      "19": "Fund Account Name",
      "20": "Telex Number",
      "21": "Fax Number",
      "22": "Securities Account Name",
      "23": "Cash Account Name",
      "24": "Department",
      "25": "Location Desk",
      "26": "Position Account Type"
    }
  },
  "804": {
    "name": "NoNestedPartySubIDs",
    "type": "NUMINGROUP"
  },
  "805": {
    "name": "NestedPartySubIDType",
    "type": "INT"
  },
  "806": {
    "name": "NoNested2PartySubIDs",
    "type": "NUMINGROUP"
  },
  "807": {
    "name": "Nested2PartySubIDType",
    "type": "INT"
  },
  "808": {
    "name": "AllocIntermedReqType",
    "type": "INT",
    "values": {
      "1": "Pending Accept",
      "2": "Pending Release",
      "3": "Pending Reversal",
      "4": "Accept",
      "5": "Block Level Reject",
      "6": "Account Level Reject"
    }
  },
  "810": {
    "name": "UnderlyingPx",
    "type": "PRICE"
  },
  "811": {
    "name": "PriceDelta",
    "type": "FLOAT"
  },
  "812": {
    "name": "ApplQueueMax",
    "type": "INT"
  },
  "813": {
    "name": "ApplQueueDepth",
    "type": "INT"
  },
  "814": {
    "name": "ApplQueueResolution",
    "type": "INT",
    "values": {
      "0": "No Action Taken",
      "1": "Queue Flushed",
      "2": "Overlay Last",
      "3": "End Session"
    }
  },
  "815": {
    "name": "ApplQueueAction",
    "type": "INT",
    "values": {
      "0": "No Action Taken",
      "1": "Queue Flushed",
      "2": "Overlay Last",
      "3": "End Session"
    }
  },
  "816": {
    "name": "NoAltMDSource",
    "type": "NUMINGROUP"
  },
  "817": {
    "name": "AltMDSourceID",
    "type": "STRING"
  },
  "818": {
    "name": "SecondaryTradeReportID",
    "type": "STRING"
  },
  "819": {
    "name": "AvgPxIndicator",
    "type": "INT",
    "values": {
      "0": "No Average Pricing",
      "1": "Trade",
      "2": "Last Trade"
    }
  },
  "820": {
    "name": "TradeLinkID",
    "type": "STRING"
  },
  "821": {
    "name": "OrderInputDevice",
    "type": "STRING"
  },
  "822": {
    "name": "UnderlyingTradingSessionID",
    "type": "STRING"
  },
  "823": {
    "name": "UnderlyingTradingSessionSubID",
    "type": "STRING"
  },
  "824": {
    "name": "TradeLegRefID",
    "type": "STRING"
  },
  "825": {
    "name": "ExchangeRule",
    "type": "STRING"
  },
  "826": {
    "name": "TradeAllocIndicator",
    "type": "INT",
    "values": {
      "0": "Allocation Not Required",
      "1": "Allocation Required",
      "2": "Use Allocation Provided With The Trade"
    }
  },
  "827": {
    "name": "ExpirationCycle",
    "type": "INT",
    "values": {
      "0": "Expire On Trading Session Close",
      "1": "Expire On Trading Session Open"
    }
  },
  "828": {
    "name": "TrdType",
    "type": "INT",
    "values": {
      "0": "Regular Trade",
      "1": "Block Trade",
      "2": "Efp",
      "3": "Transfer",
      "4": "Late Trade",
      "5": "T Trade",
      "6": "Weighted Average Price Trade",
      "7": "Bunched Trade",
      "8": "Late Bunched Trade",
      "9": "Prior Reference Price Trade",
      "10": "After Hours Trade"
    }
  },
  "829": {
    "name": "TrdSubType",
    "type": "INT"
  },
  "830": {
    "name": "TransferReason",
    "type": "STRING"
  },
  "832": {
    "name": "TotNumAssignmentReports",
    "type": "INT"
  },
  "833": {
    "name": "AsgnRptID",
    "type": "STRING"
  },
  "834": {
    "name": "ThresholdAmount",
    "type": "PRICEOFFSET"
  },
  "835": {
    "name": "PegMoveType",
    "type": "INT",
    "values": {
      "0": "Floating",
      "1": "Fixed"
    }
  },
  "836": {
    "name": "PegOffsetType",
    "type": "INT",
    "values": {
      "0": "Price",
      "1": "Basis Points",
      "2": "Ticks",
      "3": "Price Tier"
    }
  },
  "837": {
    "name": "PegLimitType",
    "type": "INT",
    "values": {
      "0": "Or Better",
      "1": "Strict",
      "2": "Or Worse"
    }
  },
  "838": {
    "name": "PegRoundDirection",
    "type": "INT",
    "values": {
      "1": "More Aggressive",
      "2": "More Passive"
    }
  },
  "839": {
    "name": "PeggedPrice",
    "type": "PRICE"
  },
  "840": {
    "name": "PegScope",
    "type": "INT",
    "values": {
      "1": "Local",
      "2": "National",
      "3": "Global",
      "4": "National Excluding Local"
    }
  },
  "841": {
    "name": "DiscretionMoveType",
    "type": "INT",
    "values": {
      "0": "Floating",
      "1": "Fixed"
    }
  },
  "842": {
    "name": "DiscretionOffsetType",
    "type": "INT",
    "values": {
      "0": "Price",
      "1": "Basis Points",
      "2": "Ticks",
      "3": "Price Tier"
    }
  },
  "843": {
    "name": "DiscretionLimitType",
    "type": "INT",
    "values": {
      "0": "Or Better",
      "1": "Strict",
      "2": "Or Worse"
    }
  },
  "844": {
    "name": "DiscretionRoundDirection",
    "type": "INT",
    "values": {
      "1": "More Aggressive",
      "2": "More Passive"
    }
  },
  "845": {
    "name": "DiscretionPrice",
    "type": "PRICE"
  },
  "846": {
    "name": "DiscretionScope",
    "type": "INT",
    "values": {
      "1": "Local",
      "2": "National",
      "3": "Global",
      "4": "National Excluding Local"
    }
  },
  "847": {
    "name": "TargetStrategy",
    "type": "INT",
    "values": {
      "1": "Vwap",
      "2": "Participate",
      "3": "Mininize Market Impact"
    }
  },
  "848": {
    "name": "TargetStrategyParameters",
    "type": "STRING"
  },
  "849": {
    "name": "ParticipationRate",
    "type": "PERCENTAGE"
  },
  "850": {
    "name": "TargetStrategyPerformance",
    "type": "FLOAT"
  },
  "851": {
    "name": "LastLiquidityInd",
    "type": "INT",
    "values": {
      "1": "Added Liquidity",
      "2": "Removed Liquidity",
      "3": "Liquidity Routed Out"
    }
  },
  "852": {
    "name": "PublishTrdIndicator",
    "type": "BOOLEAN",
    "values": {
      "Y": "Yes",
      "N": "No"
    }
  },
  "853": {
    "name": "ShortSaleReason",
    "type": "INT",
    "values": {
      "0": "Dealer Sold Short",
      "1": "Dealer Sold Short Exempt",
      "2": "Selling Customer Sold Short",
      "3": "Selling Customer Sold Short Exempt",
      "4": "Qualified Service Representative",
      "5": "Qsr Or Agu Contra Side Sold Short Exempt"
    }
  },
  "854": {
    "name": "QtyType",
    "type": "INT",
    "values": {
      "0": "Units",
      "1": "Contracts"
    }
  },
  "855": {
    "name": "SecondaryTrdType",
    "type": "INT"
  },
  "856": {
    "name": "TradeReportType",
    "type": "INT",
    "values": {
      "0": "Submit",
      "1": "Alleged",
      "2": "Accept",
      "3": "Decline",
      "4": "Addendum",
      "5": "No",
      "6": "Trade Report Cancel",
      "7": "Locked In"
    }
  },
  "857": {
    "name": "AllocNoOrdersType",
    "type": "INT",
    "values": {
      "0": "Not Specified",
      "1": "Explicit List Provided"
    }
  },
  "858": {
    "name": "SharedCommission",
    "type": "AMT"
  },
  "859": {
    "name": "ConfirmReqID",
    "type": "STRING"
  },
  "860": {
    "name": "AvgParPx",
    "type": "PRICE"
  },
  "861": {
    "name": "ReportedPx",
    "type": "PRICE"
  },
  "862": {
    "name": "NoCapacities",
    "type": "NUMINGROUP"
  },
  "863": {
    "name": "OrderCapacityQty",
    "type": "QTY"
  },
  "864": {
    "name": "NoEvents",
    "type": "NUMINGROUP"
  },
  "865": {
    "name": "EventType",
    "type": "INT",
    "values": {
      "1": "Put",
      "2": "Call",
      "3": "Tender",
      "4": "Sinking Fund Call",
      "99": "Other"
    }
  },
  "866": {
    "name": "EventDate",
    "type": "LOCALMKTDATE"
  },
  "867": {
    "name": "EventPx",
    "type": "PRICE"
  },
  "868": {
    "name": "EventText",
    "type": "STRING"
  },
  "869": {
    "name": "PctAtRisk",
    "type": "PERCENTAGE"
  },
  "870": {
    "name": "NoInstrAttrib",
    "type": "NUMINGROUP"
  },
  "871": {
    "name": "InstrAttribType",
    "type": "INT",
    "values": {
      "1": "Flat",
      "2": "Zero Coupon",
      "3": "Interest Bearing",
      "4": "No Periodic Payments",
      "5": "Variable Rate",
      "6": "Less Fee For Put",
      "7": "Stepped Coupon",
      "8": "Coupon Period",
      "9": "When",
      "10": "Original Issue Discount",
      "11": "Callable",
      "12": "Escrowed To Maturity",
      "13": "Escrowed To Redemption Date",
      "14": "Pre Refunded",
      "15": "In Default",
      "16": "Unrated",
      "17": "Taxable",
      "18": "Indexed",
      "19": "Subject To Alternative Minimum Tax",
      "20": "Original Issue Discount Price",
      "21": "Callable Below Maturity Value",
      "22": "Callable Without Notice",
      "99": "Text"
    }
  },
  "872": {
    "name": "InstrAttribValue",
    "type": "STRING"
  },
  "873": {
    "name": "DatedDate",
    "type": "LOCALMKTDATE"
  },
  "874": {
    "name": "InterestAccrualDate",
    "type": "LOCALMKTDATE"
  },
  "875": {
    "name": "CPProgram",
    "type": "INT",
    "values": {
      "1": "Program3a3",
      "2": "Program42",
      "99": "Other"
    }
  },
  "876": {
    "name": "CPRegType",
    "type": "STRING"
  },
  "877": {
    "name": "UnderlyingCPProgram",
    "type": "STRING"
  },
  "878": {
    "name": "UnderlyingCPRegType",
    "type": "STRING"
  },
  "879": {
    "name": "UnderlyingQty",
    "type": "QTY"
  },
  "880": {
    "name": "TrdMatchID",
    "type": "STRING"
  },
  "881": {
    "name": "SecondaryTradeReportRefID",
    "type": "STRING"
  },
  "882": {
    "name": "UnderlyingDirtyPrice",
    "type": "PRICE"
  },
  "883": {
    "name": "UnderlyingEndPrice",
    "type": "PRICE"
  },
  "884": {
    "name": "UnderlyingStartValue",
    "type": "AMT"
  },
  "885": {
    "name": "UnderlyingCurrentValue",
    "type": "AMT"
  },
  "886": {
    "name": "UnderlyingEndValue",
    "type": "AMT"
  },
  "887": {
    "name": "NoUnderlyingStips",
    "type": "NUMINGROUP"
  },
  "888": {
    "name": "UnderlyingStipType",
    "type": "STRING"
  },
  "889": {
    "name": "UnderlyingStipValue",
    "type": "STRING"
  },
  "890": {
    "name": "MaturityNetMoney",
    "type": "AMT"
  },
  "891": {
    "name": "MiscFeeBasis",
    "type": "INT",
    "values": {
      "0": "Absolute",
      "1": "Per Unit",
      "2": "Percentage"
    }
  },
  "892": {
    "name": "TotNoAllocs",
    "type": "INT"
  },
  "893": {
    "name": "LastFragment",
    "type": "BOOLEAN",
    "values": {
      "Y": "Yes",
      "N": "No"
    }
  },
  "894": {
    "name": "CollReqID",
    "type": "STRING"
  },
  "895": {
    "name": "CollAsgnReason",
    "type": "INT",
    "values": {
      "0": "Initial",
      "1": "Scheduled",
      "2": "Time Warning",
      "3": "Margin Deficiency",
      "4": "Margin Excess",
      "5": "Forward Collateral Demand",
      "6": "Event Of Default",
      "7": "Adverse Tax Event"
    }
  },
  "896": {
    "name": "CollInquiryQualifier",
    "type": "INT",
    "values": {
      "0": "Trade Date",
      "1": "Gc Instrument",
      "2": "Collateral Instrument",
      "3": "Substitution Eligible",
      "4": "Not Assigned",
      "5": "Partially Assigned",
      "6": "Fully Assigned",
      "7": "Outstanding Trades"
    }
  },
  "897": {
    "name": "NoTrades",
    "type": "NUMINGROUP"
  },
  "898": {
    "name": "MarginRatio",
    "type": "PERCENTAGE"
  },
  "899": {
    "name": "MarginExcess",
    "type": "AMT"
  },
  "900": {
    "name": "TotalNetValue",
    "type": "AMT"
  },
  "901": {
    "name": "CashOutstanding",
    "type": "AMT"
  },
  "902": {
    "name": "CollAsgnID",
    "type": "STRING"
  },
  "903": {
    "name": "CollAsgnTransType",
    "type": "INT",
    "values": {
      "0": "New",
      "1": "Replace",
      "2": "Cancel",
      "3": "Release",
      "4": "Reverse"
    }
  },
  "904": {
    "name": "CollRespID",
    "type": "STRING"
  },
  "905": {
    "name": "CollAsgnRespType",
    "type": "INT",
    "values": {
      "0": "Received",
      "1": "Accepted",
      "2": "Declined",
      "3": "Rejected"
    }
  },
  "906": {
    "name": "CollAsgnRejectReason",
    "type": "INT",
    "values": {
      "0": "Unknown Deal",
      "1": "Unknown Or Invalid Instrument",
      "2": "Unauthorized Transaction",
      "3": "Insufficient Collateral",
      "4": "Invalid Type Of Collateral",
      "5": "Excessive Substitution",
      "99": "Other"
    }
  },
  "907": {
    "name": "CollAsgnRefID",
    "type": "STRING"
  },
  "908": {
    "name": "CollRptID",
    "type": "STRING"
  },
  "909": {
    "name": "CollInquiryID",
    "type": "STRING"
  },
  "910": {
    "name": "CollStatus",
    "type": "INT",
    "values": {
      "0": "Unassigned",
      "1": "Partially Assigned",
      "2": "Assignment Proposed",
      "3": "Assigned",
      "4": "Challenged"
    }
  },
  "911": {
    "name": "TotNumReports",
    "type": "INT"
  },
  "912": {
    "name": "LastRptRequested",
    "type": "BOOLEAN"
  },
  "913": {
    "name": "AgreementDesc",
    "type": "STRING"
  },
  "914": {
    "name": "AgreementID",
    "type": "STRING"
  },
  "915": {
    "name": "AgreementDate",
    "type": "LOCALMKTDATE"
  },
  "916": {
    "name": "StartDate",
    "type": "LOCALMKTDATE"
  },
  "917": {
    "name": "EndDate",
    "type": "LOCALMKTDATE"
  },
  "918": {
    "name": "AgreementCurrency",
    "type": "CURRENCY"
  },
  "919": {
    "name": "DeliveryType",
    "type": "INT",
    "values": {
      "0": "Versus Payment",
      "1": "Free",
      "2": "Tri Party",
      "3": "Hold In Custody"
    }
  },
  "920": {
    "name": "EndAccruedInterestAmt",
    "type": "AMT"
  },
  "921": {
    "name": "StartCash",
    "type": "AMT"
  },
  "922": {
    "name": "EndCash",
    "type": "AMT"
  },
  "923": {
    "name": "UserRequestID",
    "type": "STRING"
  },
  "924": {
    "name": "UserRequestType",
    "type": "INT",
    "values": {
      "1": "Log On User",
      "2": "Log Off User",
      "3": "Change Password For User",
      "4": "Request Individual User Status"
    }
  },
  "925": {
    "name": "NewPassword",
    "type": "STRING"
  },
  "926": {
    "name": "UserStatus",
    "type": "INT",
    "values": {
      "1": "Logged In",
      "2": "Not Logged In",
      "3": "User Not Recognised",
      "4": "Password Incorrect",
      "5": "Password Changed",
      "6": "Other"
    }
  },
  "927": {
    "name": "UserStatusText",
    "type": "STRING"
  },
  "928": {
    "name": "StatusValue",
    "type": "INT",
    "values": {
      "1": "Connected",
      "2": "Not Connected Unexpected",
      "3": "Not Connected Expected",
      "4": "In Process"
    }
  },
  "929": {
    "name": "StatusText",
    "type": "STRING"
  },
  "930": {
    "name": "RefCompID",
    "type": "STRING"
  },
  "931": {
    "name": "RefSubID",
    "type": "STRING"
  },
  "932": {
    "name": "NetworkResponseID",
    "type": "STRING"
  },
  "933": {
    "name": "NetworkRequestID",
    "type": "STRING"
  },
  "934": {
    "name": "LastNetworkResponseID",
    "type": "STRING"
  },
  "935": {
    "name": "NetworkRequestType",
    "type": "INT",
    "values": {
      "1": "Snapshot",
      "2": "Subscribe",
      "4": "Stop Subscribing",
      "8": "Level Of Detail"
    }
  },
  "936": {
    "name": "NoCompIDs",
    "type": "NUMINGROUP"
  },
  "937": {
    "name": "NetworkStatusResponseType",
    "type": "INT",
    "values": {
      "1": "Full",
      "2": "Incremental Update"
    }
  },
  "938": {
    "name": "NoCollInquiryQualifier",
    "type": "NUMINGROUP"
  },
  "939": {
    "name": "TrdRptStatus",
    "type": "INT",
    "values": {
      "0": "Accepted",
      "1": "Rejected"
    }
  },
  "940": {
    "name": "AffirmStatus",
    "type": "INT",
    "values": {
      "1": "Received",
      "2": "Confirm Rejected",
      "3": "Affirmed"
    }
  },
  "941": {
    "name": "UnderlyingStrikeCurrency",
    "type": "CURRENCY"
  },
  "942": {
    "name": "LegStrikeCurrency",
    "type": "CURRENCY"
  },
  "943": {
    "name": "TimeBracket",
    "type": "STRING"
  },
  "944": {
    "name": "CollAction",
    "type": "INT",
    "values": {
      "0": "Retain",
      "1": "Add",
      "2": "Remove"
    }
  },
  "945": {
    "name": "CollInquiryStatus",
    "type": "INT",
    "values": {
      "0": "Accepted",
      "1": "Accepted With Warnings",
      "2": "Completed",
      "3": "Completed With Warnings",
      "4": "Rejected"
    }
  },
  "946": {
    "name": "CollInquiryResult",
    "type": "INT",
    "values": {
      "0": "Successful",
      "1": "Invalid Or Unknown Instrument",
      "2": "Invalid Or Unknown Collateral Type",
      "3": "Invalid Parties",
      "4": "Invalid Transport Type Requested",
      "5": "Invalid Destination Requested",
      "6": "No Collateral Found For The Trade Specified",
      "7": "No Collateral Found For The Order Specified",
      "8": "Collateral Inquiry Type Not Supported",
      "9": "Unauthorized For Collateral Inquiry",
      "99": "Other"
    }
  },
  "947": {
    "name": "StrikeCurrency",
    "type": "CURRENCY"
  },
  "948": {
    "name": "NoNested3PartyIDs",
    "type": "NUMINGROUP"
  },
  "949": {
    "name": "Nested3PartyID",
    "type": "STRING"
  },
  "950": {
    "name": "Nested3PartyIDSource",
    "type": "CHAR"
  },
  "951": {
    "name": "Nested3PartyRole",
    "type": "INT"
  },
  "952": {
    "name": "NoNested3PartySubIDs",
    "type": "NUMINGROUP"
  },
  "953": {
    "name": "Nested3PartySubID",
    "type": "STRING"
  },
  "954": {
    "name": "Nested3PartySubIDType",
    "type": "INT"
  },
  "955": {
    "name": "LegContractSettlMonth",
    "type": "MONTHYEAR"
  },
  "956": {
    "name": "LegInterestAccrualDate",
    "type": "LOCALMKTDATE"
  }
}

export const FIELDS_42: Record<number, FieldDef> = {
  "1": {
    "name": "Account",
    "type": "STRING"
  },
  "2": {
    "name": "AdvId",
    "type": "STRING"
  },
  "3": {
    "name": "AdvRefID",
    "type": "STRING"
  },
  "4": {
    "name": "AdvSide",
    "type": "CHAR",
    "values": {
      "B": "Buy",
      "S": "Sell",
      "T": "Trade",
      "X": "Cross"
    }
  },
  "5": {
    "name": "AdvTransType",
    "type": "STRING",
    "values": {
      "C": "Cancel",
      "N": "New",
      "R": "Replace"
    }
  },
  "6": {
    "name": "AvgPx",
    "type": "PRICE"
  },
  "7": {
    "name": "BeginSeqNo",
    "type": "INT"
  },
  "8": {
    "name": "BeginString",
    "type": "STRING"
  },
  "9": {
    "name": "BodyLength",
    "type": "INT"
  },
  "10": {
    "name": "CheckSum",
    "type": "STRING"
  },
  "11": {
    "name": "ClOrdID",
    "type": "STRING"
  },
  "12": {
    "name": "Commission",
    "type": "AMT"
  },
  "13": {
    "name": "CommType",
    "type": "CHAR",
    "values": {
      "1": "Per Unit",
      "2": "Percent",
      "3": "Absolute"
    }
  },
  "14": {
    "name": "CumQty",
    "type": "QTY"
  },
  "15": {
    "name": "Currency",
    "type": "CURRENCY"
  },
  "16": {
    "name": "EndSeqNo",
    "type": "INT"
  },
  "17": {
    "name": "ExecID",
    "type": "STRING"
  },
  "18": {
    "name": "ExecInst",
    "type": "MULTIPLEVALUESTRING",
    "values": {
      "0": "Stay On Offer Side",
      "1": "Not Held",
      "2": "Work",
      "3": "Go Along",
      "4": "Over The Day",
      "5": "Held",
      "6": "Participate Do Not Initiate",
      "7": "Strict Scale",
      "8": "Try To Scale",
      "9": "Stay On Bid Side",
      "A": "No Cross",
      "B": "Ok To Cross",
      "C": "Call First",
      "D": "Percent Of Volume",
      "E": "Do Not Increase",
      "F": "Do Not Reduce",
      "G": "All Or None",
      "I": "Institutions Only",
      "L": "Last Peg",
      "M": "Mid Price Peg",
      "N": "Non Negotiable",
      "O": "Opening Peg",
      "P": "Market Peg",
      "R": "Primary Peg",
      "S": "Suspend",
      "T": "Fixed Peg To Local Best Bid Or Offer At Time Of Order",
      "U": "Customer Display Instruction",
      "V": "Netting",
      "W": "Peg To Vwap"
    }
  },
  "19": {
    "name": "ExecRefID",
    "type": "STRING"
  },
  "20": {
    "name": "ExecTransType",
    "type": "CHAR",
    "values": {
      "0": "New",
      "1": "Cancel",
      "2": "Correct",
      "3": "Status"
    }
  },
  "21": {
    "name": "HandlInst",
    "type": "CHAR",
    "values": {
      "1": "Automated Execution No Intervention",
      "2": "Automated Execution Intervention Ok",
      "3": "Manual Order"
    }
  },
  "22": {
    "name": "IDSource",
    "type": "STRING",
    "values": {
      "1": "Cusip",
      "2": "Sedol",
      "3": "Quik",
      "4": "Isin Number",
      "5": "Ric Code",
      "6": "Iso Currency Code",
      "7": "Iso Country Code",
      "8": "Exchange Symbol",
      "9": "Consolidated Tape Association"
    }
  },
  "23": {
    "name": "IOIid",
    "type": "STRING"
  },
  "24": {
    "name": "IOIOthSvc",
    "type": "CHAR"
  },
  "25": {
    "name": "IOIQltyInd",
    "type": "CHAR",
    "values": {
      "H": "High",
      "L": "Low",
      "M": "Medium"
    }
  },
  "26": {
    "name": "IOIRefID",
    "type": "STRING"
  },
  "27": {
    "name": "IOIShares",
    "type": "STRING",
    "values": {
      "L": "Large",
      "M": "Medium",
      "S": "Small"
    }
  },
  "28": {
    "name": "IOITransType",
    "type": "CHAR",
    "values": {
      "C": "Cancel",
      "N": "New",
      "R": "Replace"
    }
  },
  "29": {
    "name": "LastCapacity",
    "type": "CHAR",
    "values": {
      "1": "Agent",
      "2": "Cross As Agent",
      "3": "Cross As Principal",
      "4": "Principal"
    }
  },
  "30": {
    "name": "LastMkt",
    "type": "EXCHANGE"
  },
  "31": {
    "name": "LastPx",
    "type": "PRICE"
  },
  "32": {
    "name": "LastShares",
    "type": "QTY"
  },
  "33": {
    "name": "LinesOfText",
    "type": "INT"
  },
  "34": {
    "name": "MsgSeqNum",
    "type": "INT"
  },
  "35": {
    "name": "MsgType",
    "type": "STRING",
    "values": {
      "0": "Heartbeat",
      "1": "Test Request",
      "2": "Resend Request",
      "3": "Reject",
      "4": "Sequence Reset",
      "5": "Logout",
      "6": "Ioi",
      "7": "Advertisement",
      "8": "Execution Report",
      "9": "Order Cancel Reject",
      "A": "Logon",
      "B": "News",
      "C": "Email",
      "D": "New Order Single",
      "E": "New Order List",
      "F": "Order Cancel Request",
      "G": "Order Cancel Replace Request",
      "H": "Order Status Request",
      "J": "Allocation Instruction",
      "K": "List Cancel Request",
      "L": "List Execute",
      "M": "List Status Request",
      "N": "List Status",
      "P": "Allocation Instruction Ack",
      "Q": "Dont Know Trade",
      "R": "Quote Request",
      "S": "Quote",
      "T": "Settlement Instructions",
      "V": "Market Data Request",
      "W": "Market Data Snapshot Full Refresh",
      "X": "Market Data Incremental Refresh",
      "Y": "Market Data Request Reject",
      "Z": "Quote Cancel",
      "a": "Quote Status Request",
      "b": "Mass Quote Acknowledgement",
      "c": "Security Definition Request",
      "d": "Security Definition",
      "e": "Security Status Request",
      "f": "Security Status",
      "g": "Trading Session Status Request",
      "h": "Trading Session Status",
      "i": "Mass Quote",
      "j": "Business Message Reject",
      "k": "Bid Request",
      "l": "Bid Response",
      "m": "List Strike Price"
    }
  },
  "36": {
    "name": "NewSeqNo",
    "type": "INT"
  },
  "37": {
    "name": "OrderID",
    "type": "STRING"
  },
  "38": {
    "name": "OrderQty",
    "type": "QTY"
  },
  "39": {
    "name": "OrdStatus",
    "type": "CHAR",
    "values": {
      "0": "New",
      "1": "Partially Filled",
      "2": "Filled",
      "3": "Done For Day",
      "4": "Canceled",
      "5": "Replaced",
      "6": "Pending Cancel",
      "7": "Stopped",
      "8": "Rejected",
      "9": "Suspended",
      "A": "Pending New",
      "B": "Calculated",
      "C": "Expired",
      "D": "Accepted For Bidding",
      "E": "Pending Replace"
    }
  },
  "40": {
    "name": "OrdType",
    "type": "CHAR",
    "values": {
      "1": "Market",
      "2": "Limit",
      "3": "Stop",
      "4": "Stop Limit",
      "5": "Market On Close",
      "6": "With Or Without",
      "7": "Limit Or Better",
      "8": "Limit With Or Without",
      "9": "On Basis",
      "A": "On Close",
      "B": "Limit On Close",
      "C": "Forex Market",
      "D": "Previously Quoted",
      "E": "Previously Indicated",
      "F": "Forex Limit",
      "G": "Forex Swap",
      "H": "Forex Previously Quoted",
      "I": "Funari",
      "P": "Pegged"
    }
  },
  "41": {
    "name": "OrigClOrdID",
    "type": "STRING"
  },
  "42": {
    "name": "OrigTime",
    "type": "UTCTIMESTAMP"
  },
  "43": {
    "name": "PossDupFlag",
    "type": "BOOLEAN",
    "values": {
      "N": "No",
      "Y": "Yes"
    }
  },
  "44": {
    "name": "Price",
    "type": "PRICE"
  },
  "45": {
    "name": "RefSeqNum",
    "type": "INT"
  },
  "46": {
    "name": "RelatdSym",
    "type": "STRING"
  },
  "47": {
    "name": "Rule80A",
    "type": "CHAR",
    "values": {
      "A": "Agency Single Order",
      "B": "Short Exempt Transaction A Type",
      "C": "Proprietary Non Algo",
      "D": "Program Order Member",
      "E": "Short Exempt Transaction For Principal",
      "F": "Short Exempt Transaction W Type",
      "H": "Short Exempt Transaction I Type",
      "I": "Individual Investor",
      "J": "Proprietary Algo",
      "K": "Agency Algo",
      "L": "Short Exempt Transaction Member Affliated",
      "M": "Program Order Other Member",
      "N": "Agent For Other Member",
      "O": "Proprietary Transaction Affiliated",
      "P": "Principal",
      "R": "Transaction Non Member",
      "S": "Specialist Trades",
      "T": "Transaction Unaffiliated Member",
      "U": "Agency Index Arb",
      "W": "All Other Orders As Agent For Other Member",
      "X": "Short Exempt Transaction Member Not Affliated",
      "Y": "Agency Non Algo",
      "Z": "Short Exempt Transaction Non Member"
    }
  },
  "48": {
    "name": "SecurityID",
    "type": "STRING"
  },
  "49": {
    "name": "SenderCompID",
    "type": "STRING"
  },
  "50": {
    "name": "SenderSubID",
    "type": "STRING"
  },
  "51": {
    "name": "SendingDate",
    "type": "LOCALMKTDATE"
  },
  "52": {
    "name": "SendingTime",
    "type": "UTCTIMESTAMP"
  },
  "53": {
    "name": "Shares",
    "type": "QTY"
  },
  "54": {
    "name": "Side",
    "type": "CHAR",
    "values": {
      "1": "Buy",
      "2": "Sell",
      "3": "Buy Minus",
      "4": "Sell Plus",
      "5": "Sell Short",
      "6": "Sell Short Exempt",
      "7": "Undisclosed",
      "8": "Cross",
      "9": "Cross Short"
    }
  },
  "55": {
    "name": "Symbol",
    "type": "STRING"
  },
  "56": {
    "name": "TargetCompID",
    "type": "STRING"
  },
  "57": {
    "name": "TargetSubID",
    "type": "STRING"
  },
  "58": {
    "name": "Text",
    "type": "STRING"
  },
  "59": {
    "name": "TimeInForce",
    "type": "CHAR",
    "values": {
      "0": "Day",
      "1": "Good Till Cancel",
      "2": "At The Opening",
      "3": "Immediate Or Cancel",
      "4": "Fill Or Kill",
      "5": "Good Till Crossing",
      "6": "Good Till Date"
    }
  },
  "60": {
    "name": "TransactTime",
    "type": "UTCTIMESTAMP"
  },
  "61": {
    "name": "Urgency",
    "type": "CHAR",
    "values": {
      "0": "Normal",
      "1": "Flash",
      "2": "Background"
    }
  },
  "62": {
    "name": "ValidUntilTime",
    "type": "UTCTIMESTAMP"
  },
  "63": {
    "name": "SettlmntTyp",
    "type": "CHAR",
    "values": {
      "0": "Regular",
      "1": "Cash",
      "2": "Next Day",
      "3": "T Plus2",
      "4": "T Plus3",
      "5": "T Plus4",
      "6": "Future",
      "7": "When And If Issued",
      "8": "Sellers Option",
      "9": "T Plus5"
    }
  },
  "64": {
    "name": "FutSettDate",
    "type": "LOCALMKTDATE"
  },
  "65": {
    "name": "SymbolSfx",
    "type": "STRING"
  },
  "66": {
    "name": "ListID",
    "type": "STRING"
  },
  "67": {
    "name": "ListSeqNo",
    "type": "INT"
  },
  "68": {
    "name": "TotNoOrders",
    "type": "INT"
  },
  "69": {
    "name": "ListExecInst",
    "type": "STRING"
  },
  "70": {
    "name": "AllocID",
    "type": "STRING"
  },
  "71": {
    "name": "AllocTransType",
    "type": "CHAR",
    "values": {
      "0": "New",
      "1": "Replace",
      "2": "Cancel",
      "3": "Preliminary",
      "4": "Calculated",
      "5": "Calculated Without Preliminary"
    }
  },
  "72": {
    "name": "RefAllocID",
    "type": "STRING"
  },
  "73": {
    "name": "NoOrders",
    "type": "INT"
  },
  "74": {
    "name": "AvgPrxPrecision",
    "type": "INT"
  },
  "75": {
    "name": "TradeDate",
    "type": "LOCALMKTDATE"
  },
  "76": {
    "name": "ExecBroker",
    "type": "STRING"
  },
  "77": {
    "name": "OpenClose",
    "type": "CHAR",
    "values": {
      "C": "Close",
      "O": "Open"
    }
  },
  "78": {
    "name": "NoAllocs",
    "type": "INT"
  },
  "79": {
    "name": "AllocAccount",
    "type": "STRING"
  },
  "80": {
    "name": "AllocShares",
    "type": "QTY"
  },
  "81": {
    "name": "ProcessCode",
    "type": "CHAR",
    "values": {
      "0": "Regular",
      "1": "Soft Dollar",
      "2": "Step In",
      "3": "Step Out",
      "4": "Soft Dollar Step In",
      "5": "Soft Dollar Step Out",
      "6": "Plan Sponsor"
    }
  },
  "82": {
    "name": "NoRpts",
    "type": "INT"
  },
  "83": {
    "name": "RptSeq",
    "type": "INT"
  },
  "84": {
    "name": "CxlQty",
    "type": "QTY"
  },
  "85": {
    "name": "NoDlvyInst",
    "type": "INT"
  },
  "86": {
    "name": "DlvyInst",
    "type": "STRING"
  },
  "87": {
    "name": "AllocStatus",
    "type": "INT",
    "values": {
      "0": "Accepted",
      "1": "Block Level Reject",
      "2": "Account Level Reject",
      "3": "Received"
    }
  },
  "88": {
    "name": "AllocRejCode",
    "type": "INT",
    "values": {
      "0": "Unknown Account",
      "1": "Incorrect Quantity",
      "2": "Incorrect Averageg Price",
      "3": "Unknown Executing Broker Mnemonic",
      "4": "Commission Difference",
      "5": "Unknown Order Id",
      "6": "Unknown List Id",
      "7": "Other See Text"
    }
  },
  "89": {
    "name": "Signature",
    "type": "DATA"
  },
  "90": {
    "name": "SecureDataLen",
    "type": "LENGTH"
  },
  "91": {
    "name": "SecureData",
    "type": "DATA"
  },
  "92": {
    "name": "BrokerOfCredit",
    "type": "STRING"
  },
  "93": {
    "name": "SignatureLength",
    "type": "LENGTH"
  },
  "94": {
    "name": "EmailType",
    "type": "CHAR",
    "values": {
      "0": "New",
      "1": "Reply",
      "2": "Admin Reply"
    }
  },
  "95": {
    "name": "RawDataLength",
    "type": "LENGTH"
  },
  "96": {
    "name": "RawData",
    "type": "DATA"
  },
  "97": {
    "name": "PossResend",
    "type": "BOOLEAN",
    "values": {
      "N": "No",
      "Y": "Yes"
    }
  },
  "98": {
    "name": "EncryptMethod",
    "type": "INT",
    "values": {
      "0": "None",
      "1": "Pkcs",
      "2": "Des",
      "3": "Pkcsdes",
      "4": "Pgpdes",
      "5": "Pgpdesmd5",
      "6": "Pem"
    }
  },
  "99": {
    "name": "StopPx",
    "type": "PRICE"
  },
  "100": {
    "name": "ExDestination",
    "type": "EXCHANGE"
  },
  "102": {
    "name": "CxlRejReason",
    "type": "INT",
    "values": {
      "0": "Too Late To Cancel",
      "1": "Unknown Order",
      "2": "Broker Credit",
      "3": "Order Already In Pending Status"
    }
  },
  "103": {
    "name": "OrdRejReason",
    "type": "INT",
    "values": {
      "0": "Broker Credit",
      "1": "Unknown Symbol",
      "2": "Exchange Closed",
      "3": "Order Exceeds Limit",
      "4": "Too Late To Enter",
      "5": "Unknown Order",
      "6": "Duplicate Order",
      "7": "Duplicate Of A Verbally Communicated Order",
      "8": "Stale Order"
    }
  },
  "104": {
    "name": "IOIQualifier",
    "type": "CHAR",
    "values": {
      "A": "All Or None",
      "C": "At The Close",
      "I": "In Touch With",
      "L": "Limit",
      "M": "More Behind",
      "O": "At The Open",
      "P": "Taking A Position",
      "Q": "At The Market",
      "R": "Ready To Trade",
      "S": "Portfolio Shown",
      "T": "Through The Day",
      "V": "Versus",
      "W": "Indication",
      "X": "Crossing Opportunity",
      "Y": "At The Midpoint",
      "Z": "Pre Open"
    }
  },
  "105": {
    "name": "WaveNo",
    "type": "STRING"
  },
  "106": {
    "name": "Issuer",
    "type": "STRING"
  },
  "107": {
    "name": "SecurityDesc",
    "type": "STRING"
  },
  "108": {
    "name": "HeartBtInt",
    "type": "INT"
  },
  "109": {
    "name": "ClientID",
    "type": "STRING"
  },
  "110": {
    "name": "MinQty",
    "type": "QTY"
  },
  "111": {
    "name": "MaxFloor",
    "type": "QTY"
  },
  "112": {
    "name": "TestReqID",
    "type": "STRING"
  },
  "113": {
    "name": "ReportToExch",
    "type": "BOOLEAN",
    "values": {
      "N": "No",
      "Y": "Yes"
    }
  },
  "114": {
    "name": "LocateReqd",
    "type": "BOOLEAN",
    "values": {
      "N": "No",
      "Y": "Yes"
    }
  },
  "115": {
    "name": "OnBehalfOfCompID",
    "type": "STRING"
  },
  "116": {
    "name": "OnBehalfOfSubID",
    "type": "STRING"
  },
  "117": {
    "name": "QuoteID",
    "type": "STRING"
  },
  "118": {
    "name": "NetMoney",
    "type": "AMT"
  },
  "119": {
    "name": "SettlCurrAmt",
    "type": "AMT"
  },
  "120": {
    "name": "SettlCurrency",
    "type": "CURRENCY"
  },
  "121": {
    "name": "ForexReq",
    "type": "BOOLEAN",
    "values": {
      "N": "No",
      "Y": "Yes"
    }
  },
  "122": {
    "name": "OrigSendingTime",
    "type": "UTCTIMESTAMP"
  },
  "123": {
    "name": "GapFillFlag",
    "type": "BOOLEAN",
    "values": {
      "N": "No",
      "Y": "Yes"
    }
  },
  "124": {
    "name": "NoExecs",
    "type": "INT"
  },
  "125": {
    "name": "CxlType",
    "type": "CHAR"
  },
  "126": {
    "name": "ExpireTime",
    "type": "UTCTIMESTAMP"
  },
  "127": {
    "name": "DKReason",
    "type": "CHAR",
    "values": {
      "A": "Unknown Symbol",
      "B": "Wrong Side",
      "C": "Quantity Exceeds Order",
      "D": "No Matching Order",
      "E": "Price Exceeds Limit",
      "Z": "Other"
    }
  },
  "128": {
    "name": "DeliverToCompID",
    "type": "STRING"
  },
  "129": {
    "name": "DeliverToSubID",
    "type": "STRING"
  },
  "130": {
    "name": "IOINaturalFlag",
    "type": "BOOLEAN",
    "values": {
      "N": "No",
      "Y": "Yes"
    }
  },
  "131": {
    "name": "QuoteReqID",
    "type": "STRING"
  },
  "132": {
    "name": "BidPx",
    "type": "PRICE"
  },
  "133": {
    "name": "OfferPx",
    "type": "PRICE"
  },
  "134": {
    "name": "BidSize",
    "type": "QTY"
  },
  "135": {
    "name": "OfferSize",
    "type": "QTY"
  },
  "136": {
    "name": "NoMiscFees",
    "type": "INT"
  },
  "137": {
    "name": "MiscFeeAmt",
    "type": "AMT"
  },
  "138": {
    "name": "MiscFeeCurr",
    "type": "CURRENCY"
  },
  "139": {
    "name": "MiscFeeType",
    "type": "CHAR",
    "values": {
      "1": "Regulatory",
      "2": "Tax",
      "3": "Local Commission",
      "4": "Exchange Fees",
      "5": "Stamp",
      "6": "Levy",
      "7": "Other",
      "8": "Markup",
      "9": "Consumption Tax"
    }
  },
  "140": {
    "name": "PrevClosePx",
    "type": "PRICE"
  },
  "141": {
    "name": "ResetSeqNumFlag",
    "type": "BOOLEAN",
    "values": {
      "N": "No",
      "Y": "Yes"
    }
  },
  "142": {
    "name": "SenderLocationID",
    "type": "STRING"
  },
  "143": {
    "name": "TargetLocationID",
    "type": "STRING"
  },
  "144": {
    "name": "OnBehalfOfLocationID",
    "type": "STRING"
  },
  "145": {
    "name": "DeliverToLocationID",
    "type": "STRING"
  },
  "146": {
    "name": "NoRelatedSym",
    "type": "INT"
  },
  "147": {
    "name": "Subject",
    "type": "STRING"
  },
  "148": {
    "name": "Headline",
    "type": "STRING"
  },
  "149": {
    "name": "URLLink",
    "type": "STRING"
  },
  "150": {
    "name": "ExecType",
    "type": "CHAR",
    "values": {
      "0": "New",
      "1": "Partial Fill",
      "2": "Fill",
      "3": "Done For Day",
      "4": "Canceled",
      "5": "Replaced",
      "6": "Pending Cancel",
      "7": "Stopped",
      "8": "Rejected",
      "9": "Suspended",
      "A": "Pending New",
      "B": "Calculated",
      "C": "Expired",
      "D": "Restated",
      "E": "Pending Replace"
    }
  },
  "151": {
    "name": "LeavesQty",
    "type": "QTY"
  },
  "152": {
    "name": "CashOrderQty",
    "type": "QTY"
  },
  "153": {
    "name": "AllocAvgPx",
    "type": "PRICE"
  },
  "154": {
    "name": "AllocNetMoney",
    "type": "AMT"
  },
  "155": {
    "name": "SettlCurrFxRate",
    "type": "FLOAT"
  },
  "156": {
    "name": "SettlCurrFxRateCalc",
    "type": "CHAR"
  },
  "157": {
    "name": "NumDaysInterest",
    "type": "INT"
  },
  "158": {
    "name": "AccruedInterestRate",
    "type": "FLOAT"
  },
  "159": {
    "name": "AccruedInterestAmt",
    "type": "AMT"
  },
  "160": {
    "name": "SettlInstMode",
    "type": "CHAR",
    "values": {
      "0": "Default",
      "1": "Standing Instructions Provided",
      "2": "Specific Allocation Account Overriding",
      "3": "Specific Allocation Account Standing"
    }
  },
  "161": {
    "name": "AllocText",
    "type": "STRING"
  },
  "162": {
    "name": "SettlInstID",
    "type": "STRING"
  },
  "163": {
    "name": "SettlInstTransType",
    "type": "CHAR",
    "values": {
      "C": "Cancel",
      "N": "New",
      "R": "Replace"
    }
  },
  "164": {
    "name": "EmailThreadID",
    "type": "STRING"
  },
  "165": {
    "name": "SettlInstSource",
    "type": "CHAR",
    "values": {
      "1": "Broker Credit",
      "2": "Institution"
    }
  },
  "166": {
    "name": "SettlLocation",
    "type": "STRING",
    "values": {
      "CED": "Cedel",
      "DTC": "Depository Trust Company",
      "EUR": "Euro Clear",
      "FED": "Federal Book Entry",
      "ISO Country Code": "Local Market Settle Location",
      "PNY": "Physical",
      "PTC": "Participant Trust Company"
    }
  },
  "167": {
    "name": "SecurityType",
    "type": "STRING",
    "values": {
      "?": "Wildcard",
      "BA": "Bankers Acceptance",
      "CB": "Convertible Bond",
      "CD": "Certificate Of Deposit",
      "CMO": "Collateralized Mortgage Obligation",
      "CORP": "Corporate Bond",
      "CP": "Commercial Paper",
      "CPP": "Corporate Private Placement",
      "CS": "Common Stock",
      "FHA": "Federal Housing Authority",
      "FHL": "Federal Home Loan",
      "FN": "Federal National Mortgage Association",
      "FOR": "Foreign Exchange Contract",
      "FUT": "Future",
      "GN": "Government National Mortgage Association",
      "GOVT": "Treasuries Agency Debenture",
      "IET": "Ioette Mortgage",
      "MF": "Mutual Fund",
      "MIO": "Mortgage Interest Only",
      "MPO": "Mortgage Principal Only",
      "MPP": "Mortgage Private Placement",
      "MPT": "Miscellaneous Pass Through",
      "MUNI": "Municipal Bond",
      "NONE": "No Security Type",
      "OPT": "Option",
      "PS": "Preferred Stock",
      "RP": "Repurchase Agreement",
      "RVRP": "Reverse Repurchase Agreement",
      "SL": "Student Loan Marketing Association",
      "TD": "Time Deposit",
      "USTB": "Us Treasury Bill Old",
      "WAR": "Warrant",
      "ZOO": "Cats Tigers And Lions"
    }
  },
  "168": {
    "name": "EffectiveTime",
    "type": "UTCTIMESTAMP"
  },
  "169": {
    "name": "StandInstDbType",
    "type": "INT",
    "values": {
      "0": "Other",
      "1": "Dtcsid",
      "2": "Thomson Alert",
      "3": "A Global Custodian"
    }
  },
  "170": {
    "name": "StandInstDbName",
    "type": "STRING"
  },
  "171": {
    "name": "StandInstDbID",
    "type": "STRING"
  },
  "172": {
    "name": "SettlDeliveryType",
    "type": "INT"
  },
  "173": {
    "name": "SettlDepositoryCode",
    "type": "STRING"
  },
  "174": {
    "name": "SettlBrkrCode",
    "type": "STRING"
  },
  "175": {
    "name": "SettlInstCode",
    "type": "STRING"
  },
  "176": {
    "name": "SecuritySettlAgentName",
    "type": "STRING"
  },
  "177": {
    "name": "SecuritySettlAgentCode",
    "type": "STRING"
  },
  "178": {
    "name": "SecuritySettlAgentAcctNum",
    "type": "STRING"
  },
  "179": {
    "name": "SecuritySettlAgentAcctName",
    "type": "STRING"
  },
  "180": {
    "name": "SecuritySettlAgentContactName",
    "type": "STRING"
  },
  "181": {
    "name": "SecuritySettlAgentContactPhone",
    "type": "STRING"
  },
  "182": {
    "name": "CashSettlAgentName",
    "type": "STRING"
  },
  "183": {
    "name": "CashSettlAgentCode",
    "type": "STRING"
  },
  "184": {
    "name": "CashSettlAgentAcctNum",
    "type": "STRING"
  },
  "185": {
    "name": "CashSettlAgentAcctName",
    "type": "STRING"
  },
  "186": {
    "name": "CashSettlAgentContactName",
    "type": "STRING"
  },
  "187": {
    "name": "CashSettlAgentContactPhone",
    "type": "STRING"
  },
  "188": {
    "name": "BidSpotRate",
    "type": "PRICE"
  },
  "189": {
    "name": "BidForwardPoints",
    "type": "PRICEOFFSET"
  },
  "190": {
    "name": "OfferSpotRate",
    "type": "PRICE"
  },
  "191": {
    "name": "OfferForwardPoints",
    "type": "PRICEOFFSET"
  },
  "192": {
    "name": "OrderQty2",
    "type": "QTY"
  },
  "193": {
    "name": "FutSettDate2",
    "type": "LOCALMKTDATE"
  },
  "194": {
    "name": "LastSpotRate",
    "type": "PRICE"
  },
  "195": {
    "name": "LastForwardPoints",
    "type": "PRICEOFFSET"
  },
  "196": {
    "name": "AllocLinkID",
    "type": "STRING"
  },
  "197": {
    "name": "AllocLinkType",
    "type": "INT",
    "values": {
      "0": "Fx Netting",
      "1": "Fx Swap"
    }
  },
  "198": {
    "name": "SecondaryOrderID",
    "type": "STRING"
  },
  "199": {
    "name": "NoIOIQualifiers",
    "type": "INT"
  },
  "200": {
    "name": "MaturityMonthYear",
    "type": "MONTHYEAR"
  },
  "201": {
    "name": "PutOrCall",
    "type": "INT",
    "values": {
      "0": "Put",
      "1": "Call"
    }
  },
  "202": {
    "name": "StrikePrice",
    "type": "PRICE"
  },
  "203": {
    "name": "CoveredOrUncovered",
    "type": "INT",
    "values": {
      "0": "Covered",
      "1": "Uncovered"
    }
  },
  "204": {
    "name": "CustomerOrFirm",
    "type": "INT",
    "values": {
      "0": "Customer",
      "1": "Firm"
    }
  },
  "205": {
    "name": "MaturityDay",
    "type": "DAYOFMONTH"
  },
  "206": {
    "name": "OptAttribute",
    "type": "CHAR"
  },
  "207": {
    "name": "SecurityExchange",
    "type": "EXCHANGE"
  },
  "208": {
    "name": "NotifyBrokerOfCredit",
    "type": "BOOLEAN",
    "values": {
      "N": "No",
      "Y": "Yes"
    }
  },
  "209": {
    "name": "AllocHandlInst",
    "type": "INT",
    "values": {
      "1": "Match",
      "2": "Forward",
      "3": "Forward And Match"
    }
  },
  "210": {
    "name": "MaxShow",
    "type": "QTY"
  },
  "211": {
    "name": "PegDifference",
    "type": "PRICEOFFSET"
  },
  "212": {
    "name": "XmlDataLen",
    "type": "LENGTH"
  },
  "213": {
    "name": "XmlData",
    "type": "DATA"
  },
  "214": {
    "name": "SettlInstRefID",
    "type": "STRING"
  },
  "215": {
    "name": "NoRoutingIDs",
    "type": "INT"
  },
  "216": {
    "name": "RoutingType",
    "type": "INT",
    "values": {
      "1": "Target Firm",
      "2": "Target List",
      "3": "Block Firm",
      "4": "Block List"
    }
  },
  "217": {
    "name": "RoutingID",
    "type": "STRING"
  },
  "218": {
    "name": "SpreadToBenchmark",
    "type": "PRICEOFFSET"
  },
  "219": {
    "name": "Benchmark",
    "type": "CHAR",
    "values": {
      "1": "Curve",
      "2": "Five Yr",
      "3": "Old5",
      "4": "Ten Yr",
      "5": "Old10",
      "6": "Thirty Yr",
      "7": "Old30",
      "8": "Three Molibor",
      "9": "Six Molibor"
    }
  },
  "223": {
    "name": "CouponRate",
    "type": "FLOAT"
  },
  "231": {
    "name": "ContractMultiplier",
    "type": "FLOAT"
  },
  "262": {
    "name": "MDReqID",
    "type": "STRING"
  },
  "263": {
    "name": "SubscriptionRequestType",
    "type": "CHAR",
    "values": {
      "0": "Snapshot",
      "1": "Snapshot And Updates",
      "2": "Disable Previous Snapshot"
    }
  },
  "264": {
    "name": "MarketDepth",
    "type": "INT"
  },
  "265": {
    "name": "MDUpdateType",
    "type": "INT",
    "values": {
      "0": "Full Refresh",
      "1": "Incremental Refresh"
    }
  },
  "266": {
    "name": "AggregatedBook",
    "type": "BOOLEAN",
    "values": {
      "N": "No",
      "Y": "Yes"
    }
  },
  "267": {
    "name": "NoMDEntryTypes",
    "type": "INT"
  },
  "268": {
    "name": "NoMDEntries",
    "type": "INT"
  },
  "269": {
    "name": "MDEntryType",
    "type": "CHAR",
    "values": {
      "0": "Bid",
      "1": "Offer",
      "2": "Trade",
      "3": "Index Value",
      "4": "Opening Price",
      "5": "Closing Price",
      "6": "Settlement Price",
      "7": "Trading Session High Price",
      "8": "Trading Session Low Price",
      "9": "Trading Session Vwap Price"
    }
  },
  "270": {
    "name": "MDEntryPx",
    "type": "PRICE"
  },
  "271": {
    "name": "MDEntrySize",
    "type": "QTY"
  },
  "272": {
    "name": "MDEntryDate",
    "type": "UTCDATE"
  },
  "273": {
    "name": "MDEntryTime",
    "type": "UTCTIMEONLY"
  },
  "274": {
    "name": "TickDirection",
    "type": "CHAR",
    "values": {
      "0": "Plus Tick",
      "1": "Zero Plus Tick",
      "2": "Minus Tick",
      "3": "Zero Minus Tick"
    }
  },
  "275": {
    "name": "MDMkt",
    "type": "EXCHANGE"
  },
  "276": {
    "name": "QuoteCondition",
    "type": "MULTIPLEVALUESTRING",
    "values": {
      "A": "Open",
      "B": "Closed",
      "C": "Exchange Best",
      "D": "Consolidated Best",
      "E": "Locked",
      "F": "Crossed",
      "G": "Depth",
      "H": "Fast Trading",
      "I": "Non Firm"
    }
  },
  "277": {
    "name": "TradeCondition",
    "type": "MULTIPLEVALUESTRING",
    "values": {
      "A": "Cash",
      "B": "Average Price Trade",
      "C": "Cash Trade",
      "D": "Next Day",
      "E": "Opening",
      "F": "Intraday Trade Detail",
      "G": "Rule127 Trade",
      "H": "Rule155 Trade",
      "I": "Sold Last",
      "J": "Next Day Trade",
      "K": "Opened",
      "L": "Seller",
      "M": "Sold",
      "N": "Stopped Stock"
    }
  },
  "278": {
    "name": "MDEntryID",
    "type": "STRING"
  },
  "279": {
    "name": "MDUpdateAction",
    "type": "CHAR",
    "values": {
      "0": "New",
      "1": "Change",
      "2": "Delete"
    }
  },
  "280": {
    "name": "MDEntryRefID",
    "type": "STRING"
  },
  "281": {
    "name": "MDReqRejReason",
    "type": "CHAR",
    "values": {
      "0": "Unknown Symbol",
      "1": "Duplicate Md Req Id",
      "2": "Insufficient Bandwidth",
      "3": "Insufficient Permissions",
      "4": "Unsupported Subscription Request Type",
      "5": "Unsupported Market Depth",
      "6": "Unsupported Md Update Type",
      "7": "Unsupported Aggregated Book",
      "8": "Unsupported Md Entry Type"
    }
  },
  "282": {
    "name": "MDEntryOriginator",
    "type": "STRING"
  },
  "283": {
    "name": "LocationID",
    "type": "STRING"
  },
  "284": {
    "name": "DeskID",
    "type": "STRING"
  },
  "285": {
    "name": "DeleteReason",
    "type": "CHAR",
    "values": {
      "0": "Cancellation",
      "1": "Error"
    }
  },
  "286": {
    "name": "OpenCloseSettleFlag",
    "type": "CHAR",
    "values": {
      "0": "Daily Open",
      "1": "Session Open",
      "2": "Delivery Settlement Entry"
    }
  },
  "287": {
    "name": "SellerDays",
    "type": "INT"
  },
  "288": {
    "name": "MDEntryBuyer",
    "type": "STRING"
  },
  "289": {
    "name": "MDEntrySeller",
    "type": "STRING"
  },
  "290": {
    "name": "MDEntryPositionNo",
    "type": "INT"
  },
  "291": {
    "name": "FinancialStatus",
    "type": "CHAR",
    "values": {
      "1": "Bankrupt"
    }
  },
  "292": {
    "name": "CorporateAction",
    "type": "CHAR",
    "values": {
      "A": "Ex Dividend",
      "B": "Ex Distribution",
      "C": "Ex Rights",
      "D": "New",
      "E": "Ex Interest"
    }
  },
  "293": {
    "name": "DefBidSize",
    "type": "QTY"
  },
  "294": {
    "name": "DefOfferSize",
    "type": "QTY"
  },
  "295": {
    "name": "NoQuoteEntries",
    "type": "INT"
  },
  "296": {
    "name": "NoQuoteSets",
    "type": "INT"
  },
  "297": {
    "name": "QuoteStatus",
    "type": "INT",
    "values": {
      "0": "Accepted",
      "1": "Cancel For Symbol",
      "2": "Canceled For Security Type",
      "3": "Canceled For Underlying",
      "4": "Canceled All",
      "5": "Rejected"
    }
  },
  "298": {
    "name": "QuoteCancelType",
    "type": "INT",
    "values": {
      "1": "Cancel For One Or More Securities",
      "2": "Cancel For Security Type",
      "3": "Cancel For Underlying Security",
      "4": "Cancel All Quotes"
    }
  },
  "299": {
    "name": "QuoteEntryID",
    "type": "STRING"
  },
  "300": {
    "name": "QuoteRejectReason",
    "type": "INT",
    "values": {
      "1": "Unknown Symbol",
      "2": "Exchange",
      "3": "Quote Request Exceeds Limit",
      "4": "Too Late To Enter",
      "5": "Unknown Quote",
      "6": "Duplicate Quote",
      "7": "Invalid Bid",
      "8": "Invalid Price",
      "9": "Not Authorized To Quote Security"
    }
  },
  "301": {
    "name": "QuoteResponseLevel",
    "type": "INT",
    "values": {
      "0": "No Acknowledgement",
      "1": "Acknowledge Only Negative Or Erroneous Quotes",
      "2": "Acknowledge Each Quote Message"
    }
  },
  "302": {
    "name": "QuoteSetID",
    "type": "STRING"
  },
  "303": {
    "name": "QuoteRequestType",
    "type": "INT",
    "values": {
      "1": "Manual",
      "2": "Automatic"
    }
  },
  "304": {
    "name": "TotQuoteEntries",
    "type": "INT"
  },
  "305": {
    "name": "UnderlyingIDSource",
    "type": "STRING"
  },
  "306": {
    "name": "UnderlyingIssuer",
    "type": "STRING"
  },
  "307": {
    "name": "UnderlyingSecurityDesc",
    "type": "STRING"
  },
  "308": {
    "name": "UnderlyingSecurityExchange",
    "type": "EXCHANGE"
  },
  "309": {
    "name": "UnderlyingSecurityID",
    "type": "STRING"
  },
  "310": {
    "name": "UnderlyingSecurityType",
    "type": "STRING"
  },
  "311": {
    "name": "UnderlyingSymbol",
    "type": "STRING"
  },
  "312": {
    "name": "UnderlyingSymbolSfx",
    "type": "STRING"
  },
  "313": {
    "name": "UnderlyingMaturityMonthYear",
    "type": "MONTHYEAR"
  },
  "314": {
    "name": "UnderlyingMaturityDay",
    "type": "DAYOFMONTH"
  },
  "315": {
    "name": "UnderlyingPutOrCall",
    "type": "INT"
  },
  "316": {
    "name": "UnderlyingStrikePrice",
    "type": "PRICE"
  },
  "317": {
    "name": "UnderlyingOptAttribute",
    "type": "CHAR"
  },
  "318": {
    "name": "UnderlyingCurrency",
    "type": "CURRENCY"
  },
  "319": {
    "name": "RatioQty",
    "type": "QTY"
  },
  "320": {
    "name": "SecurityReqID",
    "type": "STRING"
  },
  "321": {
    "name": "SecurityRequestType",
    "type": "INT",
    "values": {
      "0": "Request Security Identity And Specifications",
      "1": "Request Security Identity For Specifications",
      "2": "Request List Security Types",
      "3": "Request List Securities"
    }
  },
  "322": {
    "name": "SecurityResponseID",
    "type": "STRING"
  },
  "323": {
    "name": "SecurityResponseType",
    "type": "INT",
    "values": {
      "1": "Accept As Is",
      "2": "Accept With Revisions",
      "3": "List Of Security Types Returned Per Request",
      "4": "List Of Securities Returned Per Request",
      "5": "Reject Security Proposal",
      "6": "Cannot Match Selection Criteria"
    }
  },
  "324": {
    "name": "SecurityStatusReqID",
    "type": "STRING"
  },
  "325": {
    "name": "UnsolicitedIndicator",
    "type": "BOOLEAN",
    "values": {
      "N": "No",
      "Y": "Yes"
    }
  },
  "326": {
    "name": "SecurityTradingStatus",
    "type": "INT",
    "values": {
      "1": "Opening Delay",
      "2": "Trading Halt",
      "3": "Resume",
      "4": "No Open",
      "5": "Price Indication",
      "6": "Trading Range Indication",
      "7": "Market Imbalance Buy",
      "8": "Market Imbalance Sell",
      "9": "Market On Close Imbalance Buy",
      "10": "Market On Close Imbalance Sell",
      "12": "No Market Imbalance",
      "13": "No Market On Close Imbalance",
      "14": "Its Pre Opening",
      "15": "New Price Indication",
      "16": "Trade Dissemination Time",
      "17": "Ready To Trade",
      "18": "Not Available For Trading",
      "19": "Not Traded On This Market",
      "20": "Unknown Or Invalid"
    }
  },
  "327": {
    "name": "HaltReasonChar",
    "type": "CHAR",
    "values": {
      "D": "News Dissemination",
      "E": "Order Influx",
      "I": "Order Imbalance",
      "M": "Additional Information",
      "P": "News Pending",
      "X": "Equipment Changeover"
    }
  },
  "328": {
    "name": "InViewOfCommon",
    "type": "BOOLEAN",
    "values": {
      "N": "No",
      "Y": "Yes"
    }
  },
  "329": {
    "name": "DueToRelated",
    "type": "BOOLEAN",
    "values": {
      "N": "No",
      "Y": "Yes"
    }
  },
  "330": {
    "name": "BuyVolume",
    "type": "QTY"
  },
  "331": {
    "name": "SellVolume",
    "type": "QTY"
  },
  "332": {
    "name": "HighPx",
    "type": "PRICE"
  },
  "333": {
    "name": "LowPx",
    "type": "PRICE"
  },
  "334": {
    "name": "Adjustment",
    "type": "INT",
    "values": {
      "1": "Cancel",
      "2": "Error",
      "3": "Correction"
    }
  },
  "335": {
    "name": "TradSesReqID",
    "type": "STRING"
  },
  "336": {
    "name": "TradingSessionID",
    "type": "STRING"
  },
  "337": {
    "name": "ContraTrader",
    "type": "STRING"
  },
  "338": {
    "name": "TradSesMethod",
    "type": "INT",
    "values": {
      "1": "Electronic",
      "2": "Open Outcry",
      "3": "Two Party"
    }
  },
  "339": {
    "name": "TradSesMode",
    "type": "INT",
    "values": {
      "1": "Testing",
      "2": "Simulated",
      "3": "Production"
    }
  },
  "340": {
    "name": "TradSesStatus",
    "type": "INT",
    "values": {
      "1": "Halted",
      "2": "Open",
      "3": "Closed",
      "4": "Pre Open",
      "5": "Pre Close"
    }
  },
  "341": {
    "name": "TradSesStartTime",
    "type": "UTCTIMESTAMP"
  },
  "342": {
    "name": "TradSesOpenTime",
    "type": "UTCTIMESTAMP"
  },
  "343": {
    "name": "TradSesPreCloseTime",
    "type": "UTCTIMESTAMP"
  },
  "344": {
    "name": "TradSesCloseTime",
    "type": "UTCTIMESTAMP"
  },
  "345": {
    "name": "TradSesEndTime",
    "type": "UTCTIMESTAMP"
  },
  "346": {
    "name": "NumberOfOrders",
    "type": "INT"
  },
  "347": {
    "name": "MessageEncoding",
    "type": "STRING",
    "values": {
      "EUC-JP": "Eucjp",
      "ISO-2022-JP": "Iso2022 Jp",
      "Shift_JIS": "Shift Jis",
      "UTF-8": "Utf8"
    }
  },
  "348": {
    "name": "EncodedIssuerLen",
    "type": "LENGTH"
  },
  "349": {
    "name": "EncodedIssuer",
    "type": "DATA"
  },
  "350": {
    "name": "EncodedSecurityDescLen",
    "type": "LENGTH"
  },
  "351": {
    "name": "EncodedSecurityDesc",
    "type": "DATA"
  },
  "352": {
    "name": "EncodedListExecInstLen",
    "type": "LENGTH"
  },
  "353": {
    "name": "EncodedListExecInst",
    "type": "DATA"
  },
  "354": {
    "name": "EncodedTextLen",
    "type": "LENGTH"
  },
  "355": {
    "name": "EncodedText",
    "type": "DATA"
  },
  "356": {
    "name": "EncodedSubjectLen",
    "type": "LENGTH"
  },
  "357": {
    "name": "EncodedSubject",
    "type": "DATA"
  },
  "358": {
    "name": "EncodedHeadlineLen",
    "type": "LENGTH"
  },
  "359": {
    "name": "EncodedHeadline",
    "type": "DATA"
  },
  "360": {
    "name": "EncodedAllocTextLen",
    "type": "LENGTH"
  },
  "361": {
    "name": "EncodedAllocText",
    "type": "DATA"
  },
  "362": {
    "name": "EncodedUnderlyingIssuerLen",
    "type": "LENGTH"
  },
  "363": {
    "name": "EncodedUnderlyingIssuer",
    "type": "DATA"
  },
  "364": {
    "name": "EncodedUnderlyingSecurityDescLen",
    "type": "LENGTH"
  },
  "365": {
    "name": "EncodedUnderlyingSecurityDesc",
    "type": "DATA"
  },
  "366": {
    "name": "AllocPrice",
    "type": "PRICE"
  },
  "367": {
    "name": "QuoteSetValidUntilTime",
    "type": "UTCTIMESTAMP"
  },
  "368": {
    "name": "QuoteEntryRejectReason",
    "type": "INT",
    "values": {
      "1": "Unknown Symbol",
      "2": "Exchange",
      "3": "Quote Exceeds Limit",
      "4": "Too Late To Enter",
      "5": "Unknown Quote",
      "6": "Duplicate Quote",
      "7": "Invalid Bid Ask Spread",
      "8": "Invalid Price",
      "9": "Not Authorized To Quote Security"
    }
  },
  "369": {
    "name": "LastMsgSeqNumProcessed",
    "type": "INT"
  },
  "370": {
    "name": "OnBehalfOfSendingTime",
    "type": "UTCTIMESTAMP"
  },
  "371": {
    "name": "RefTagID",
    "type": "INT"
  },
  "372": {
    "name": "RefMsgType",
    "type": "STRING"
  },
  "373": {
    "name": "SessionRejectReason",
    "type": "INT",
    "values": {
      "0": "Invalid Tag Number",
      "1": "Required Tag Missing",
      "2": "Tag Not Defined For This Message Type",
      "3": "Undefined Tag",
      "4": "Tag Specified Without A Value",
      "5": "Value Is Incorrect",
      "6": "Incorrect Data Format For Value",
      "7": "Decryption Problem",
      "8": "Signature Problem",
      "9": "Comp Id Problem",
      "10": "Sending Time Accuracy Problem",
      "11": "Invalid Msg Type"
    }
  },
  "374": {
    "name": "BidRequestTransType",
    "type": "CHAR",
    "values": {
      "C": "Cancel",
      "N": "New"
    }
  },
  "375": {
    "name": "ContraBroker",
    "type": "STRING"
  },
  "376": {
    "name": "ComplianceID",
    "type": "STRING"
  },
  "377": {
    "name": "SolicitedFlag",
    "type": "BOOLEAN",
    "values": {
      "N": "No",
      "Y": "Yes"
    }
  },
  "378": {
    "name": "ExecRestatementReason",
    "type": "INT",
    "values": {
      "0": "Gt Corporate Action",
      "1": "Gt Renewal",
      "2": "Verbal Change",
      "3": "Repricing Of Order",
      "4": "Broker Option",
      "5": "Partial Decline Of Order Qty"
    }
  },
  "379": {
    "name": "BusinessRejectRefID",
    "type": "STRING"
  },
  "380": {
    "name": "BusinessRejectReason",
    "type": "INT",
    "values": {
      "0": "Other",
      "1": "Unknown Id",
      "2": "Unknown Security",
      "3": "Unsupported Message Type",
      "4": "Application Not Available",
      "5": "Conditionally Required Field Missing"
    }
  },
  "381": {
    "name": "GrossTradeAmt",
    "type": "AMT"
  },
  "382": {
    "name": "NoContraBrokers",
    "type": "INT"
  },
  "383": {
    "name": "MaxMessageSize",
    "type": "INT"
  },
  "384": {
    "name": "NoMsgTypes",
    "type": "INT"
  },
  "385": {
    "name": "MsgDirection",
    "type": "CHAR",
    "values": {
      "R": "Receive",
      "S": "Send"
    }
  },
  "386": {
    "name": "NoTradingSessions",
    "type": "INT"
  },
  "387": {
    "name": "TotalVolumeTraded",
    "type": "QTY"
  },
  "388": {
    "name": "DiscretionInst",
    "type": "CHAR",
    "values": {
      "0": "Related To Displayed Price",
      "1": "Related To Market Price",
      "2": "Related To Primary Price",
      "3": "Related To Local Primary Price",
      "4": "Related To Midpoint Price",
      "5": "Related To Last Trade Price"
    }
  },
  "389": {
    "name": "DiscretionOffset",
    "type": "PRICEOFFSET"
  },
  "390": {
    "name": "BidID",
    "type": "STRING"
  },
  "391": {
    "name": "ClientBidID",
    "type": "STRING"
  },
  "392": {
    "name": "ListName",
    "type": "STRING"
  },
  "393": {
    "name": "TotalNumSecurities",
    "type": "INT"
  },
  "394": {
    "name": "BidType",
    "type": "INT"
  },
  "395": {
    "name": "NumTickets",
    "type": "INT"
  },
  "396": {
    "name": "SideValue1",
    "type": "AMT"
  },
  "397": {
    "name": "SideValue2",
    "type": "AMT"
  },
  "398": {
    "name": "NoBidDescriptors",
    "type": "INT"
  },
  "399": {
    "name": "BidDescriptorType",
    "type": "INT"
  },
  "400": {
    "name": "BidDescriptor",
    "type": "STRING"
  },
  "401": {
    "name": "SideValueInd",
    "type": "INT"
  },
  "402": {
    "name": "LiquidityPctLow",
    "type": "FLOAT"
  },
  "403": {
    "name": "LiquidityPctHigh",
    "type": "FLOAT"
  },
  "404": {
    "name": "LiquidityValue",
    "type": "AMT"
  },
  "405": {
    "name": "EFPTrackingError",
    "type": "FLOAT"
  },
  "406": {
    "name": "FairValue",
    "type": "AMT"
  },
  "407": {
    "name": "OutsideIndexPct",
    "type": "FLOAT"
  },
  "408": {
    "name": "ValueOfFutures",
    "type": "AMT"
  },
  "409": {
    "name": "LiquidityIndType",
    "type": "INT",
    "values": {
      "1": "Five Day Moving Average",
      "2": "Twenty Day Moving Average",
      "3": "Normal Market Size",
      "4": "Other"
    }
  },
  "410": {
    "name": "WtAverageLiquidity",
    "type": "FLOAT"
  },
  "411": {
    "name": "ExchangeForPhysical",
    "type": "BOOLEAN",
    "values": {
      "N": "No",
      "Y": "Yes"
    }
  },
  "412": {
    "name": "OutMainCntryUIndex",
    "type": "AMT"
  },
  "413": {
    "name": "CrossPercent",
    "type": "FLOAT"
  },
  "414": {
    "name": "ProgRptReqs",
    "type": "INT",
    "values": {
      "1": "Buy Side Requests",
      "2": "Sell Side Sends",
      "3": "Real Time Execution Reports"
    }
  },
  "415": {
    "name": "ProgPeriodInterval",
    "type": "INT"
  },
  "416": {
    "name": "IncTaxInd",
    "type": "INT",
    "values": {
      "1": "Net",
      "2": "Gross"
    }
  },
  "417": {
    "name": "NumBidders",
    "type": "INT"
  },
  "418": {
    "name": "TradeType",
    "type": "CHAR",
    "values": {
      "A": "Agency",
      "G": "Vwap Guarantee",
      "J": "Guaranteed Close",
      "R": "Risk Trade"
    }
  },
  "419": {
    "name": "BasisPxType",
    "type": "CHAR",
    "values": {
      "2": "Closing Price At Morning Session",
      "3": "Closing Price",
      "4": "Current Price",
      "5": "Sq",
      "6": "Vwap Through A Day",
      "7": "Vwap Through A Morning Session",
      "8": "Vwap Through An Afternoon Session",
      "9": "Vwap Through A Day Except",
      "A": "Vwap Through A Morning Session Except",
      "B": "Vwap Through An Afternoon Session Except",
      "C": "Strike",
      "D": "Open",
      "Z": "Others"
    }
  },
  "420": {
    "name": "NoBidComponents",
    "type": "INT"
  },
  "421": {
    "name": "Country",
    "type": "STRING"
  },
  "422": {
    "name": "TotNoStrikes",
    "type": "INT"
  },
  "423": {
    "name": "PriceType",
    "type": "INT",
    "values": {
      "1": "Percentage",
      "2": "Per Unit",
      "3": "Fixed Amount"
    }
  },
  "424": {
    "name": "DayOrderQty",
    "type": "QTY"
  },
  "425": {
    "name": "DayCumQty",
    "type": "QTY"
  },
  "426": {
    "name": "DayAvgPx",
    "type": "PRICE"
  },
  "427": {
    "name": "GTBookingInst",
    "type": "INT",
    "values": {
      "0": "Book Out All Trades On Day Of Execution",
      "1": "Accumulate Until Filled Or Expired",
      "2": "Accumulate Until Verballly Notified Otherwise"
    }
  },
  "428": {
    "name": "NoStrikes",
    "type": "INT"
  },
  "429": {
    "name": "ListStatusType",
    "type": "INT"
  },
  "430": {
    "name": "NetGrossInd",
    "type": "INT",
    "values": {
      "1": "Net",
      "2": "Gross"
    }
  },
  "431": {
    "name": "ListOrderStatus",
    "type": "INT"
  },
  "432": {
    "name": "ExpireDate",
    "type": "LOCALMKTDATE"
  },
  "433": {
    "name": "ListExecInstType",
    "type": "CHAR",
    "values": {
      "1": "Immediate",
      "2": "Wait For Instruction"
    }
  },
  "434": {
    "name": "CxlRejResponseTo",
    "type": "CHAR",
    "values": {
      "1": "Order Cancel Request",
      "2": "Order Cancel"
    }
  },
  "435": {
    "name": "UnderlyingCouponRate",
    "type": "FLOAT"
  },
  "436": {
    "name": "UnderlyingContractMultiplier",
    "type": "FLOAT"
  },
  "437": {
    "name": "ContraTradeQty",
    "type": "QTY"
  },
  "438": {
    "name": "ContraTradeTime",
    "type": "UTCTIMESTAMP"
  },
  "439": {
    "name": "ClearingFirm",
    "type": "STRING"
  },
  "440": {
    "name": "ClearingAccount",
    "type": "STRING"
  },
  "441": {
    "name": "LiquidityNumSecurities",
    "type": "INT"
  },
  "442": {
    "name": "MultiLegReportingType",
    "type": "CHAR",
    "values": {
      "1": "Single Security",
      "2": "Individual Leg Of A Multi Leg Security",
      "3": "Multi Leg Security"
    }
  },
  "443": {
    "name": "StrikeTime",
    "type": "UTCTIMESTAMP"
  },
  "444": {
    "name": "ListStatusText",
    "type": "STRING"
  },
  "445": {
    "name": "EncodedListStatusTextLen",
    "type": "LENGTH"
  },
  "446": {
    "name": "EncodedListStatusText",
    "type": "DATA"
  }
}

export const FIELDS_TT42: Record<number, FieldDef> = {
  "1": {
    "name": "Account",
    "type": "STRING"
  },
  "6": {
    "name": "AvgPx",
    "type": "PRICE"
  },
  "7": {
    "name": "BeginSeqNo",
    "type": "SEQNUM"
  },
  "8": {
    "name": "BeginString",
    "type": "STRING"
  },
  "9": {
    "name": "BodyLength",
    "type": "INT"
  },
  "10": {
    "name": "CheckSum",
    "type": "STRING"
  },
  "11": {
    "name": "ClOrdID",
    "type": "STRING"
  },
  "12": {
    "name": "Commission",
    "type": "AMT"
  },
  "13": {
    "name": "CommType",
    "type": "CHAR",
    "values": {
      "1": "Per Unit",
      "2": "Percentage",
      "3": "Absolute",
      "4": "Percentage Waived Cash Discount",
      "5": "Percentage Waived Enhanced Units",
      "6": "Points Per Bond Or Contract"
    }
  },
  "14": {
    "name": "CumQty",
    "type": "QTY"
  },
  "15": {
    "name": "Currency",
    "type": "CURRENCY"
  },
  "16": {
    "name": "EndSeqNo",
    "type": "SEQNUM"
  },
  "17": {
    "name": "ExecID",
    "type": "STRING"
  },
  "18": {
    "name": "ExecInst",
    "type": "MULTIPLESTRINGVALUE",
    "values": {
      "1": "Not Held",
      "2": "Work",
      "5": "Held",
      "6": "Participate Dont Initiate",
      "G": "All Or None",
      "S": "Suspend",
      "q": "Release From Suspension",
      "o": "Cancel On Connection Loss",
      "X": "Test Request"
    }
  },
  "19": {
    "name": "ExecRefID",
    "type": "STRING"
  },
  "20": {
    "name": "ExecTransType",
    "type": "CHAR",
    "values": {
      "0": "New",
      "1": "Cancel",
      "2": "Correct",
      "3": "Status"
    }
  },
  "21": {
    "name": "HandlInst",
    "type": "CHAR",
    "values": {
      "1": "Automated Execution Order Private No Broker Intervention",
      "2": "Automated Execution Order Public Broker Intervention Ok",
      "3": "Manual Order Best Execution"
    }
  },
  "22": {
    "name": "IDSource",
    "type": "STRING",
    "values": {
      "4": "Isin Number",
      "5": "Ric Code",
      "8": "Exchange Security Id",
      "91": "Exchange Ticker",
      "96": "Tt Security Id",
      "97": "Alias",
      "98": "Name",
      "A": "Bloomberg Code",
      "S": "Openfigi Id",
      "X": "Series Key",
      "H": "Clearing House"
    }
  },
  "30": {
    "name": "LastMkt",
    "type": "EXCHANGE"
  },
  "31": {
    "name": "LastPx",
    "type": "PRICE"
  },
  "32": {
    "name": "LastShares",
    "type": "QTY"
  },
  "33": {
    "name": "LinesOfText",
    "type": "INT"
  },
  "34": {
    "name": "MsgSeqNum",
    "type": "SEQNUM"
  },
  "35": {
    "name": "MsgType",
    "type": "STRING",
    "values": {
      "0": "Heartbeat",
      "1": "Test Request",
      "2": "Resend Request",
      "3": "Reject",
      "4": "Sequence Reset",
      "5": "Logout",
      "8": "Execution Report",
      "9": "Order Cancel Reject",
      "A": "Logon",
      "B": "News",
      "b": "Quote Request Response",
      "c": "Security Definition Request",
      "D": "Order Single",
      "AB": "Order Multi Leg",
      "AC": "Order Multi Leg Cancel Replace Request",
      "d": "Security Definition",
      "e": "Security Status Request",
      "f": "Security Status",
      "F": "Order Cancel Request",
      "G": "Order Cancel Replace Request",
      "g": "Trading Session Status Request",
      "H": "Order Status Request",
      "j": "Business Message Reject",
      "R": "Quote Request",
      "V": "Market Data Request",
      "W": "Market Data Snapshot Full Refresh",
      "X": "Market Data Incremental Refresh",
      "Y": "Market Data Request Reject",
      "AE": "Trade Capture Report",
      "AR": "Trade Capture Report Ack",
      "U2": "Outofband Recovery Request",
      "Q": "Dont Know Trade",
      "AD": "Trade Capture Report Request",
      "AQ": "Trade Capture Report Request Ack",
      "J": "Allocation Instruction",
      "P": "Allocation Instruction Ack",
      "AS": "Allocation Report",
      "AI": "Quote Status Report",
      "AJ": "Quote Response",
      "E": "New Order List"
    }
  },
  "36": {
    "name": "NewSeqNo",
    "type": "SEQNUM"
  },
  "37": {
    "name": "OrderID",
    "type": "STRING"
  },
  "38": {
    "name": "OrderQty",
    "type": "QTY"
  },
  "39": {
    "name": "OrdStatus",
    "type": "CHAR",
    "values": {
      "0": "New",
      "1": "Partially Filled",
      "2": "Filled",
      "3": "Done For Day",
      "4": "Canceled",
      "5": "Replaced",
      "6": "Pending Cancel",
      "7": "Stopped",
      "8": "Rejected",
      "9": "Suspended",
      "A": "Pending New",
      "B": "Calculated",
      "C": "Expired",
      "D": "Accepted For Bidding",
      "E": "Pending Replace",
      "H": "Trade Cancel",
      "z": "Inactive"
    }
  },
  "40": {
    "name": "OrdType",
    "type": "CHAR",
    "values": {
      "1": "Market",
      "2": "Limit",
      "3": "Stop",
      "4": "Stop Limit",
      "5": "Market On Close",
      "B": "Limit On Close",
      "D": "Previously Quoted",
      "K": "Market With Left Over As Limit",
      "Q": "Market Limit Market Left Over As Limit",
      "S": "Stop Market To Limit",
      "T": "If Touched Limit",
      "J": "If Touched Market",
      "U": "If Touched Market To Limit",
      "p": "Limit Post Only",
      "V": "Market Close Today",
      "W": "Limit Close Today",
      "P": "Peg",
      "X": "Iceberg"
    }
  },
  "41": {
    "name": "OrigClOrdID",
    "type": "STRING"
  },
  "43": {
    "name": "PossDupFlag",
    "type": "BOOLEAN",
    "values": {
      "N": "No",
      "Y": "Yes"
    }
  },
  "44": {
    "name": "Price",
    "type": "PRICE"
  },
  "45": {
    "name": "RefSeqNum",
    "type": "SEQNUM"
  },
  "48": {
    "name": "SecurityID",
    "type": "STRING"
  },
  "49": {
    "name": "SenderCompID",
    "type": "STRING"
  },
  "50": {
    "name": "SenderSubID",
    "type": "STRING"
  },
  "52": {
    "name": "SendingTime",
    "type": "UTCTIMESTAMP"
  },
  "53": {
    "name": "Quantity",
    "type": "QTY"
  },
  "54": {
    "name": "Side",
    "type": "CHAR",
    "values": {
      "1": "Buy",
      "2": "Sell",
      "3": "Buy Minus",
      "4": "Sell Plus",
      "5": "Sell Short",
      "6": "Sell Short Exempt",
      "7": "Undisclosed",
      "8": "Cross",
      "9": "Cross Short",
      "B": "As Defined",
      "C": "Opposite"
    }
  },
  "55": {
    "name": "Symbol",
    "type": "STRING"
  },
  "56": {
    "name": "TargetCompID",
    "type": "STRING"
  },
  "57": {
    "name": "TargetSubID",
    "type": "STRING"
  },
  "58": {
    "name": "Text",
    "type": "STRING"
  },
  "59": {
    "name": "TimeInForce",
    "type": "CHAR",
    "values": {
      "0": "Day",
      "1": "Good Till Cancel",
      "2": "At The Opening",
      "3": "Immediate Or Cancel",
      "4": "Fill Or Kill",
      "5": "Good Till Crossing",
      "6": "Good Till Date",
      "7": "At The Close",
      "8": "Good Through Crossing",
      "9": "At Crossing",
      "A": "Auction",
      "S": "Time In Force Morning At The Close",
      "T": "Time In Force Afternoon At The Close",
      "U": "Time In Force Night At The Close",
      "V": "Good In Session",
      "W": "Day Plus",
      "X": "Good Till Cancel Plus",
      "Y": "Good Till Date Plus"
    }
  },
  "60": {
    "name": "TransactTime",
    "type": "UTCTIMESTAMP"
  },
  "62": {
    "name": "ValidUntilTime",
    "type": "UTCTIMESTAMP"
  },
  "63": {
    "name": "SettlType",
    "type": "STRING"
  },
  "64": {
    "name": "SettlDate",
    "type": "LOCALMKTDATE"
  },
  "66": {
    "name": "ListID",
    "type": "STRING"
  },
  "67": {
    "name": "ListSeqNo",
    "type": "INT"
  },
  "69": {
    "name": "ListExecInst",
    "type": "STRING"
  },
  "70": {
    "name": "AllocID",
    "type": "STRING"
  },
  "71": {
    "name": "AllocTransType",
    "type": "CHAR",
    "values": {
      "0": "New",
      "1": "Replace",
      "2": "Cancel"
    }
  },
  "73": {
    "name": "NoOrders",
    "type": "NUMINGROUP"
  },
  "75": {
    "name": "TradeDate",
    "type": "LOCALMKTDATE"
  },
  "77": {
    "name": "OpenClose",
    "type": "CHAR",
    "values": {
      "C": "Close",
      "O": "Open",
      "F": "Fifo"
    }
  },
  "78": {
    "name": "NoAllocs",
    "type": "NUMINGROUP"
  },
  "79": {
    "name": "AllocAccount",
    "type": "STRING"
  },
  "80": {
    "name": "AllocQty",
    "type": "QTY"
  },
  "81": {
    "name": "ProcessCode",
    "type": "CHAR",
    "values": {
      "0": "Regular",
      "1": "Soft Dollar",
      "2": "Step In",
      "3": "Setp Out",
      "4": "Soft Dollar Step In",
      "5": "Soft Dollar Step Out",
      "6": "Plan Sponsor"
    }
  },
  "87": {
    "name": "AllocStatus",
    "type": "INT",
    "values": {
      "0": "Accepted",
      "1": "Block Level Reject",
      "2": "Account Level Reject",
      "3": "Received",
      "4": "Incomplete",
      "5": "Rejected By Intermediary"
    }
  },
  "96": {
    "name": "RawData",
    "type": "STRING"
  },
  "97": {
    "name": "PossResend",
    "type": "BOOLEAN",
    "values": {
      "N": "No",
      "Y": "Yes"
    }
  },
  "98": {
    "name": "EncryptMethod",
    "type": "INT",
    "values": {
      "0": "None"
    }
  },
  "99": {
    "name": "StopPx",
    "type": "PRICE"
  },
  "100": {
    "name": "ExDestination",
    "type": "EXCHANGE"
  },
  "102": {
    "name": "CxlRejReason",
    "type": "INT",
    "values": {
      "0": "Too Late To Cancel",
      "1": "Unknown Order",
      "2": "Broker Option",
      "3": "Order Already In Pending Cancel Or Pending Replace Status",
      "4": "Unable To Process Order Mass Cancel Request",
      "5": "Origordmodtime",
      "6": "Duplicate Clordid",
      "7": "Duplicate Of A Verbally Communicated Order",
      "8": "Stale Order",
      "9": "Trade Along Required",
      "10": "Invalid Investor Id",
      "11": "Unsupported Order Characteristic",
      "12": "Surveillence Option",
      "13": "Incorrect Quantity",
      "14": "Incorrect Allocated Quantity",
      "15": "Unknown Account",
      "16": "Price Exceeds Current Price Band",
      "18": "Invalid Price Increment",
      "19": "Message Pending",
      "20": "Routing Error",
      "99": "Other",
      "1003": "Market Closed",
      "1007": "Fix Field Missing Or Incorrect",
      "1010": "Required Field Missing",
      "1011": "Fix Field Incorrect",
      "1012": "Price Must Be Greater Than Zero",
      "1013": "Invalid Order Qualifier",
      "1014": "User Not Authorized",
      "2013": "Market Orders Not Supported By Opposite",
      "2019": "Invalid Expire Date",
      "2044": "Order Not In Book",
      "2045": "Order Not In Book2",
      "2046": "Disclosed Qty Cannot Be Greater",
      "2047": "Unknown Contract",
      "2048": "Cancel With Different Sender Comp Id",
      "2049": "Clordid Different Than Correlationclordid",
      "2050": "Clordid Different Than Originalclordid",
      "2051": "Different Side",
      "2052": "Different Group",
      "2053": "Different Security Type",
      "2054": "Different Account",
      "2055": "Different Qty",
      "2056": "Cancel With Different Trader Id",
      "2058": "Stop Price Must Be Greater",
      "2059": "Stop Price Must Be Smaller",
      "2060": "Sell Stop Price Must Be Below Ltp",
      "2061": "Buy Stop Price Must Be Above Ltp",
      "2100": "Different Product",
      "2101": "Different Inflight Fill Mitigation",
      "2102": "Modify With Different Sender Comp Id",
      "2103": "Modify With Different Trader Id",
      "2115": "Order Qty Outside Allowable Range",
      "2130": "Invalid Order Type For Pcp",
      "2137": "Order Price Outside Limits",
      "2179": "Order Price Outside Bands",
      "2311": "Invalid Order Type For Group",
      "2500": "Instrument Cross Request In Progress",
      "2501": "Order Qty Too Low",
      "2600": "Market Maker Protection Has Tripped",
      "4000": "Engine Did Not Respond",
      "5001": "Euronext Unknown Order",
      "5020": "Comp Id Problem",
      "5099": "Euronext Other",
      "5300": "Logon Problem",
      "5313": "No Router For Security Group",
      "5314": "Router Not Available Or Connected",
      "5318": "Invalid Price",
      "5319": "Invalid Ordqty",
      "5320": "Invalid Ordtype",
      "5321": "Invalid Side",
      "6000": "Fully Filled",
      "6001": "Pending Replace",
      "6002": "Pending Cancel",
      "7000": "Order Rejected",
      "7001": "Contract Not Gtc Gtd Eligible",
      "7009": "Contract Past Expiration",
      "7011": "Max Contract Working Qty Exceeded",
      "7015": "Modify With Different Side",
      "7018": "Contract Not Gtc Gtd Eligible2",
      "7020": "No Trading Calendar For Expire Date",
      "7021": "Expire Date Beyond Instrument Expiration",
      "7022": "Expire Date Beyond Leg Instrument Expiration",
      "7024": "Market In No Cancel",
      "7027": "Invalid Order Type For Reserved Market",
      "7028": "Order Session Date In Past",
      "7613": "Disclosed Qty Cannot Be Smaller",
      "9999": "Technical Error Function Not Performed"
    }
  },
  "103": {
    "name": "OrdRejReason",
    "type": "INT",
    "values": {
      "0": "Broker Option",
      "1": "Unknown Symbol",
      "2": "Exchange Closed",
      "3": "Order Exceeds Limit",
      "4": "Too Late To Enter",
      "5": "Unknown Order",
      "6": "Duplicate Order",
      "7": "Duplicate Of A Verbally Communicated Order",
      "8": "Stale Order",
      "9": "Trade Along Required",
      "10": "Invalid Investor Id",
      "11": "Unsupported Order Characteristic",
      "12": "Surveillence Option",
      "13": "Incorrect Quantity",
      "14": "Incorrect Allocated Quantity",
      "15": "Unknown Account",
      "16": "Price Exceeds Current Price Band",
      "18": "Invalid Price Increment",
      "19": "Message Pending",
      "20": "Routing Error",
      "99": "Other",
      "100": "Time Out",
      "1003": "Market Closed",
      "1007": "Fix Field Missing Or Incorrect",
      "1010": "Required Field Missing",
      "1011": "Fix Field Incorrect",
      "1012": "Price Must Be Greater Than Zero",
      "1013": "Invalid Order Qualifier",
      "1014": "User Not Authorized",
      "2013": "Market Hours Not Suported By Opposite",
      "2019": "Invalid Expire Date",
      "2044": "Order Not In Book",
      "2045": "Order Not In Book 2",
      "2046": "Disclosed Qty Cannot Be Greater",
      "2047": "Unknown Contract",
      "2048": "Cancel With Different Sender Comp Id",
      "2049": "Clordid Different Than Correleation Clordid",
      "2050": "Clordid Different Than Original Clordid",
      "2051": "Different Side",
      "2052": "Different Group",
      "2053": "Different Security Type",
      "2054": "Different Account",
      "2055": "Different Qty",
      "2056": "Cancel With Different Trader Id",
      "2058": "Stop Price Must Be Greater",
      "2059": "Stop Price Must Be Smaller",
      "2060": "Sell Stop Price Must Be Below Ltp",
      "2061": "Buy Stop Price Must Be Above Ltp",
      "2100": "Different Product",
      "2101": "Different Inflight Fill Modification",
      "2102": "Modify With Different Sender Comp Id",
      "2103": "Modify With Different Trader Id",
      "2115": "Order Qty Outside Allowable Range",
      "2130": "Invalid Order Type For Pcp",
      "2137": "Order Price Outside Limits",
      "2179": "Order Price Outside Bands",
      "2311": "Invalid Order Type For Group",
      "2500": "Instrument Cross Request In Process",
      "2501": "Ordr Qty Too Low",
      "2600": "Market Maker Protection Has Tripped",
      "4000": "Engine Did Not Respond",
      "6001": "Pending Replace",
      "6002": "Pending Cancel",
      "7000": "Order Rejected",
      "7001": "Contract Not Gtc Gtd Eligible",
      "7009": "Contract Past Expiration",
      "7011": "Max Contract Working Qty Exceeded",
      "7015": "Modify With Different Side",
      "7018": "Contract Not Gtc Gtd Eligible 2",
      "7020": "No Trading Calendar For Expire Date",
      "7021": "Expire Date Beyond Instrument Expiration",
      "7022": "Expire Date Beyond Leg Instrument Expiration",
      "7024": "Market In No Cancel",
      "7027": "Invalid Order Type For Reserved Market",
      "7028": "Order Session Date In Past",
      "7613": "Disclosed Qty Cannot Be Smaller",
      "9999": "Technical Error Function Not Performed"
    }
  },
  "107": {
    "name": "SecurityDesc",
    "type": "STRING"
  },
  "108": {
    "name": "HeartBtInt",
    "type": "INT"
  },
  "110": {
    "name": "MinQty",
    "type": "QTY"
  },
  "112": {
    "name": "TestReqID",
    "type": "STRING"
  },
  "115": {
    "name": "OnBehalfOfCompID",
    "type": "STRING"
  },
  "116": {
    "name": "OnBehalfOfSubID",
    "type": "STRING"
  },
  "117": {
    "name": "QuoteId",
    "type": "STRING"
  },
  "118": {
    "name": "NetMoney",
    "type": "AMT"
  },
  "122": {
    "name": "OrigSendingTime",
    "type": "UTCTIMESTAMP"
  },
  "123": {
    "name": "GapFillFlag",
    "type": "BOOLEAN",
    "values": {
      "N": "No",
      "Y": "Yes"
    }
  },
  "124": {
    "name": "NoExecs",
    "type": "NUMINGROUP"
  },
  "126": {
    "name": "ExpireTime",
    "type": "UTCTIMESTAMP"
  },
  "127": {
    "name": "DKReason",
    "type": "CHAR",
    "values": {
      "A": "Unknown Symbol",
      "Z": "Other"
    }
  },
  "128": {
    "name": "DeliverToCompID",
    "type": "STRING"
  },
  "129": {
    "name": "DeliverToSubID",
    "type": "STRING"
  },
  "131": {
    "name": "QuoteReqID",
    "type": "STRING"
  },
  "132": {
    "name": "BidPx",
    "type": "PRICE"
  },
  "133": {
    "name": "OfferPx",
    "type": "PRICE"
  },
  "134": {
    "name": "BidSize",
    "type": "QTY"
  },
  "135": {
    "name": "OfferSize",
    "type": "QTY"
  },
  "136": {
    "name": "NoMiscFees",
    "type": "NUMINGROUP"
  },
  "137": {
    "name": "MiscFeeAmt",
    "type": "AMT"
  },
  "138": {
    "name": "MiscFeeCurr",
    "type": "CURRENCY"
  },
  "139": {
    "name": "MiscFeeType",
    "type": "INT",
    "values": {
      "1": "Regulatory",
      "2": "Tax",
      "3": "Local Commission",
      "4": "Exchange Fees",
      "5": "Stamp",
      "6": "Levy",
      "7": "Other",
      "8": "Markup",
      "9": "Consumption Tax",
      "10": "Per Transaction",
      "11": "Conversion",
      "12": "Agent"
    }
  },
  "141": {
    "name": "ResetSeqNumFlag",
    "type": "BOOLEAN",
    "values": {
      "N": "No",
      "Y": "Yes"
    }
  },
  "142": {
    "name": "SenderLocationID",
    "type": "STRING"
  },
  "146": {
    "name": "NoRelatedSym",
    "type": "NUMINGROUP"
  },
  "148": {
    "name": "Headline",
    "type": "STRING"
  },
  "150": {
    "name": "ExecType",
    "type": "CHAR",
    "values": {
      "0": "New",
      "1": "Partial Fill",
      "2": "Fill",
      "3": "Done For Day",
      "4": "Canceled",
      "5": "Replace",
      "6": "Pending Cancel",
      "7": "Stopped",
      "8": "Rejected",
      "9": "Suspended",
      "A": "Pending New",
      "B": "Calculated",
      "C": "Expired",
      "D": "Restated",
      "E": "Pending Replace",
      "F": "Trade",
      "G": "Trade Correct",
      "H": "Trade Cancel",
      "I": "Order Status",
      "J": "Trade In A Clearing Hold",
      "K": "Trade Has Been Released To Clearing",
      "L": "Triggered Or Activated By System",
      "a": "Cancelled By Stp",
      "b": "Order Cancelled Due To Cod Mechanism",
      "n": "Order Cancelled Due To Potential Trade Outside Fsp Limits",
      "u": "Order Cancelled Due To Market Maker Protection",
      "v": "Order Cancelled By Clearing Risk Manager",
      "w": "Order Cancelled Due To Trade Price Validation",
      "O": "Eliminated By Corporate Event",
      "P": "Cancelled By Member Risk Manager",
      "U": "Order Cancelled By Market Operations",
      "V": "Cancelled Due To Kill Command",
      "X": "Remaining Quantity Killed",
      "Y": "Beginning Of Pako Period",
      "R": "Rfq Partially Or Fully Matched With Other Counterparts"
    }
  },
  "151": {
    "name": "LeavesQty",
    "type": "QTY"
  },
  "153": {
    "name": "AllocAvgPx",
    "type": "PRICE"
  },
  "154": {
    "name": "AllocNetMoney",
    "type": "AMT"
  },
  "161": {
    "name": "AllocText",
    "type": "STRING"
  },
  "167": {
    "name": "SecurityType",
    "type": "STRING",
    "values": {
      "FUT": "Future",
      "OPT": "Option",
      "MLEG": "Spread",
      "SPOT": "Spot",
      "TBOND": "Tbond",
      "CUR": "Currency",
      "CS": "Common Stock",
      "INDEX": "Index",
      "NONE": "None"
    }
  },
  "168": {
    "name": "EffectiveTime",
    "type": "UTCTIMESTAMP"
  },
  "194": {
    "name": "LastSpotRate",
    "type": "PRICE"
  },
  "195": {
    "name": "LastForwardPoints",
    "type": "PRICEOFFSET"
  },
  "196": {
    "name": "AllocLinkID",
    "type": "STRING"
  },
  "198": {
    "name": "SecondaryOrderID",
    "type": "STRING"
  },
  "200": {
    "name": "MaturityMonthYear",
    "type": "MONTHYEAR"
  },
  "201": {
    "name": "PutOrCall",
    "type": "INT",
    "values": {
      "0": "Put",
      "1": "Call"
    }
  },
  "202": {
    "name": "StrikePrice",
    "type": "PRICE"
  },
  "205": {
    "name": "MaturityDay",
    "type": "DAYOFMONTH"
  },
  "206": {
    "name": "OptAttribute",
    "type": "CHAR"
  },
  "207": {
    "name": "SecurityExchange",
    "type": "EXCHANGE"
  },
  "210": {
    "name": "MaxShow",
    "type": "INT"
  },
  "262": {
    "name": "MDReqID",
    "type": "STRING"
  },
  "263": {
    "name": "SubscriptionRequestType",
    "type": "CHAR",
    "values": {
      "0": "Snapshot",
      "1": "Snapshot Plus Updates",
      "2": "Disable Previous Snapshot Plus Update Request"
    }
  },
  "264": {
    "name": "MarketDepth",
    "type": "INT",
    "values": {
      "0": "Full Book",
      "1": "Top Of Book"
    }
  },
  "265": {
    "name": "MDUpdateType",
    "type": "INT",
    "values": {
      "0": "Full Refresh",
      "1": "Incremental Refresh"
    }
  },
  "266": {
    "name": "AggregatedBook",
    "type": "BOOLEAN",
    "values": {
      "N": "No",
      "Y": "Yes"
    }
  },
  "267": {
    "name": "NoMDEntryTypes",
    "type": "NUMINGROUP"
  },
  "268": {
    "name": "NoMDEntries",
    "type": "NUMINGROUP"
  },
  "269": {
    "name": "MDEntryType",
    "type": "CHAR",
    "values": {
      "0": "Bid",
      "1": "Ask",
      "2": "Trade",
      "4": "Opening Price",
      "5": "Closing Price",
      "6": "Settlement Price",
      "7": "Trading Session High Price",
      "8": "Trading Session Low Price",
      "9": "Trading Session Vwap Price",
      "B": "Trade Volume",
      "J": "Empty Book",
      "L": "Leg Trade",
      "Y": "Implied Bid",
      "Z": "Implied Ask",
      "m": "Otc Trade",
      "p": "Indicative Open",
      "q": "Indicative Close",
      "r": "Indicative Bid",
      "s": "Indicative Ask",
      "t": "Indicative Settlement",
      "u": "Exchange Sending Time",
      "v": "Exchange Transact Time",
      "w": "Exchange Seq Num",
      "x": "Last Traded",
      "A": "Imbalance",
      "o": "Marketbidqty",
      "n": "Marketaskqty"
    }
  },
  "270": {
    "name": "MDEntryPx",
    "type": "PRICE"
  },
  "271": {
    "name": "MDEntrySize",
    "type": "QTY"
  },
  "272": {
    "name": "MDEntryDate",
    "type": "UTCDATEONLY"
  },
  "273": {
    "name": "MDEntryTime",
    "type": "UTCTIMEONLY"
  },
  "276": {
    "name": "QuoteCondition",
    "type": "CHAR",
    "values": {
      "A": "Open Active",
      "B": "Closed Inactive",
      "z": "Suspended"
    }
  },
  "279": {
    "name": "MDUpdateAction",
    "type": "CHAR",
    "values": {
      "0": "New",
      "1": "Change",
      "2": "Delete"
    }
  },
  "282": {
    "name": "MDEntryOriginator",
    "type": "STRING"
  },
  "290": {
    "name": "MDEntryPositionNo",
    "type": "INT"
  },
  "297": {
    "name": "QuoteStatus",
    "type": "INT",
    "values": {
      "0": "Accepted",
      "5": "Rejected",
      "7": "Expired"
    }
  },
  "305": {
    "name": "UnderlyingSecurityIDSource",
    "type": "STRING",
    "values": {
      "4": "Isin Number",
      "5": "Ric Code",
      "8": "Exchange Security Id",
      "91": "Exchange Ticker",
      "96": "Tt Security Id",
      "97": "Alias",
      "98": "Name",
      "A": "Bloomberg Code",
      "S": "Openfigi Id",
      "X": "Series Key",
      "H": "Clearing House"
    }
  },
  "306": {
    "name": "UnderlyingIssuer",
    "type": "STRING"
  },
  "309": {
    "name": "UnderlyingSecurityID",
    "type": "STRING"
  },
  "310": {
    "name": "UnderlyingSecurityType",
    "type": "STRING",
    "values": {
      "FUT": "Future",
      "OPT": "Option",
      "MLEG": "Spread",
      "SPOT": "Spot",
      "TBOND": "Tbond",
      "CUR": "Currency",
      "CS": "Common Stock",
      "NONE": "None"
    }
  },
  "311": {
    "name": "UnderlyingSymbol",
    "type": "STRING"
  },
  "316": {
    "name": "UnderlyingStrikePrice",
    "type": "PRICE"
  },
  "318": {
    "name": "UnderlyingCurrency",
    "type": "CURRENCY"
  },
  "320": {
    "name": "SecurityReqID",
    "type": "STRING"
  },
  "321": {
    "name": "SecurityRequestType",
    "type": "INT",
    "values": {
      "0": "Request Security Identity And Specifications",
      "1": "Request Security Identity For The Specifications Provided",
      "2": "Request List Security Types",
      "3": "Request List Securities"
    }
  },
  "322": {
    "name": "SecurityResponseID",
    "type": "STRING"
  },
  "323": {
    "name": "SecurityResponseType",
    "type": "INT",
    "values": {
      "1": "Accept Security Proposal As Is",
      "2": "Accept Security Proposal With Revisions As Indicated In The Message",
      "3": "List Of Security Types Returned Per Request",
      "4": "List Of Securities Returned Per Request",
      "5": "Reject Security Proposal",
      "6": "Can Not Match Selection Criteria"
    }
  },
  "324": {
    "name": "SecurityStatusReqID",
    "type": "STRING"
  },
  "326": {
    "name": "SecurityTradingStatus",
    "type": "INT",
    "values": {
      "2": "Trading Halt",
      "9": "Circuit Breaker",
      "17": "Ready To Trade",
      "18": "Not Available For Trading",
      "20": "Unknown Or Invalid",
      "21": "Preopen",
      "23": "Fast Market",
      "98": "Post Close",
      "99": "Pre Trade"
    }
  },
  "337": {
    "name": "ContraTrader",
    "type": "STRING"
  },
  "346": {
    "name": "NumberOfOrders",
    "type": "INT"
  },
  "366": {
    "name": "AllocPrice",
    "type": "PRICE"
  },
  "369": {
    "name": "LastSeqNumProcessed",
    "type": "SEQNUM"
  },
  "371": {
    "name": "RefTagID",
    "type": "INT"
  },
  "372": {
    "name": "RefMsgType",
    "type": "STRING"
  },
  "373": {
    "name": "SessionRejectReason",
    "type": "INT",
    "values": {
      "0": "Invalid Tag Number",
      "1": "Required Tag Missing",
      "2": "Tag Not Defined For This Message Type",
      "3": "Undefined Tag",
      "4": "Tag Specified Without A Value",
      "5": "Value Is Incorrect",
      "6": "Incorrect Data Format For Value",
      "7": "Decryption Problem",
      "8": "Signature Problem",
      "9": "Compid Problem",
      "10": "Sendingtime Accuracy Problem",
      "11": "Invalid Msgtype",
      "99": "Other"
    }
  },
  "375": {
    "name": "ContraBroker",
    "type": "STRING"
  },
  "378": {
    "name": "ExecRestatementReason",
    "type": "INT",
    "values": {
      "0": "Gt Corporate Action",
      "1": "Gt Renewal",
      "2": "Verbal Change",
      "3": "Repricing Of Order",
      "4": "Broker Option",
      "5": "Partial Decline Of Orderqty",
      "6": "Cancel On Trading Halt",
      "7": "Cancel On System Failure",
      "8": "Market",
      "9": "Cancel Not Best",
      "10": "Warehouse Recap",
      "11": "Peg Refresh",
      "50": "Control User Activity",
      "51": "Corporate Manager Activity",
      "52": "Branch Manager Activity",
      "53": "Exchange And Fix Server Connection Down",
      "99": "Other",
      "100": "Cancel On Disconnect",
      "103": "Cancel Resting Smp",
      "104": "Cancel From Credit Violation",
      "105": "Cancel From Firmsoft",
      "106": "Cancel From Risk",
      "107": "Cancel Aggressing Smp",
      "108": "Cancel From Min Lot Size",
      "109": "Exec Restatement Reason Cancel By System",
      "110": "Exec Restatement Reason Cancel By Proxy",
      "111": "Exec Restatement Reason Cancel Order Expired",
      "112": "Exec Restatement Reason Cancel Outside Price Limits",
      "113": "Exec Restatement Reason Cancel Session Transition",
      "114": "Exec Restatement Reason Cancel Auction Delete",
      "115": "Exec Restatement Reason Cancel Other",
      "116": "Order Passing Request Accepted",
      "117": "Order Passing Request Rejected",
      "118": "Incoming Order Self Match Prevention",
      "119": "Resting Order Self Match Prevention",
      "120": "Cancel Due To Self Match Prevention",
      "121": "Exec Restatement Reason Gtc Gtd Carryover",
      "122": "Exec Restatement Reason Reduction Of Ordqty",
      "123": "Exec Restatement Reason Price Sliding Reprice",
      "124": "Exec Restatement Reason State Change",
      "125": "Order Passing Request Initiate",
      "126": "Order Passing Request Undo",
      "9000": "Exec Restatement Reason Unsolicited Order Recovery",
      "9001": "Exec Restatement Reason Timeout",
      "9002": "Exec Restatement Reason Pending",
      "9003": "Exec Restatement Reason Revived"
    }
  },
  "379": {
    "name": "BusinessRejectRefID",
    "type": "STRING"
  },
  "380": {
    "name": "BusinessRejectReason",
    "type": "INT",
    "values": {
      "0": "Other",
      "1": "Unkown Id",
      "2": "Unknown Security",
      "3": "Unsupported Message Type",
      "4": "Application Not Available",
      "5": "Conditionally Required Field Missing"
    }
  },
  "381": {
    "name": "GrossTradeAmt",
    "type": "AMT"
  },
  "393": {
    "name": "TotalNumSecurities",
    "type": "INT"
  },
  "423": {
    "name": "PriceType",
    "type": "INT",
    "values": {
      "1": "Percentage",
      "2": "Per Unit",
      "3": "Fixed Amount",
      "4": "Discount",
      "5": "Premium",
      "6": "Spread",
      "7": "Ted Price",
      "8": "Ted Yield",
      "9": "Yield",
      "10": "Fixed Cabinet Trade Price",
      "11": "Variable Cabinet Trade Price"
    }
  },
  "432": {
    "name": "ExpireDate",
    "type": "LOCALMKTDATE"
  },
  "434": {
    "name": "CxlRejResponseTo",
    "type": "CHAR",
    "values": {
      "1": "Order Cancel Request",
      "2": "Order Cancel Replace Request",
      "3": "Quote Cancel",
      "4": "Quote Replace"
    }
  },
  "435": {
    "name": "UnderlyingSpotRate",
    "type": "FLOAT"
  },
  "440": {
    "name": "ClearingAccount",
    "type": "STRING"
  },
  "442": {
    "name": "MultiLegReportingType",
    "type": "CHAR",
    "values": {
      "1": "Single Security",
      "2": "Individual Leg Of A Multi Leg Security",
      "3": "Multi Leg Security"
    }
  },
  "447": {
    "name": "PartyIDSource",
    "type": "CHAR",
    "values": {
      "1": "Korean Investor Id",
      "2": "Taiwanese Qualified Foreign Investor Id Qfii Fid",
      "3": "Taiwanese Trading Acct",
      "4": "Malaysian Central Depository",
      "5": "Chinese Investor Id",
      "6": "Uk National Insurance Or Pension Number",
      "7": "Us Social Security Number",
      "8": "Us Employer Or Tax Id Number",
      "9": "Australian Business Number",
      "A": "Australian Tax File Number",
      "B": "Bic",
      "C": "Generally Accepted Market Participant Identifier",
      "D": "Proprietary",
      "E": "Iso Country Code",
      "F": "Settlement Entity Location",
      "G": "Mic",
      "H": "Csd Participant Member Code",
      "I": "Directed Broker Three Character Acronym As Defined In Isitc Etc Best Practice Guidelines Document",
      "P": "Short Code Identifier",
      "N": "Legal Entity Id"
    }
  },
  "448": {
    "name": "PartyID",
    "type": "STRING"
  },
  "452": {
    "name": "PartyRole",
    "type": "INT",
    "values": {
      "1": "Executing Firm",
      "2": "Broker Of Credit",
      "3": "Client Id",
      "4": "Clearing Firm",
      "5": "Investor Id",
      "6": "Introducing Firm",
      "7": "Entering Firm",
      "8": "Locate",
      "9": "Fund Manager Client Id",
      "10": "Settlement Location",
      "11": "Order Origination Trader",
      "12": "Executing Trader",
      "13": "Order Origination Firm",
      "14": "Giveup Clearing Firm",
      "15": "Correspondant Clearing Firm",
      "16": "Executing System",
      "17": "Contra Firm",
      "18": "Contra Clearing Firm",
      "19": "Sponsoring Firm",
      "20": "Underlying Contra Firm",
      "21": "Clearing Organization",
      "22": "Exchange",
      "24": "Customer Account",
      "25": "Correspondent Clearing Organization",
      "26": "Correspondent Broker",
      "27": "Buyer Seller",
      "28": "Custodian",
      "29": "Intermediary",
      "30": "Agent",
      "31": "Sub Custodian",
      "32": "Beneficiary",
      "33": "Interested Party",
      "34": "Regulatory Body",
      "35": "Liquidity Provider",
      "36": "Entering Trader",
      "37": "Contra Trader",
      "38": "Position Account",
      "39": "Contra Investor Id",
      "40": "Transfer To Firm",
      "41": "Contra Position Account",
      "42": "Contra Exchange",
      "43": "Internal Carry Account",
      "44": "Order Entry Operator Id",
      "45": "Secondary Account Number",
      "46": "Foreign Firm",
      "47": "Third Party Allocation Firm",
      "48": "Claiming Account",
      "49": "Asset Manager",
      "50": "Pledgor Account",
      "51": "Pledgee Account",
      "52": "Large Trader Reportable Account",
      "53": "Trader Mnemonic",
      "54": "Sender Location",
      "55": "Session Id",
      "56": "Acceptable Counterparty",
      "57": "Unacceptable Counterparty",
      "58": "Entering Unit",
      "59": "Executing Unit",
      "60": "Introducing Broker",
      "61": "Quote Originator",
      "62": "Report Originator",
      "63": "Systematic Internaliser",
      "64": "Multilateral Trading Facility",
      "65": "Regulated Market",
      "66": "Market Maker",
      "67": "Investment Firm",
      "68": "Host Competent Authority",
      "69": "Home Competent Authority",
      "70": "Competent Authority Of The Most Relevant Market In Terms Of Liquidity",
      "71": "Competent Authority Of The Transaction",
      "72": "Reporting Intermediary",
      "73": "Execution Venue",
      "74": "Market Data Entry Originator",
      "75": "Location Id",
      "76": "Desk Id",
      "77": "Market Data Market",
      "78": "Allocation Entity",
      "79": "Prime Broker Providing General Trade Services",
      "80": "Step Out Firm",
      "81": "Brokerclearingid",
      "82": "Central Registration Depository",
      "83": "Clearing Account",
      "84": "Acceptable Settling Counterparty",
      "85": "Unacceptable Settling Counterparty",
      "118": "Party Role Decision Maker",
      "119": "Party Role Client Id House",
      "122": "Investment Decision Maker",
      "200": "Account Code",
      "201": "Takeup Firm",
      "202": "Clearing Instruction",
      "203": "Customer Info",
      "204": "Allocation Entity Id",
      "205": "Account Type",
      "206": "Giveup Firm",
      "207": "Mifid Id",
      "208": "Composite Mifid Id",
      "209": "Cti Code",
      "210": "Lma Clearing Account",
      "211": "Authorized Trader Id",
      "212": "Frequent Trader Id",
      "213": "Party Role User",
      "214": "Party Role Member",
      "215": "Party Role Trading Member",
      "216": "Party Role Clearing Member",
      "217": "Party Role Acting User",
      "218": "Party Role Trader Id",
      "219": "Party Role Owner Type",
      "220": "Party Role Routing Member Id",
      "221": "Giveup Qualifier",
      "222": "Algo Strategy Type",
      "223": "Secondary Client Id",
      "224": "Secondary Executing Trader",
      "300": "Investment Decision In Firm",
      "301": "Execution Decision In Firm",
      "302": "Investment Decision Country",
      "303": "Execution Decision Country",
      "304": "Party Role Country Code"
    }
  },
  "453": {
    "name": "NoPartyIDs",
    "type": "NUMINGROUP"
  },
  "454": {
    "name": "NoSecurityAltID",
    "type": "NUMINGROUP"
  },
  "455": {
    "name": "SecurityAltID",
    "type": "STRING"
  },
  "456": {
    "name": "SecurityAltIDSource",
    "type": "STRING",
    "values": {
      "1": "Cusip",
      "4": "Isin Number",
      "5": "Ric Code",
      "8": "Exchange Security Id",
      "91": "Exchange Ticker",
      "92": "Tt Product Family Id",
      "93": "Tt Product Id",
      "94": "Alt Symbol",
      "95": "Clearport",
      "97": "Alias",
      "98": "Name",
      "99": "Security Group",
      "100": "Energy Identifier Code",
      "A": "Bloomberg Code",
      "S": "Openfigi Id",
      "H": "Clearing House",
      "X": "Series Key"
    }
  },
  "457": {
    "name": "NoUnderlyingSecurityAltID",
    "type": "NUMINGROUP"
  },
  "458": {
    "name": "UnderlyingSecurityAltID",
    "type": "STRING"
  },
  "459": {
    "name": "UnderlyingSecurityAltIDSource",
    "type": "STRING"
  },
  "460": {
    "name": "Product",
    "type": "INT",
    "values": {
      "1": "Agency",
      "2": "Commodity",
      "3": "Corporate",
      "4": "Currency",
      "5": "Equity",
      "6": "Government",
      "7": "Index",
      "8": "Loan",
      "9": "Moneymarket",
      "10": "Mortgage",
      "11": "Municipal",
      "12": "Other",
      "13": "Financing",
      "14": "Energy"
    }
  },
  "461": {
    "name": "CFICode",
    "type": "STRING"
  },
  "467": {
    "name": "IndividualAllocID",
    "type": "STRING"
  },
  "483": {
    "name": "TransBkdTime",
    "type": "UTCTIMESTAMP"
  },
  "487": {
    "name": "TradeReportTransType",
    "type": "INT",
    "values": {
      "0": "New",
      "1": "Cancel",
      "2": "Replace",
      "3": "Release",
      "4": "Reverse",
      "5": "Cancel Due To Back Out Of Trade",
      "101": "Inquire",
      "102": "Accept",
      "103": "Approve",
      "999": "Unknown"
    }
  },
  "524": {
    "name": "NestedPartyID",
    "type": "STRING"
  },
  "525": {
    "name": "NestedPartyIDSource",
    "type": "CHAR",
    "values": {
      "1": "Korean Investor Id",
      "2": "Taiwanese Qualified Foreign Investor Id Qfii Fid",
      "3": "Taiwanese Trading Acct",
      "4": "Malaysian Central Depository",
      "5": "Chinese Investor Id",
      "6": "Uk National Insurance Or Pension Number",
      "7": "Us Social Security Number",
      "8": "Us Employer Or Tax Id Number",
      "9": "Australian Business Number",
      "A": "Australian Tax File Number",
      "B": "Bic",
      "C": "Generally Accepted Market Participant Identifier",
      "D": "Proprietary",
      "E": "Iso Country Code",
      "F": "Settlement Entity Location",
      "G": "Mic",
      "H": "Csd Participant Member Code",
      "I": "Directed Broker Three Character Acronym As Defined In Isitc Etc Best Practice Guidelines Document"
    }
  },
  "526": {
    "name": "SecondaryClOrdID",
    "type": "STRING"
  },
  "527": {
    "name": "SecondaryExecID",
    "type": "STRING"
  },
  "528": {
    "name": "OrderCapacity",
    "type": "CHAR",
    "values": {
      "A": "Agency",
      "G": "Proprietary",
      "I": "Individual",
      "P": "Principal",
      "R": "Riskless Principal",
      "W": "Agent For Other Member"
    }
  },
  "529": {
    "name": "OrderRestriction",
    "type": "CHAR",
    "values": {
      "1": "Program Trade",
      "2": "Index Arbitage",
      "3": "Non Index Arbitage",
      "4": "Competing Market Maker",
      "5": "Acting Market Maker",
      "6": "Acting Market Maker Underlying Security",
      "7": "Foreign Entity",
      "8": "External Market Participant",
      "9": "External Market Linkage",
      "A": "Riskless Arbitage",
      "B": "Holding",
      "C": "Price Stabilization",
      "D": "Non Algorithmic",
      "E": "Algorithmic"
    }
  },
  "537": {
    "name": "QuoteType",
    "type": "INT",
    "values": {
      "0": "Indicative",
      "1": "Tradable",
      "99": "Cross Trade Request",
      "255": "Unknown"
    }
  },
  "538": {
    "name": "NestedPartyRole",
    "type": "INT",
    "values": {
      "1": "Executing Firm",
      "2": "Broker Of Credit",
      "3": "Client Id",
      "4": "Clearing Firm",
      "5": "Investor Id",
      "6": "Introducing Firm",
      "7": "Entering Firm",
      "8": "Locate Lending Firm",
      "9": "Fund Manager Client Id",
      "10": "Settlement Location",
      "11": "Order Origination Trader",
      "12": "Executing Trader",
      "13": "Order Origination Firm",
      "14": "Giveup Clearing Firm",
      "15": "Correspondant Clearing Firm",
      "16": "Executing System",
      "17": "Contra Firm",
      "18": "Contra Clearing Firm",
      "19": "Sponsoring Firm",
      "20": "Underlying Contra Firm",
      "21": "Clearing Organization",
      "22": "Exchange",
      "24": "Customer Account",
      "25": "Correspondent Clearing Organization",
      "26": "Correspondent Broker",
      "27": "Buyer Seller",
      "28": "Custodian",
      "29": "Intermediary",
      "30": "Agent",
      "31": "Sub Custodian",
      "32": "Beneficiary",
      "33": "Interested Party",
      "34": "Regulatory Body",
      "35": "Liquidity Provider",
      "36": "Entering Trader",
      "37": "Contra Trader",
      "38": "Position Account"
    }
  },
  "539": {
    "name": "NoNestedPartyIDs",
    "type": "NUMINGROUP"
  },
  "541": {
    "name": "MaturityDate",
    "type": "LOCALMKTDATE"
  },
  "542": {
    "name": "UnderlyingMaturityDate",
    "type": "LOCALMKTDATE"
  },
  "548": {
    "name": "CrossID",
    "type": "STRING"
  },
  "549": {
    "name": "CrossType",
    "type": "INT",
    "values": {
      "1": "Cross Aon",
      "2": "Cross Ioc",
      "3": "Cross One Side",
      "4": "Cross Same Price"
    }
  },
  "552": {
    "name": "NoSides",
    "type": "NUMINGROUP"
  },
  "554": {
    "name": "Password",
    "type": "STRING"
  },
  "555": {
    "name": "NoLegs",
    "type": "NUMINGROUP"
  },
  "556": {
    "name": "LegCurrency",
    "type": "CURRENCY"
  },
  "561": {
    "name": "RoundLot",
    "type": "QTY"
  },
  "562": {
    "name": "MinTradeVol",
    "type": "QTY"
  },
  "566": {
    "name": "LegPrice",
    "type": "PRICE"
  },
  "568": {
    "name": "TradeRequestID",
    "type": "STRING"
  },
  "569": {
    "name": "TradeRequestType",
    "type": "INT",
    "values": {
      "0": "All Trades",
      "1": "Matched Trades Matching Criteria Provided On Request",
      "2": "Unmatched Trades That Match Criteria",
      "3": "Unreported Trades That Match Criteria",
      "4": "Advisories That Match Criteria"
    }
  },
  "570": {
    "name": "PreviouslyReported",
    "type": "BOOLEAN",
    "values": {
      "N": "Not Reported To Counterparty",
      "Y": "Perviously Reported To Counterparty"
    }
  },
  "571": {
    "name": "TradeReportID",
    "type": "STRING"
  },
  "572": {
    "name": "TradeReportRefID",
    "type": "STRING"
  },
  "582": {
    "name": "CustOrderCapacity",
    "type": "INT",
    "values": {
      "1": "Member Trading For Their Own Account",
      "2": "Clearing Firm Trading For Its Proprietary Account",
      "3": "Member Trading For Another Member",
      "4": "All Other"
    }
  },
  "584": {
    "name": "MassStatusReqID",
    "type": "STRING"
  },
  "588": {
    "name": "LegSettlDate",
    "type": "LOCALMKTDATE"
  },
  "600": {
    "name": "LegSymbol",
    "type": "STRING"
  },
  "602": {
    "name": "LegSecurityID",
    "type": "STRING"
  },
  "603": {
    "name": "LegIDSource",
    "type": "STRING",
    "values": {
      "4": "Isin Number",
      "5": "Ric Code",
      "8": "Exchange Security Id",
      "91": "Exchange Ticker",
      "96": "Tt Security Id",
      "97": "Alias",
      "98": "Name",
      "X": "Series Key",
      "A": "Bloomberg Code",
      "S": "Openfigi Id",
      "H": "Clearing House"
    }
  },
  "604": {
    "name": "NoLegSecurityAltID",
    "type": "NUMINGROUP"
  },
  "605": {
    "name": "LegSecurityAltID",
    "type": "STRING"
  },
  "606": {
    "name": "LegSecurityAltIDSource",
    "type": "STRING",
    "values": {
      "1": "Cusip",
      "4": "Isin Number",
      "5": "Ric Code",
      "8": "Exchange Security Id",
      "91": "Exchange Ticker",
      "94": "Alt Symbol",
      "95": "Clearport",
      "97": "Alias",
      "98": "Name",
      "99": "Security Group",
      "A": "Bloomberg Code",
      "S": "Openfigi Id",
      "H": "Clearing House",
      "X": "Series Key"
    }
  },
  "607": {
    "name": "LegProduct",
    "type": "INT",
    "values": {
      "1": "Agency",
      "2": "Commodity",
      "3": "Corporate",
      "4": "Currency",
      "5": "Equity",
      "6": "Government",
      "7": "Index",
      "8": "Loan",
      "9": "Moneymarket",
      "10": "Mortgage",
      "11": "Municipal",
      "12": "Other",
      "13": "Financing",
      "14": "Energy"
    }
  },
  "608": {
    "name": "LegCFICode",
    "type": "STRING"
  },
  "609": {
    "name": "LegSecurityType",
    "type": "STRING",
    "values": {
      "FUT": "Future",
      "OPT": "Option",
      "MLEG": "Spread",
      "SPOT": "Spot",
      "TBOND": "Tbond",
      "CS": "Common Stock",
      "NONE": "None"
    }
  },
  "610": {
    "name": "LegMaturityMonthYear",
    "type": "MONTHYEAR"
  },
  "611": {
    "name": "LegMaturityDate",
    "type": "LOCALMKTDATE"
  },
  "612": {
    "name": "LegStrikePrice",
    "type": "PRICE"
  },
  "613": {
    "name": "LegOptAttribute",
    "type": "CHAR"
  },
  "616": {
    "name": "LegSecurityExchange",
    "type": "EXCHANGE"
  },
  "620": {
    "name": "LegSecurityDesc",
    "type": "STRING"
  },
  "623": {
    "name": "LegRatioQty",
    "type": "FLOAT"
  },
  "624": {
    "name": "LegSide",
    "type": "CHAR"
  },
  "625": {
    "name": "TradingSessionSubID",
    "type": "STRING",
    "values": {
      "1": "Pre Trading",
      "2": "Opening Or Opening Auction",
      "3": "Continuous",
      "4": "Closing Or Closing Auction",
      "5": "Post Trading",
      "6": "Intraday Auction",
      "7": "Quiescent"
    }
  },
  "626": {
    "name": "AllocType",
    "type": "INT",
    "values": {
      "1": "Calculated",
      "2": "Preliminary",
      "5": "Ready To Book",
      "7": "Warehouse Instruction",
      "8": "Request To Intermediary"
    }
  },
  "637": {
    "name": "LegLastPx",
    "type": "PRICE"
  },
  "654": {
    "name": "LegRefID",
    "type": "STRING"
  },
  "669": {
    "name": "LastParPx",
    "type": "PRICE"
  },
  "685": {
    "name": "LegOrderQty",
    "type": "QTY"
  },
  "687": {
    "name": "LegQty",
    "type": "QTY"
  },
  "711": {
    "name": "NoUnderlyings",
    "type": "NUMINGROUP"
  },
  "743": {
    "name": "DeliveryDate",
    "type": "LOCALMKTDATE"
  },
  "749": {
    "name": "TradeRequestResult",
    "type": "INT",
    "values": {
      "0": "Successful",
      "1": "Invalid Or Unknown Instrument",
      "2": "Invalid Type Requested",
      "3": "Invalid Parties",
      "4": "Invalid Transport Type Requested",
      "5": "Invalid Destination Requested",
      "8": "Trade Request Type Not Supported",
      "9": "Unauthorized For Trade Capture Report Request",
      "99": "Other"
    }
  },
  "750": {
    "name": "TradeRequestStatus",
    "type": "INT",
    "values": {
      "0": "Accepted",
      "1": "Completed",
      "2": "Rejected"
    }
  },
  "751": {
    "name": "TradeReportRejectReason",
    "type": "INT",
    "values": {
      "0": "Successful",
      "1": "Invalid Party Information",
      "2": "Unknown Instrument",
      "3": "Unauthorized To Report Trades",
      "4": "Invalid Trade Type",
      "99": "Other"
    }
  },
  "755": {
    "name": "AllocReportID",
    "type": "STRING"
  },
  "762": {
    "name": "SecuritySubType",
    "type": "STRING"
  },
  "763": {
    "name": "UnderlyingSecuritySubType",
    "type": "STRING"
  },
  "764": {
    "name": "LegSecuritySubType",
    "type": "STRING"
  },
  "779": {
    "name": "LastUpdateTime",
    "type": "UTCTIMESTAMP"
  },
  "789": {
    "name": "NextExpectedMsgSeqNum",
    "type": "SEQNUM"
  },
  "790": {
    "name": "OrdStatusReqID",
    "type": "STRING"
  },
  "794": {
    "name": "AllocReportType",
    "type": "INT",
    "values": {
      "3": "Sellside Calculated Using Preliminary",
      "4": "Sellside Calculated Without Preliminary",
      "5": "Warehouse Recap",
      "8": "Request To Intermediary"
    }
  },
  "799": {
    "name": "OrderAvgPx",
    "type": "PRICE"
  },
  "810": {
    "name": "UnderlyingPx",
    "type": "PRICE"
  },
  "811": {
    "name": "OptionDelta",
    "type": "FLOAT"
  },
  "818": {
    "name": "SecondaryTradeReportID",
    "type": "STRING"
  },
  "820": {
    "name": "TradeLinkID",
    "type": "STRING"
  },
  "828": {
    "name": "TrdType",
    "type": "INT",
    "values": {
      "0": "Regular Trade",
      "1": "Block Trade",
      "2": "Exchange For Physical",
      "3": "Transfer",
      "11": "Exchange For Risk",
      "12": "Exchange For Swap",
      "14": "Exchange Of Options For Options",
      "22": "Over The Counter Privately Negotiated Trades",
      "23": "Substitution Of Futures For Forwards",
      "45": "Option Exercise",
      "54": "Large Notional Off Facility Swap",
      "55": "Exchange Basis Facility",
      "57": "Netted Trade",
      "58": "Stp Block Swap Trade",
      "59": "Credit Event Trade",
      "60": "Succession Event Trade",
      "1000": "Volatility",
      "1001": "Efp Financial",
      "1002": "Efp Index Futures",
      "1003": "Strategy Block Trade",
      "1004": "Block Standard Cf",
      "1005": "Block Combination Cf",
      "1006": "Efs Efp Cf",
      "1007": "Block Internal Cf",
      "1008": "Portfolio Cf",
      "1009": "Correction Cf",
      "1010": "Block Combination Buyer Cf",
      "1011": "Block Combination Seller Cf",
      "1012": "Efs Efp Combination Cf",
      "1013": "Efs Efp Combination Buyer Cf",
      "1014": "Efs Efp Combination Seller Cf",
      "1015": "Otc Standard Cio",
      "1016": "Otc Combination Cio",
      "1017": "Otc Combination Buyer Cio",
      "1018": "Otc Combination Seller Cio",
      "1019": "Standard Trade Cd",
      "1020": "Standard Outside Spread Cd",
      "1021": "Combination Cd",
      "1022": "Old Cd",
      "1023": "Internal Cd",
      "1024": "Portfolio Cd",
      "1025": "Correction Cd",
      "1026": "Exchange Granted Fd",
      "1027": "Standard Outside Fd",
      "1028": "Off Hours Fd",
      "1029": "Block Fd",
      "1030": "Exch Granted Exceed Max Lot Fd",
      "1031": "Exch Granted Eml Off Hours Fd",
      "1032": "Exch Granted Late Fd",
      "1033": "Flex Contract Conversion Fd",
      "1034": "Ice Efrp",
      "1035": "Iceblk",
      "1036": "Basis",
      "1037": "Volatility Contingent",
      "1038": "Stock Contingent",
      "1039": "Ccx Efp",
      "1040": "Other Clearing Value",
      "1041": "N2ex",
      "1042": "Eex",
      "1043": "Efs Efp Contra",
      "1044": "Efm",
      "1045": "Ng Efp Efs",
      "1046": "Contra",
      "1047": "Cpblk",
      "1048": "Bilateral Off Exch",
      "1049": "Otc Privately Negotiated Trades",
      "1050": "Otc Large Notional Off Facility Swap",
      "1051": "Block Swap Trade",
      "1052": "Large In Scale",
      "1053": "Against Actual",
      "1054": "Large In Scale Package",
      "1055": "Guaranteed Cross",
      "1056": "Request For Cross",
      "1057": "Efp Cd",
      "1058": "B And S No Clearing Cd",
      "1059": "Buyer No Clearing Cd",
      "1060": "Seller No Clearing Cd",
      "1061": "Efp No Fee Cd",
      "1062": "Match Exch Manually Cd",
      "1063": "Match Exch Combination Cd",
      "1064": "Fut Ds Fut Combo Cd",
      "1065": "Block Nonfinancial Cp Cd",
      "1066": "Exch For Swap Options Cd",
      "1067": "Block Nonfinancial Cp Cf",
      "1068": "Exch For Swap Options Cf",
      "1069": "Asset Allocation",
      "1070": "Cross Contra Trade",
      "1071": "Committed",
      "1072": "Internal",
      "1073": "Interbank",
      "1074": "One Sided",
      "1075": "Cross",
      "1076": "Efp Bond",
      "1077": "Efp Spi Xjo",
      "1078": "Cash Related Trade",
      "1079": "Non Disclosed Otc Trade",
      "1080": "Disclosed Otc Trade",
      "1081": "Si Trade",
      "1082": "Eurex Enlight Triggered Trade",
      "1083": "Efp Against Actual",
      "1084": "Efr",
      "1085": "Eoo",
      "1086": "Tam",
      "1087": "Efs",
      "1088": "Lp",
      "9999": "Unknown"
    }
  },
  "829": {
    "name": "TrdSubType",
    "type": "INT",
    "values": {
      "1": "Trade Purpose Arbitrage",
      "2": "Trade Purpose Combination",
      "3": "Trade Purpose Cross Trade",
      "4": "Trade Purpose Exchange For Physical",
      "5": "Trade Purpose Position Consolidation",
      "6": "Trade Purpose Rollover",
      "7": "Trade Purpose Other",
      "8": "Trade Purpose Implied Spread Leg Executed Against An Outright",
      "36": "Trade Purpose Converted Swap",
      "37": "Trade Purpose Crossed Trade",
      "40": "Trade Purpose Traded At Settlement",
      "42": "Trade Purpose Auction Trade",
      "43": "Trade Purpose Traded At Marker",
      "48": "Trade Purpose Multilateral Compression",
      "200": "Trade Purpose Delivery Transfer"
    }
  },
  "851": {
    "name": "LastLiquidityIndicator",
    "type": "INT",
    "values": {
      "1": "Added Liquidity",
      "2": "Removed Liquidity"
    }
  },
  "856": {
    "name": "TradeReportType",
    "type": "INT",
    "values": {
      "0": "Submit",
      "1": "Alleged",
      "2": "Accept",
      "3": "Decline",
      "5": "No Was",
      "6": "Cancel",
      "11": "Alleged New",
      "13": "Alleged No Was",
      "101": "Notification",
      "102": "Waiting For Cancel Approval",
      "103": "Partially Filled",
      "999": "Unknown",
      "1000": "Clearing"
    }
  },
  "857": {
    "name": "AllocNoOrdersType",
    "type": "INT",
    "values": {
      "0": "Not Specified",
      "1": "Explicit List Provided"
    }
  },
  "860": {
    "name": "AvgParPx",
    "type": "PRICE"
  },
  "864": {
    "name": "NoEvents",
    "type": "NUMINGROUP"
  },
  "865": {
    "name": "EventType",
    "type": "INT",
    "values": {
      "5": "Expiry Date",
      "6": "Last Trading Date",
      "8": "Swap Start Date",
      "9": "Swap End Date",
      "13": "First Delivery Date",
      "14": "Last Delivery Date",
      "101": "First Trading Date",
      "102": "Sdat First Trading Date"
    }
  },
  "866": {
    "name": "EventDate",
    "type": "LOCALMKTDATE"
  },
  "870": {
    "name": "NoInstrumentExtensions",
    "type": "NUMINGROUP"
  },
  "871": {
    "name": "InstrumentAttributeType",
    "type": "INT",
    "values": {
      "5": "Variable Rate",
      "100": "Coupon Rate",
      "101": "Offset To Variable Coupon Rate",
      "102": "Swap Customer 1",
      "103": "Swap Customer 2",
      "104": "Cash Basket Reference"
    }
  },
  "872": {
    "name": "InstrumentAttributeValue",
    "type": "STRING"
  },
  "879": {
    "name": "UnderlyingQty",
    "type": "QTY"
  },
  "880": {
    "name": "TrdMatchID",
    "type": "STRING"
  },
  "887": {
    "name": "NoUnderlyingStipulations",
    "type": "NUMINGROUP"
  },
  "888": {
    "name": "UnderlyingStipulationType",
    "type": "INT",
    "values": {
      "1": "Payfreq"
    }
  },
  "889": {
    "name": "UnderlyingStipulationValue",
    "type": "STRING",
    "values": {
      "12": "Monthly",
      "01": "Annually",
      "02": "Semi Annually",
      "04": "Quarterly"
    }
  },
  "912": {
    "name": "LastRptRequested",
    "type": "BOOLEAN"
  },
  "916": {
    "name": "StartDate",
    "type": "UTCTIMESTAMP"
  },
  "917": {
    "name": "EndDate",
    "type": "UTCTIMESTAMP"
  },
  "939": {
    "name": "TrdRptStatus",
    "type": "INT",
    "values": {
      "0": "Accepted",
      "1": "Rejected",
      "3": "Accepted With Errors",
      "99": "Unknown"
    }
  },
  "957": {
    "name": "NoStrategyParameters",
    "type": "NUMINGROUP"
  },
  "958": {
    "name": "StrategyParameterName",
    "type": "STRING"
  },
  "959": {
    "name": "StrategyParameterType",
    "type": "INT",
    "values": {
      "1": "Int",
      "6": "Float",
      "7": "Qty",
      "8": "Price",
      "13": "Boolean",
      "14": "String",
      "19": "Utctimestamp"
    }
  },
  "960": {
    "name": "StrategyParameterValue",
    "type": "STRING"
  },
  "961": {
    "name": "HostCrossID",
    "type": "STRING"
  },
  "1003": {
    "name": "TradeID",
    "type": "STRING"
  },
  "1028": {
    "name": "ManualOrderIndicator",
    "type": "BOOLEAN",
    "values": {
      "N": "Electronic",
      "Y": "Manual"
    }
  },
  "1031": {
    "name": "CustOrderHandlingInst",
    "type": "CHAR",
    "values": {
      "W": "Desk",
      "Y": "Electronic",
      "C": "Vendor Platform Billed By Executing Broker",
      "G": "Sponsored Access Via Api Or Fix By Executing Broker",
      "H": "Premium Algo Trading Provider Billed By Executing Broker",
      "D": "Other"
    }
  },
  "1047": {
    "name": "AllocPositionEffect",
    "type": "CHAR",
    "values": {
      "O": "Open",
      "C": "Close",
      "R": "Rolled",
      "F": "Fifo",
      "N": "Close But Notify On Open",
      "D": "Default"
    }
  },
  "1057": {
    "name": "AggressorIndicator",
    "type": "BOOLEAN",
    "values": {
      "N": "No",
      "Y": "Yes"
    }
  },
  "1071": {
    "name": "LastSwapPoints",
    "type": "PRICEOFFSET"
  },
  "1088": {
    "name": "RefreshQty",
    "type": "QTY"
  },
  "1116": {
    "name": "NoRootPartyIDs",
    "type": "NUMINGROUP"
  },
  "1117": {
    "name": "RootPartyID",
    "type": "STRING"
  },
  "1118": {
    "name": "RootPartyIDSource",
    "type": "CHAR",
    "values": {
      "F": "Settlement Entity Location"
    }
  },
  "1119": {
    "name": "RootPartyRole",
    "type": "INT",
    "values": {
      "10": "Settlement Location"
    }
  },
  "1123": {
    "name": "TradeHandlingInstr",
    "type": "CHAR",
    "values": {
      "0": "Trade Confirmation",
      "1": "Two Party Report",
      "2": "One Party Report For Matching",
      "3": "One Party Report For Pass Through",
      "4": "Automated Floor Order Routing",
      "7": "Third Party Report For Pass Through",
      "8": "Trade Handling Instr Pending Trade Report",
      "9": "Trade Handling Instr Completed Trade Report",
      "A": "Trade Handling Instr Expired Trade Report",
      "B": "Trade Handling Instr Broadcast",
      "C": "Trade Handling Instr Pending Approval",
      "D": "Trade Handling Instr Approved",
      "E": "Trade Handling Instr Pending Cancel"
    }
  },
  "1125": {
    "name": "OrigTradeDate",
    "type": "LOCALMKTDATE"
  },
  "1126": {
    "name": "OrigTradeID",
    "type": "STRING"
  },
  "1138": {
    "name": "DisplayQty",
    "type": "QTY"
  },
  "1145": {
    "name": "EventTime",
    "type": "UTCTIMESTAMP"
  },
  "1152": {
    "name": "LegNumber",
    "type": "INT"
  },
  "1188": {
    "name": "Volatility",
    "type": "STRING"
  },
  "1189": {
    "name": "ExpirationTimeValue",
    "type": "FLOAT"
  },
  "1190": {
    "name": "RiskFreeRate",
    "type": "PRICE"
  },
  "1194": {
    "name": "ExerciseStyle",
    "type": "INT"
  },
  "1227": {
    "name": "ProductComplex",
    "type": "STRING"
  },
  "1358": {
    "name": "LegPutOrCall",
    "type": "INT"
  },
  "1362": {
    "name": "NoFills",
    "type": "NUMINGROUP"
  },
  "1363": {
    "name": "FillExecID",
    "type": "STRING"
  },
  "1364": {
    "name": "FillPx",
    "type": "PRICE"
  },
  "1365": {
    "name": "FillQty",
    "type": "QTY"
  },
  "1366": {
    "name": "LegAllocID",
    "type": "STRING"
  },
  "1385": {
    "name": "ContingencyType",
    "type": "INT",
    "values": {
      "1": "One Cancels The Other",
      "2": "One Triggers The Other",
      "3": "One Updates The Other 3",
      "4": "One Updates The Other 4"
    }
  },
  "1390": {
    "name": "TradePublishIndicator",
    "type": "INT",
    "values": {
      "0": "Do Not Publish Trade",
      "1": "Publish Trade",
      "2": "Deferred Publication"
    }
  },
  "1418": {
    "name": "LegLastQty",
    "type": "QTY"
  },
  "1420": {
    "name": "LegExerciseStyle",
    "type": "INT"
  },
  "1461": {
    "name": "NoTargetPartyIDs",
    "type": "NUMINGROUP"
  },
  "1462": {
    "name": "TargetPartyExchangeTraderID",
    "type": "STRING"
  },
  "1622": {
    "name": "FillYieldType",
    "type": "STRING"
  },
  "1724": {
    "name": "OrderOrigination",
    "type": "INT",
    "values": {
      "1": "Order Received From Customer",
      "2": "Order Received From Within Firm",
      "3": "Order Received From Another Broker Dealer",
      "4": "Order Received From Customer Or Originated Within Firm",
      "5": "Order Received From Direct Or Sponsored Access Customer",
      "99": "Order Received From Other Non Dea"
    }
  },
  "1795": {
    "name": "NoOrderEvents",
    "type": "NUMINGROUP"
  },
  "1796": {
    "name": "OrderEventType",
    "type": "INT",
    "values": {
      "1": "Added",
      "2": "Modified",
      "3": "Deleted",
      "4": "Partially Filled",
      "5": "Filled",
      "6": "Suspended",
      "7": "Released",
      "8": "Restated",
      "9": "Locked",
      "10": "Triggered",
      "11": "Activated"
    }
  },
  "1797": {
    "name": "OrderEventExecID",
    "type": "STRING"
  },
  "1798": {
    "name": "OrderEventReason",
    "type": "INT",
    "values": {
      "1": "Add Order Request",
      "2": "Modify Order Request",
      "3": "Delete Order Request",
      "4": "Order Entered Out Of Band",
      "5": "Order Modified Out Of Band",
      "6": "Order Deleted Out Of Band",
      "7": "Order Activated Or Triggered",
      "8": "Order Expired",
      "9": "Reserve Order Refreshed",
      "10": "Away Market Better",
      "11": "Corporate Action",
      "12": "Start Of Day",
      "13": "End Of Day",
      "100": "Binary Trade Reporting"
    }
  },
  "1799": {
    "name": "OrderEventPx",
    "type": "PRICE"
  },
  "1800": {
    "name": "OrderEventQty",
    "type": "QTY"
  },
  "1801": {
    "name": "OrderEventLiquidityIndicator",
    "type": "INT",
    "values": {
      "0": "Neither Added Nor Removed Liquidity",
      "1": "Added Liquidity",
      "2": "Removed Liquidity",
      "3": "Liquidity Routed Out",
      "4": "Auction Execution",
      "5": "Triggered Stop Order",
      "6": "Triggered Contingency Order",
      "7": "Triggered Market Order",
      "8": "Removed Liquidity After Firm Order Commitment",
      "9": "Auction Execution After Firm Order Commitment",
      "10": "Unknown",
      "11": "Other"
    }
  },
  "1802": {
    "name": "OrderEventText",
    "type": "STRING"
  },
  "1856": {
    "name": "RelatedTradeID",
    "type": "STRING"
  },
  "1860": {
    "name": "RelatedTradeQty",
    "type": "QTY"
  },
  "2376": {
    "name": "PartyRoleQualifier",
    "type": "INT",
    "values": {
      "22": "Algorithm",
      "23": "Firm Or Legal Entity",
      "24": "Natural Person"
    }
  },
  "2404": {
    "name": "ComplianceText",
    "type": "STRING"
  },
  "2446": {
    "name": "AggressorSide",
    "type": "INT",
    "values": {
      "0": "No Aggressor",
      "1": "Buy",
      "2": "Sell"
    }
  },
  "2593": {
    "name": "NoOrderAttributes",
    "type": "INT"
  },
  "2594": {
    "name": "OrderAttributeType",
    "type": "INT",
    "values": {
      "0": "Aggregated Order",
      "1": "Pending Allocation",
      "2": "Liquidity Provision Activity Order",
      "3": "Risk Reduction Order",
      "4": "Algorithmic Order",
      "5": "Systematic Internalizer Order"
    }
  },
  "2595": {
    "name": "OrderAttributeValue",
    "type": "STRING"
  },
  "5024": {
    "name": "StartSequenceNumber",
    "type": "SEQNUM"
  },
  "7111": {
    "name": "AllocStrategy",
    "type": "STRING"
  },
  "7928": {
    "name": "SelfMatchPreventionID",
    "type": "STRING"
  },
  "8000": {
    "name": "SMPInstruction",
    "type": "CHAR",
    "values": {
      "O": "Smp Inst Type Cancel Resting",
      "N": "Smp Inst Type Cancel Aggressor",
      "B": "Smp Inst Type Cancel Both",
      "M": "Smp Inst Type Match",
      "m": "Smp Inst Type Not Match",
      "S": "Smp Inst Type Smallest",
      "D": "Smp Inst Type Decrement Larger",
      "d": "Smp Inst Type Decrement Leaves Qty",
      "e": "Smp Inst Type Market Wide",
      "f": "Smp Inst Type Market Wide Cancel Aggressor",
      "g": "Smp Inst Type Market Wide Cancel Resting",
      "h": "Smp Inst Type Market Wide Decrement Leaves Qty"
    }
  },
  "8013": {
    "name": "TrdRegPublicationReason",
    "type": "INT",
    "values": {
      "4": "Ilqd",
      "5": "Size",
      "6": "Lrgs"
    }
  },
  "8016": {
    "name": "TradingVenueRegulatoryTradeID",
    "type": "STRING"
  },
  "9012": {
    "name": "IsFirm",
    "type": "INT",
    "values": {
      "1": "Firm",
      "2": "Last Look"
    }
  },
  "9020": {
    "name": "FixingDate",
    "type": "LOCALMKTDATE"
  },
  "9021": {
    "name": "FixingSource",
    "type": "STRING"
  },
  "9032": {
    "name": "ReportingParty",
    "type": "BOOLEAN"
  },
  "9103": {
    "name": "MaxParticipation",
    "type": "FLOAT"
  },
  "9106": {
    "name": "IWouldPrice",
    "type": "FLOAT"
  },
  "9111": {
    "name": "Aggression",
    "type": "INT"
  },
  "9112": {
    "name": "TiltMode",
    "type": "INT"
  },
  "9115": {
    "name": "BriskLimitMode",
    "type": "INT"
  },
  "9117": {
    "name": "BlockLimit",
    "type": "INT"
  },
  "9120": {
    "name": "LiquidityIndicator",
    "type": "CHAR",
    "values": {
      "A": "Added Liquidity",
      "R": "Removed Liquidity"
    }
  },
  "9121": {
    "name": "MemoFieldICE",
    "type": "STRING"
  },
  "9139": {
    "name": "OriginatorUserID",
    "type": "STRING"
  },
  "9145": {
    "name": "Tracking",
    "type": "INT"
  },
  "9147": {
    "name": "MinParticipation",
    "type": "FLOAT"
  },
  "9190": {
    "name": "IfTouchedPrice",
    "type": "FLOAT"
  },
  "9191": {
    "name": "PostTriggerDuration",
    "type": "INT"
  },
  "9200": {
    "name": "SubStrategy",
    "type": "STRING"
  },
  "9202": {
    "name": "DurationRCM",
    "type": "INT"
  },
  "9203": {
    "name": "EndTimeOverride",
    "type": "INT",
    "values": {
      "0": "None",
      "1": "Last Session Close",
      "2": "Next Session Close",
      "3": "Settlement"
    }
  },
  "9207": {
    "name": "CustomerAccountRefID",
    "type": "STRING"
  },
  "9210": {
    "name": "MaxShowRCM",
    "type": "INT"
  },
  "9211": {
    "name": "MinShow",
    "type": "INT"
  },
  "9212": {
    "name": "PassivePriceLevel",
    "type": "INT"
  },
  "9213": {
    "name": "NumPostLevels",
    "type": "INT"
  },
  "9214": {
    "name": "AverageDelay",
    "type": "FLOAT"
  },
  "9215": {
    "name": "IWouldQty",
    "type": "INT"
  },
  "9216": {
    "name": "IWouldQtyPct",
    "type": "FLOAT"
  },
  "9217": {
    "name": "WithATickQty",
    "type": "INT"
  },
  "9218": {
    "name": "WithATickQtyPct",
    "type": "FLOAT"
  },
  "9219": {
    "name": "CleanupPct",
    "type": "FLOAT"
  },
  "9220": {
    "name": "PostTicksApart",
    "type": "INT"
  },
  "9221": {
    "name": "MaxSpreadCrossTicks",
    "type": "INT"
  },
  "9222": {
    "name": "TacticalPeg",
    "type": "BOOLEAN"
  },
  "9225": {
    "name": "IWouldQtyVariancePct",
    "type": "FLOAT"
  },
  "9302": {
    "name": "DynamicEndTime",
    "type": "BOOLEAN"
  },
  "9700": {
    "name": "DirectElectronicAccess",
    "type": "INT",
    "values": {
      "0": "No",
      "1": "Yes"
    }
  },
  "9701": {
    "name": "TradingCapacity",
    "type": "INT",
    "values": {
      "0": "Deal",
      "1": "Mtch",
      "2": "Aotc"
    }
  },
  "9702": {
    "name": "LiquidityProvision",
    "type": "INT",
    "values": {
      "0": "No",
      "1": "Yes"
    }
  },
  "9703": {
    "name": "OriginalSecondaryExecID",
    "type": "STRING"
  },
  "9704": {
    "name": "InvestmentDecision",
    "type": "INT"
  },
  "9705": {
    "name": "ExecutionDecision",
    "type": "INT"
  },
  "9706": {
    "name": "ClientIDCode",
    "type": "INT"
  },
  "9707": {
    "name": "MiFIDID",
    "type": "STRING"
  },
  "9717": {
    "name": "CorrelationClOrdID",
    "type": "STRING"
  },
  "9787": {
    "name": "DisplayFactor",
    "type": "STRING"
  },
  "9821": {
    "name": "SelfMatchPreventionIDICE",
    "type": "STRING"
  },
  "9822": {
    "name": "SelfMatchPreventionInstruction",
    "type": "CHAR"
  },
  "9991": {
    "name": "LegRiskAversion",
    "type": "INT"
  },
  "9992": {
    "name": "HedgeDiscretionTicks",
    "type": "INT"
  },
  "10010": {
    "name": "DisplayFactorQty",
    "type": "STRING"
  },
  "10011": {
    "name": "TTClOrdID",
    "type": "STRING"
  },
  "10553": {
    "name": "TTID",
    "type": "STRING"
  },
  "10555": {
    "name": "NoTCRLegs",
    "type": "NUMINGROUP"
  },
  "16000": {
    "name": "Timezone",
    "type": "STRING"
  },
  "16052": {
    "name": "ExchangeSendingTime",
    "type": "STRING"
  },
  "16060": {
    "name": "ExchangeTransactTime",
    "type": "STRING"
  },
  "16106": {
    "name": "StagedOrderMsg",
    "type": "STRING"
  },
  "16109": {
    "name": "StagedOrderStatus",
    "type": "CHAR",
    "values": {
      "A": "Available",
      "O": "Owned"
    }
  },
  "16110": {
    "name": "StagedOrderOwner",
    "type": "STRING"
  },
  "16112": {
    "name": "NoLinks",
    "type": "INT"
  },
  "16113": {
    "name": "LinkID",
    "type": "STRING"
  },
  "16114": {
    "name": "LinkType",
    "type": "CHAR",
    "values": {
      "7": "Staged Child",
      "8": "Staged Bulked Child",
      "9": "Staged Stiched Child",
      "P": "Parent Order Id",
      "X": "Position Transfer Id",
      "A": "Staged Split Child",
      "E": "Unique Exec Id Allocated From",
      "R": "Root Algo Order Id",
      "F": "Parent Account Id"
    }
  },
  "16115": {
    "name": "ExternalSource",
    "type": "BOOLEAN"
  },
  "16116": {
    "name": "OrderIDGUID",
    "type": "STRING"
  },
  "16117": {
    "name": "OrderSource",
    "type": "INT",
    "values": {
      "0": "Source Ase",
      "2": "Source Ntw",
      "3": "Source Invalid",
      "4": "Source T Trader",
      "6": "Source Mobile",
      "7": "Source Roe",
      "9": "Source External",
      "10": "Source Fix Adapter",
      "11": "Source Aggregator",
      "12": "Source Bouncer",
      "13": "Source Lambda Liquidator",
      "14": "Source External Fix Adapter",
      "15": "Source Prime Ase",
      "16": "Source Nimbus",
      "17": "Source Adl",
      "18": "Source Ttsdk",
      "19": "Source Tt Algo",
      "20": "Source Adl Prime",
      "21": "Source Ttsdk Prime",
      "22": "Source Tt Algo Prime",
      "23": "Source Chart",
      "24": "Source Ttd",
      "25": "Source Ttd Chart",
      "26": "Source Ttint",
      "27": "Source Tt Admin",
      "28": "Source Dotnet Api Clt",
      "29": "Source Dotnet Api Srv",
      "30": "Source Cpp Api",
      "31": "Source Options Risk",
      "32": "Source External Upload",
      "33": "Source Stager",
      "34": "Source Score",
      "35": "Source Fix Adapter Child Router",
      "36": "Source Pot Child Router",
      "37": "Source Terminator"
    }
  },
  "16118": {
    "name": "FillTradingVenueRegulatoryTradeID",
    "type": "STRING"
  },
  "16119": {
    "name": "FillLastLiquidityIndicator",
    "type": "INT",
    "values": {
      "1": "Added Liquidity",
      "2": "Removed Liquidity"
    }
  },
  "16120": {
    "name": "LegNoFills",
    "type": "NUMINGROUP"
  },
  "16121": {
    "name": "LegFillExecID",
    "type": "STRING"
  },
  "16122": {
    "name": "LegFillPx",
    "type": "PRICE"
  },
  "16123": {
    "name": "LegFillQty",
    "type": "QTY"
  },
  "16124": {
    "name": "LegFillTradingVenueRegulatoryTradeID",
    "type": "STRING"
  },
  "16125": {
    "name": "LegFillLastLiquidityIndicator",
    "type": "INT",
    "values": {
      "1": "Added Liquidity",
      "2": "Removed Liquidity"
    }
  },
  "16130": {
    "name": "IntentToCross",
    "type": "BOOLEAN"
  },
  "16131": {
    "name": "RejectSource",
    "type": "INT",
    "values": {
      "1": "Reject Source Edge",
      "2": "Reject Source Risk",
      "3": "Reject Source Gateway",
      "4": "Reject Source Exchange",
      "5": "Reject Source Algo",
      "6": "Reject Source Ase",
      "7": "Reject Source Ttint",
      "8": "Reject Source External",
      "9": "Reject Source Ttapi",
      "10": "Reject Source Client App",
      "11": "Reject Source Fix Adapter",
      "12": "Reject Source Stager",
      "13": "Reject Source Options Risk"
    }
  },
  "16207": {
    "name": "BloombergSecurityExchange",
    "type": "STRING"
  },
  "16451": {
    "name": "PriceDisplayType",
    "type": "INT"
  },
  "16456": {
    "name": "NumTickTblEntries",
    "type": "INT"
  },
  "16457": {
    "name": "NumTicks",
    "type": "INT"
  },
  "16458": {
    "name": "MaxPrice",
    "type": "PRICE"
  },
  "16460": {
    "name": "MinLotSize",
    "type": "INT"
  },
  "16463": {
    "name": "NumberOfBlocks",
    "type": "INT"
  },
  "16464": {
    "name": "TradesInFlow",
    "type": "CHAR"
  },
  "16552": {
    "name": "ExchTickSize",
    "type": "FLOAT"
  },
  "16554": {
    "name": "ExchPointValue",
    "type": "FLOAT"
  },
  "16556": {
    "name": "TextA",
    "type": "STRING"
  },
  "16557": {
    "name": "TextB",
    "type": "STRING"
  },
  "16558": {
    "name": "TextTT",
    "type": "STRING"
  },
  "16559": {
    "name": "TextC",
    "type": "STRING"
  },
  "16561": {
    "name": "TimeReceivedFromExchange",
    "type": "UTCTIMESTAMP"
  },
  "16566": {
    "name": "DropCopyOrder",
    "type": "BOOLEAN",
    "values": {
      "Y": "Yes",
      "N": "No"
    }
  },
  "16567": {
    "name": "ByPassSessionRecovery",
    "type": "BOOLEAN"
  },
  "16568": {
    "name": "LegAvgPx",
    "type": "PRICE"
  },
  "16601": {
    "name": "EchoDC_01",
    "type": "STRING"
  },
  "16602": {
    "name": "EchoDC_02",
    "type": "STRING"
  },
  "16603": {
    "name": "EchoDC_03",
    "type": "STRING"
  },
  "16604": {
    "name": "EchoDC_04",
    "type": "STRING"
  },
  "16605": {
    "name": "EchoDC_05",
    "type": "STRING"
  },
  "16606": {
    "name": "EchoDC_06",
    "type": "STRING"
  },
  "16607": {
    "name": "EchoDC_07",
    "type": "STRING"
  },
  "16608": {
    "name": "EchoDC_08",
    "type": "STRING"
  },
  "16609": {
    "name": "EchoDC_09",
    "type": "STRING"
  },
  "16610": {
    "name": "EchoDC_10",
    "type": "STRING"
  },
  "16611": {
    "name": "MlegHeadExecId",
    "type": "STRING"
  },
  "16612": {
    "name": "UniqueExecID",
    "type": "STRING"
  },
  "16615": {
    "name": "LegTTRoutingAccount",
    "type": "STRING"
  },
  "16616": {
    "name": "LegBloombergSecurityExchange",
    "type": "STRING"
  },
  "16623": {
    "name": "SpreadLegRatioQty",
    "type": "FLOAT"
  },
  "16624": {
    "name": "AccountRiskGroup",
    "type": "STRING"
  },
  "16625": {
    "name": "TextTTModifyingUser",
    "type": "STRING"
  },
  "16626": {
    "name": "NVDR",
    "type": "BOOLEAN",
    "values": {
      "Y": "Yes",
      "N": "No"
    }
  },
  "16627": {
    "name": "TTF",
    "type": "BOOLEAN",
    "values": {
      "Y": "Yes",
      "N": "No"
    }
  },
  "16628": {
    "name": "TFUserType",
    "type": "CHAR",
    "values": {
      "T": "Traditional Trading",
      "P": "Program Trading",
      "M": "Market Making",
      "G": "Market Making With Program Trading"
    }
  },
  "16631": {
    "name": "EchoDC_11",
    "type": "STRING"
  },
  "16632": {
    "name": "EchoDC_12",
    "type": "STRING"
  },
  "16633": {
    "name": "EchoDC_13",
    "type": "STRING"
  },
  "16634": {
    "name": "EchoDC_14",
    "type": "STRING"
  },
  "16635": {
    "name": "EchoDC_15",
    "type": "STRING"
  },
  "16636": {
    "name": "EchoDC_16",
    "type": "STRING"
  },
  "16637": {
    "name": "EchoDC_17",
    "type": "STRING"
  },
  "16638": {
    "name": "EchoDC_18",
    "type": "STRING"
  },
  "16639": {
    "name": "EchoDC_19",
    "type": "STRING"
  },
  "16640": {
    "name": "EchoDC_20",
    "type": "STRING"
  },
  "16700": {
    "name": "PriceFormula",
    "type": "STRING"
  },
  "16701": {
    "name": "ReloadOffset",
    "type": "INT"
  },
  "16702": {
    "name": "OverrideTickNumerator",
    "type": "INT"
  },
  "16703": {
    "name": "FormulaBasedOn",
    "type": "STRING",
    "values": {
      "price_diff": "Price Diff",
      "ratio": "Ratio",
      "net_change": "Net Change",
      "custom": "Custom"
    }
  },
  "16704": {
    "name": "ReloadDelay",
    "type": "INT"
  },
  "16705": {
    "name": "DisclosedQty",
    "type": "QTY"
  },
  "16706": {
    "name": "Reload",
    "type": "BOOLEAN"
  },
  "16707": {
    "name": "OverrideTickSize",
    "type": "BOOLEAN"
  },
  "16708": {
    "name": "OverrideTickDenominator",
    "type": "INT"
  },
  "16728": {
    "name": "TotalNumOrders",
    "type": "INT"
  },
  "16751": {
    "name": "Multiplier",
    "type": "FLOAT"
  },
  "16752": {
    "name": "IsHedging",
    "type": "BOOLEAN"
  },
  "16753": {
    "name": "QueueHolder",
    "type": "QTY"
  },
  "16754": {
    "name": "MLQ",
    "type": "STRING"
  },
  "16755": {
    "name": "PayupTicks",
    "type": "INT"
  },
  "16756": {
    "name": "IsQuoting",
    "type": "BOOLEAN"
  },
  "16757": {
    "name": "ConvertQuoteToHedge",
    "type": "INT",
    "values": {
      "1": "Attempt",
      "2": "Always",
      "3": "Always Preserve Queue"
    }
  },
  "16758": {
    "name": "IsLeanIndicative",
    "type": "BOOLEAN"
  },
  "16759": {
    "name": "IsShared",
    "type": "BOOLEAN"
  },
  "16760": {
    "name": "LegRatioExt",
    "type": "INT"
  },
  "16761": {
    "name": "InsertTime",
    "type": "UTCTIMESTAMP"
  },
  "16762": {
    "name": "DefSecuritySubTypeID",
    "type": "INT"
  },
  "16847": {
    "name": "TargetStrategyName",
    "type": "STRING"
  },
  "16848": {
    "name": "TargetStrategyType",
    "type": "INT",
    "values": {
      "0": "Adl",
      "1": "Sse",
      "3": "Bank Algo",
      "12": "Core Sdk"
    }
  },
  "16849": {
    "name": "SideTextA",
    "type": "STRING"
  },
  "16850": {
    "name": "SideTextB",
    "type": "STRING"
  },
  "16851": {
    "name": "SideTextC",
    "type": "STRING"
  },
  "16852": {
    "name": "ParentVendorOrderID",
    "type": "STRING"
  },
  "16853": {
    "name": "ParentVendorUserID",
    "type": "STRING"
  },
  "16854": {
    "name": "ParentVendorAccountID",
    "type": "STRING"
  },
  "16855": {
    "name": "ParentVendorBrokerID",
    "type": "STRING"
  },
  "16856": {
    "name": "ParentVendorProfileID",
    "type": "STRING"
  },
  "16857": {
    "name": "TTSMPID",
    "type": "STRING"
  },
  "16858": {
    "name": "TTSMPInstruction",
    "type": "INT",
    "values": {
      "1": "Tt Smp Inst Reject New",
      "3": "Tt Smp Inst Cancel Resting",
      "4": "Tt Smp Inst Internalization",
      "6": "Tt Smp Inst Internalize Best",
      "10": "Tt Smp Inst Internalize Allow Split",
      "11": "Tt Smp Inst Internalize Best Allow Split"
    }
  },
  "16859": {
    "name": "QuoteAckStatus",
    "type": "INT",
    "values": {
      "0": "Quote Request Status Ok",
      "5": "Quote Request Status Rejected"
    }
  },
  "16860": {
    "name": "ParentVendorAlgoID",
    "type": "STRING"
  },
  "16861": {
    "name": "ParentVendorAlgoType",
    "type": "STRING"
  },
  "16874": {
    "name": "LegParentVendorAccountID",
    "type": "STRING"
  },
  "16875": {
    "name": "NewsReportID",
    "type": "STRING"
  },
  "16901": {
    "name": "BracketOrderType",
    "type": "INT",
    "values": {
      "0": "Limit",
      "1": "Stop Limit",
      "2": "Stop Market"
    }
  },
  "16902": {
    "name": "BracketStopLimitOffset",
    "type": "INT"
  },
  "16903": {
    "name": "ChildTIF",
    "type": "CHAR",
    "values": {
      "0": "Day",
      "1": "Good Till Cancel",
      "2": "At The Opening",
      "3": "Immediate Or Cancel",
      "4": "Fill Or Kill",
      "5": "Good Till Crossing",
      "6": "Good Till Date",
      "7": "At The Close",
      "8": "Good Through Crossing",
      "9": "At Crossing",
      "A": "Auction",
      "V": "Good In Session",
      "W": "Day Plus",
      "X": "Good Till Cancel Plus",
      "Y": "Good Till Date Plus"
    }
  },
  "16904": {
    "name": "DiscVal",
    "type": "INT"
  },
  "16905": {
    "name": "DiscValType",
    "type": "INT"
  },
  "16906": {
    "name": "ETimeAct",
    "type": "INT",
    "values": {
      "1": "Cancel",
      "2": "Gotomarket"
    }
  },
  "16907": {
    "name": "Interval",
    "type": "INT"
  },
  "16908": {
    "name": "IsTrlTrg",
    "type": "STRING"
  },
  "16909": {
    "name": "LeftoverAction",
    "type": "INT",
    "values": {
      "0": "Leave",
      "1": "Payup",
      "2": "Merge",
      "3": "Gotomarket"
    }
  },
  "16910": {
    "name": "LeftoverTicks",
    "type": "INT"
  },
  "16911": {
    "name": "LimitPriceType",
    "type": "INT"
  },
  "16912": {
    "name": "LimitTicksAway",
    "type": "INT"
  },
  "16913": {
    "name": "OcoStopTriggerPrice",
    "type": "PRICE"
  },
  "16914": {
    "name": "ProfitTarget",
    "type": "INT"
  },
  "16915": {
    "name": "StopLimitOffset",
    "type": "INT"
  },
  "16916": {
    "name": "StopOrderType",
    "type": "INT",
    "values": {
      "1": "Limit",
      "2": "Market",
      "3": "Tt Stop"
    }
  },
  "16917": {
    "name": "StopTarget",
    "type": "INT"
  },
  "16918": {
    "name": "TriggerPriceType",
    "type": "INT",
    "values": {
      "1": "Bid",
      "2": "Ask",
      "3": "Ltp",
      "6": "Sameside",
      "7": "Oppositeside"
    }
  },
  "16919": {
    "name": "TriggerTicksAway",
    "type": "INT"
  },
  "16920": {
    "name": "TriggerType",
    "type": "INT",
    "values": {
      "1": "Stop",
      "2": "It"
    }
  },
  "16921": {
    "name": "WithATickType",
    "type": "INT",
    "values": {
      "1": "Qty",
      "2": "Percent"
    }
  },
  "16922": {
    "name": "WithATick",
    "type": "INT"
  },
  "16923": {
    "name": "TriggerQtyType",
    "type": "INT",
    "values": {
      "1": "Qty",
      "2": "Percent"
    }
  },
  "16924": {
    "name": "TriggerQtyCompare",
    "type": "INT",
    "values": {
      "3": "Lte",
      "5": "Gte"
    }
  },
  "16925": {
    "name": "TriggerQty",
    "type": "INT"
  },
  "16926": {
    "name": "TriggerLTPReset",
    "type": "BOOLEAN"
  },
  "16927": {
    "name": "TTStopLimitPriceType",
    "type": "INT",
    "values": {
      "1": "Bid",
      "2": "Ask",
      "3": "Ltp"
    }
  },
  "16928": {
    "name": "TTStopWithATickType",
    "type": "INT",
    "values": {
      "1": "Qty",
      "2": "Percent"
    }
  },
  "16929": {
    "name": "TTStopWithATick",
    "type": "INT"
  },
  "16930": {
    "name": "Payup",
    "type": "INT"
  },
  "16931": {
    "name": "TTStopTriggerPriceType",
    "type": "INT",
    "values": {
      "1": "Bid",
      "2": "Ask",
      "3": "Ltp"
    }
  },
  "16932": {
    "name": "TTStopIsTrlTrg",
    "type": "BOOLEAN",
    "values": {
      "Y": "Yes",
      "N": "No"
    }
  },
  "16933": {
    "name": "TTStopTriggerTicksAway",
    "type": "INT"
  },
  "16934": {
    "name": "TTStopTriggerQtyType",
    "type": "INT",
    "values": {
      "1": "Qty",
      "2": "Percentage"
    }
  },
  "16935": {
    "name": "TTStopTriggerQTyCompare",
    "type": "INT",
    "values": {
      "3": "Lte",
      "5": "Gte"
    }
  },
  "16936": {
    "name": "TTStopTriggerQty",
    "type": "INT"
  },
  "16937": {
    "name": "TTStopTriggerLTPReset",
    "type": "BOOLEAN",
    "values": {
      "Y": "Yes",
      "N": "No"
    }
  },
  "16938": {
    "name": "TTStopTriggeredOrderType",
    "type": "INT",
    "values": {
      "1": "Mkt",
      "2": "Limit",
      "21": "Mlm"
    }
  },
  "16939": {
    "name": "TTStopTriggeredOrderPrice",
    "type": "PRICE"
  },
  "16940": {
    "name": "TTStopLimitTicksAway",
    "type": "INT"
  },
  "16941": {
    "name": "TTStopPayup",
    "type": "INT"
  },
  "16942": {
    "name": "RetryCount",
    "type": "INT"
  },
  "16943": {
    "name": "RetryInterval",
    "type": "INT"
  },
  "16944": {
    "name": "Duration",
    "type": "INT"
  },
  "16945": {
    "name": "DurationBaseUnit",
    "type": "INT",
    "values": {
      "1": "Hour",
      "2": "Minute",
      "3": "Second"
    }
  },
  "16946": {
    "name": "DurationSTime",
    "type": "UTCTIMESTAMP"
  },
  "16947": {
    "name": "DurationETime",
    "type": "UTCTIMESTAMP"
  },
  "16948": {
    "name": "LeftoverTimeAction",
    "type": "INT",
    "values": {
      "0": "Atend",
      "1": "Halflife"
    }
  },
  "16949": {
    "name": "AutoResubExpiredGTD",
    "type": "BOOLEAN"
  },
  "16950": {
    "name": "ParentTIF",
    "type": "INT",
    "values": {
      "0": "Day",
      "1": "Gtc",
      "7": "Time",
      "15": "Dayplus",
      "16": "Gtcplus"
    }
  },
  "16951": {
    "name": "TTStopSecondConditionIsOn",
    "type": "BOOLEAN"
  },
  "16952": {
    "name": "TTStopSecondTriggerPriceType",
    "type": "INT",
    "values": {
      "1": "Bid",
      "2": "Ask",
      "3": "Ltp",
      "6": "Sameside",
      "7": "Oppositeside"
    }
  },
  "16953": {
    "name": "TTStopSecondConditionIsTrlTrg",
    "type": "BOOLEAN"
  },
  "16954": {
    "name": "TTStopSecondTriggerTicksAway",
    "type": "INT"
  },
  "16955": {
    "name": "TTStopSecondTriggerQtyType",
    "type": "INT",
    "values": {
      "1": "Qty",
      "2": "Percentage"
    }
  },
  "16956": {
    "name": "TTStopSecondTriggerQtyCompare",
    "type": "INT",
    "values": {
      "3": "Lte",
      "5": "Gte"
    }
  },
  "16957": {
    "name": "TTStopSecondTriggerQty",
    "type": "QTY"
  },
  "16958": {
    "name": "Variance",
    "type": "INT"
  },
  "16959": {
    "name": "IncludeQuotes",
    "type": "BOOLEAN"
  },
  "16960": {
    "name": "ETAGoToMktTicks",
    "type": "INT"
  },
  "16961": {
    "name": "WaitingOption",
    "type": "INT"
  },
  "16962": {
    "name": "TTStopChildTIFOverride",
    "type": "INT"
  },
  "16963": {
    "name": "Seq",
    "type": "INT"
  },
  "16964": {
    "name": "LegFillSeq",
    "type": "INT"
  },
  "16965": {
    "name": "NoTTReserved",
    "type": "NUMINGROUP"
  },
  "16966": {
    "name": "TTReservedName",
    "type": "STRING"
  },
  "16967": {
    "name": "TTReservedValue",
    "type": "STRING"
  },
  "16968": {
    "name": "LeftoverMktOrderLimitTicks",
    "type": "INT"
  },
  "16969": {
    "name": "SecondConditionIsOn",
    "type": "BOOLEAN"
  },
  "16970": {
    "name": "SecondTriggerTicksAway",
    "type": "INT"
  },
  "16971": {
    "name": "SecondTriggerQtyType",
    "type": "INT",
    "values": {
      "1": "E Qty",
      "2": "E Percentage"
    }
  },
  "16972": {
    "name": "SecondTriggerQtyCompare",
    "type": "INT",
    "values": {
      "3": "E LTE",
      "5": "E GTE"
    }
  },
  "16973": {
    "name": "SecondTriggerQty",
    "type": "QTY"
  },
  "16974": {
    "name": "LeftoverTime",
    "type": "INT",
    "values": {
      "0": "E At End",
      "1": "E At Half Life"
    }
  },
  "16975": {
    "name": "SecondTriggerPriceType",
    "type": "INT",
    "values": {
      "1": "E Bid",
      "2": "E Ask",
      "3": "E Ltp",
      "6": "E Same Side",
      "7": "E Opposite Side"
    }
  },
  "16976": {
    "name": "NoImplies",
    "type": "BOOLEAN"
  },
  "16977": {
    "name": "CustomSliceSched",
    "type": "STRING"
  },
  "16978": {
    "name": "TTStopNoImplies",
    "type": "BOOLEAN"
  },
  "16979": {
    "name": "HKExSSEAlgoHandling",
    "type": "BOOLEAN"
  },
  "16980": {
    "name": "Aggressiveness",
    "type": "FLOAT"
  },
  "16981": {
    "name": "IgnoreMarketState",
    "type": "BOOLEAN"
  },
  "16982": {
    "name": "InstanceName",
    "type": "STRING"
  },
  "16983": {
    "name": "HedgeOrderType",
    "type": "INT",
    "values": {
      "1": "E Mkt"
    }
  },
  "16984": {
    "name": "DeltaRounding",
    "type": "INT",
    "values": {
      "0": "E Round Normal",
      "1": "E Round Up",
      "2": "E Round Down"
    }
  },
  "16990": {
    "name": "Vol",
    "type": "FLOAT"
  },
  "16999": {
    "name": "ClearingAccountOverride",
    "type": "STRING"
  },
  "17000": {
    "name": "RequestTickTable",
    "type": "BOOLEAN",
    "values": {
      "Y": "Yes",
      "N": "No"
    }
  },
  "17001": {
    "name": "VendorDefinedField1",
    "type": "STRING"
  },
  "17002": {
    "name": "VendorDefinedField2",
    "type": "STRING"
  },
  "17003": {
    "name": "VendorDefinedField3",
    "type": "STRING"
  },
  "17004": {
    "name": "VendorDefinedField4",
    "type": "STRING"
  },
  "17005": {
    "name": "VendorDefinedField5",
    "type": "STRING"
  },
  "17006": {
    "name": "MaxPart",
    "type": "INT"
  },
  "17007": {
    "name": "MaxDisp",
    "type": "INT"
  },
  "17008": {
    "name": "TwapStyle",
    "type": "INT",
    "values": {
      "0": "E Aggressive",
      "1": "E Default",
      "2": "E Passive"
    }
  },
  "17009": {
    "name": "WouldIfPrc",
    "type": "PRICE"
  },
  "17010": {
    "name": "LimitPrc",
    "type": "PRICE"
  },
  "18000": {
    "name": "ForceLogout",
    "type": "INT",
    "values": {
      "0": "Not Forced",
      "1": "Forced"
    }
  },
  "18001": {
    "name": "MockOrderFlag",
    "type": "INT",
    "values": {
      "0": "Not Mockorder",
      "1": "Mock Order"
    }
  },
  "18002": {
    "name": "CustomMode",
    "type": "CHAR"
  },
  "18009": {
    "name": "TradingStrategy",
    "type": "INT",
    "values": {
      "1": "Arbitrage",
      "10": "Hedge",
      "11": "Directional"
    }
  },
  "18010": {
    "name": "ReverseSpreadOC",
    "type": "INT",
    "values": {
      "0": "Do Not Reverse Open Close Flag On Far Leg",
      "1": "Reverse Spread Open Close Flag On Far Le"
    }
  },
  "18100": {
    "name": "LegExDestination",
    "type": "EXCHANGE"
  },
  "18101": {
    "name": "AccountID",
    "type": "STRING"
  },
  "18102": {
    "name": "UserID",
    "type": "STRING"
  },
  "18210": {
    "name": "PriceFeedStatus",
    "type": "INT"
  },
  "18211": {
    "name": "DeliveryTerm",
    "type": "CHAR",
    "values": {
      "D": "Day",
      "W": "Week",
      "B": "Balance",
      "Q": "Quarter",
      "S": "Season",
      "Y": "Year",
      "V": "Variable",
      "L": "Balance Of Week",
      "X": "Custom",
      "A": "Same Day",
      "N": "Next Day",
      "M": "Month",
      "E": "Weekly",
      "P": "Pack",
      "U": "Bundle",
      "T": "Weekend",
      "H": "Hour",
      "C": "Eom",
      "a": "Quarter Hour",
      "b": "Half Hour",
      "c": "One Hour",
      "d": "Two Hour",
      "e": "Four Hour",
      "f": "Eight Hour",
      "g": "One Plus Two",
      "h": "Three Plus Four",
      "i": "Baseload",
      "j": "Peakload",
      "k": "Overnight",
      "l": "Extended Peak"
    }
  },
  "18212": {
    "name": "LegDeliveryTerm",
    "type": "CHAR",
    "values": {
      "D": "Day",
      "W": "Week",
      "B": "Balance",
      "Q": "Quarter",
      "S": "Season",
      "Y": "Year",
      "V": "Variable",
      "L": "Balance Of Week",
      "X": "Custom",
      "A": "Same Day",
      "N": "Next Day",
      "M": "Month",
      "E": "Weekly",
      "P": "Pack",
      "U": "Bundle",
      "T": "Weekend",
      "H": "Hour",
      "C": "Eom",
      "a": "Quarter Hour",
      "b": "Half Hour",
      "c": "One Hour",
      "d": "Two Hour",
      "e": "Four Hour",
      "f": "Eight Hour",
      "g": "One Plus Two",
      "h": "Three Plus Four",
      "i": "Baseload",
      "j": "Peakload",
      "k": "Overnight",
      "l": "Extended Peak"
    }
  },
  "18213": {
    "name": "LegDeliveryDate",
    "type": "LOCALMKTDATE"
  },
  "18214": {
    "name": "IncludeNumberOfOrders",
    "type": "CHAR",
    "values": {
      "N": "No",
      "Y": "Yes"
    }
  },
  "18216": {
    "name": "ExchCred",
    "type": "STRING"
  },
  "18217": {
    "name": "RefID",
    "type": "STRING"
  },
  "18218": {
    "name": "TTCustomerName",
    "type": "STRING"
  },
  "18219": {
    "name": "SecondaryAccount",
    "type": "STRING"
  },
  "18220": {
    "name": "BrokerID",
    "type": "STRING"
  },
  "18221": {
    "name": "CompanyID",
    "type": "STRING"
  },
  "18222": {
    "name": "AOTCPreventionActionType",
    "type": "CHAR",
    "values": {
      "0": "Crossing Order Prevention None",
      "1": "Crossing Order Prevention Held",
      "2": "Crossing Order Prevention Cancel",
      "3": "Crossing Order Prevention Fill",
      "4": "Crossing Order Prevention Reduced Order",
      "5": "Crossing Order Prevention Reduced Change",
      "6": "Crossing Order Prevention Released Order",
      "7": "Crossing Order Prevention Replaced Order",
      "8": "Crossing Order Prevention No Action On Order",
      "9": "Crossing Order Prevention Cancel Replace"
    }
  },
  "18223": {
    "name": "ContractYearMonth",
    "type": "STRING"
  },
  "18224": {
    "name": "LegContractYearMonth",
    "type": "STRING"
  },
  "18225": {
    "name": "ExchangeSeqNum",
    "type": "INT"
  },
  "18226": {
    "name": "TTSyntheticType",
    "type": "INT"
  },
  "18227": {
    "name": "Organization",
    "type": "STRING"
  },
  "18228": {
    "name": "RoutingAccount",
    "type": "STRING"
  },
  "18229": {
    "name": "ReviewUserID",
    "type": "STRING"
  },
  "18230": {
    "name": "ReviewStatus",
    "type": "INT",
    "values": {
      "1": "Review Status None",
      "2": "Review Status Reviewed",
      "3": "Review Status Approved"
    }
  },
  "18231": {
    "name": "UniqueLegID",
    "type": "STRING"
  },
  "18232": {
    "name": "LastTradingDate",
    "type": "LOCALMKTDATE"
  },
  "18233": {
    "name": "BrokerRoute",
    "type": "STRING"
  },
  "18235": {
    "name": "HedgeType",
    "type": "INT",
    "values": {
      "1": "Hedge Type Duration",
      "2": "Hedge Type Nominal",
      "3": "Hedge Type Price Factor"
    }
  },
  "18236": {
    "name": "UnderlyingMemo",
    "type": "STRING"
  },
  "18314": {
    "name": "LegMaturityDay",
    "type": "DAYOFMONTH"
  },
  "18602": {
    "name": "QuoteSubType",
    "type": "INT",
    "values": {
      "1": "Working Delta",
      "2": "Basis Trade",
      "3": "Regular Lds Negotiation",
      "4": "Negotiate Underlying Outside Exchange",
      "5": "Vola Strategy Fix",
      "6": "Vola Strategy Negotiate Underlying"
    }
  },
  "18603": {
    "name": "QuoteRefPrice",
    "type": "PRICE"
  },
  "18604": {
    "name": "UnderlyingDeltaPercentage",
    "type": "FLOAT"
  },
  "18605": {
    "name": "SRFQTransType",
    "type": "INT",
    "values": {
      "1": "New",
      "2": "Replace",
      "3": "Close",
      "4": "Update",
      "5": "Expire"
    }
  },
  "18606": {
    "name": "NegotiationID",
    "type": "STRING"
  },
  "18607": {
    "name": "SecondaryNegotiationID",
    "type": "STRING"
  },
  "18608": {
    "name": "MktQuoteID",
    "type": "STRING"
  },
  "18609": {
    "name": "SecondaryQuoteID",
    "type": "STRING"
  },
  "18610": {
    "name": "QuotingStatus",
    "type": "INT",
    "values": {
      "1": "Quoting Status Open Active",
      "2": "Quoting Status Open Working",
      "3": "Quoting Status Closed Inactive"
    }
  },
  "20000": {
    "name": "OneOffSharedKey",
    "type": "STRING"
  },
  "20016": {
    "name": "FutureReferencePrice",
    "type": "PRICE"
  },
  "37711": {
    "name": "MDTradeEntryID",
    "type": "INT"
  },
  "60111": {
    "name": "AllocVolumeType",
    "type": "STRING"
  }
}

export const FIELDS_TT44: Record<number, FieldDef> = {
  "1": {
    "name": "Account",
    "type": "STRING"
  },
  "6": {
    "name": "AvgPx",
    "type": "PRICE"
  },
  "7": {
    "name": "BeginSeqNo",
    "type": "SEQNUM"
  },
  "8": {
    "name": "BeginString",
    "type": "STRING"
  },
  "9": {
    "name": "BodyLength",
    "type": "INT"
  },
  "10": {
    "name": "CheckSum",
    "type": "STRING"
  },
  "11": {
    "name": "ClOrdID",
    "type": "STRING"
  },
  "12": {
    "name": "Commission",
    "type": "AMT"
  },
  "13": {
    "name": "CommType",
    "type": "CHAR",
    "values": {
      "1": "Per Unit",
      "2": "Percentage",
      "3": "Absolute",
      "4": "Percentage Waived Cash Discount",
      "5": "Percentage Waived Enhanced Units",
      "6": "Points Per Bond Or Contract"
    }
  },
  "14": {
    "name": "CumQty",
    "type": "QTY"
  },
  "15": {
    "name": "Currency",
    "type": "CURRENCY"
  },
  "16": {
    "name": "EndSeqNo",
    "type": "SEQNUM"
  },
  "17": {
    "name": "ExecID",
    "type": "STRING"
  },
  "18": {
    "name": "ExecInst",
    "type": "MULTIPLESTRINGVALUE",
    "values": {
      "1": "Not Held",
      "2": "Work",
      "5": "Held",
      "6": "Participate Dont Initiate",
      "G": "All Or None",
      "S": "Suspend",
      "q": "Release From Suspension",
      "o": "Cancel On Connection Loss",
      "X": "Test Request"
    }
  },
  "19": {
    "name": "ExecRefID",
    "type": "STRING"
  },
  "20": {
    "name": "ExecTransType",
    "type": "CHAR",
    "values": {
      "0": "New",
      "1": "Cancel",
      "2": "Correct",
      "3": "Status"
    }
  },
  "21": {
    "name": "HandlInst",
    "type": "CHAR",
    "values": {
      "1": "Automated Execution Order Private No Broker Intervention",
      "2": "Automated Execution Order Public Broker Intervention Ok",
      "3": "Manual Order Best Execution"
    }
  },
  "22": {
    "name": "IDSource",
    "type": "STRING",
    "values": {
      "4": "Isin Number",
      "5": "Ric Code",
      "8": "Exchange Security Id",
      "91": "Exchange Ticker",
      "96": "Tt Security Id",
      "97": "Alias",
      "98": "Name",
      "A": "Bloomberg Code",
      "S": "Openfigi Id",
      "X": "Series Key",
      "H": "Clearing House"
    }
  },
  "30": {
    "name": "LastMkt",
    "type": "EXCHANGE"
  },
  "31": {
    "name": "LastPx",
    "type": "PRICE"
  },
  "32": {
    "name": "LastShares",
    "type": "QTY"
  },
  "33": {
    "name": "LinesOfText",
    "type": "INT"
  },
  "34": {
    "name": "MsgSeqNum",
    "type": "SEQNUM"
  },
  "35": {
    "name": "MsgType",
    "type": "STRING",
    "values": {
      "0": "Heartbeat",
      "1": "Test Request",
      "2": "Resend Request",
      "3": "Reject",
      "4": "Sequence Reset",
      "5": "Logout",
      "8": "Execution Report",
      "9": "Order Cancel Reject",
      "A": "Logon",
      "B": "News",
      "b": "Quote Request Response",
      "c": "Security Definition Request",
      "D": "Order Single",
      "AB": "Order Multi Leg",
      "AC": "Order Multi Leg Cancel Replace Request",
      "d": "Security Definition",
      "e": "Security Status Request",
      "f": "Security Status",
      "F": "Order Cancel Request",
      "G": "Order Cancel Replace Request",
      "g": "Trading Session Status Request",
      "H": "Order Status Request",
      "j": "Business Message Reject",
      "R": "Quote Request",
      "V": "Market Data Request",
      "W": "Market Data Snapshot Full Refresh",
      "X": "Market Data Incremental Refresh",
      "Y": "Market Data Request Reject",
      "AE": "Trade Capture Report",
      "AR": "Trade Capture Report Ack",
      "U2": "Outofband Recovery Request",
      "Q": "Dont Know Trade",
      "AD": "Trade Capture Report Request",
      "AQ": "Trade Capture Report Request Ack",
      "J": "Allocation Instruction",
      "P": "Allocation Instruction Ack",
      "AS": "Allocation Report",
      "AI": "Quote Status Report",
      "AJ": "Quote Response",
      "E": "New Order List"
    }
  },
  "36": {
    "name": "NewSeqNo",
    "type": "SEQNUM"
  },
  "37": {
    "name": "OrderID",
    "type": "STRING"
  },
  "38": {
    "name": "OrderQty",
    "type": "QTY"
  },
  "39": {
    "name": "OrdStatus",
    "type": "CHAR",
    "values": {
      "0": "New",
      "1": "Partially Filled",
      "2": "Filled",
      "3": "Done For Day",
      "4": "Canceled",
      "5": "Replaced",
      "6": "Pending Cancel",
      "7": "Stopped",
      "8": "Rejected",
      "9": "Suspended",
      "A": "Pending New",
      "B": "Calculated",
      "C": "Expired",
      "D": "Accepted For Bidding",
      "E": "Pending Replace",
      "H": "Trade Cancel",
      "z": "Inactive"
    }
  },
  "40": {
    "name": "OrdType",
    "type": "CHAR",
    "values": {
      "1": "Market",
      "2": "Limit",
      "3": "Stop",
      "4": "Stop Limit",
      "5": "Market On Close",
      "B": "Limit On Close",
      "D": "Previously Quoted",
      "K": "Market With Left Over As Limit",
      "Q": "Market Limit Market Left Over As Limit",
      "S": "Stop Market To Limit",
      "T": "If Touched Limit",
      "J": "If Touched Market",
      "U": "If Touched Market To Limit",
      "p": "Limit Post Only",
      "V": "Market Close Today",
      "W": "Limit Close Today",
      "P": "Peg",
      "X": "Iceberg"
    }
  },
  "41": {
    "name": "OrigClOrdID",
    "type": "STRING"
  },
  "43": {
    "name": "PossDupFlag",
    "type": "BOOLEAN",
    "values": {
      "N": "No",
      "Y": "Yes"
    }
  },
  "44": {
    "name": "Price",
    "type": "PRICE"
  },
  "45": {
    "name": "RefSeqNum",
    "type": "SEQNUM"
  },
  "48": {
    "name": "SecurityID",
    "type": "STRING"
  },
  "49": {
    "name": "SenderCompID",
    "type": "STRING"
  },
  "50": {
    "name": "SenderSubID",
    "type": "STRING"
  },
  "52": {
    "name": "SendingTime",
    "type": "UTCTIMESTAMP"
  },
  "53": {
    "name": "Quantity",
    "type": "QTY"
  },
  "54": {
    "name": "Side",
    "type": "CHAR",
    "values": {
      "1": "Buy",
      "2": "Sell",
      "3": "Buy Minus",
      "4": "Sell Plus",
      "5": "Sell Short",
      "6": "Sell Short Exempt",
      "7": "Undisclosed",
      "8": "Cross",
      "9": "Cross Short",
      "B": "As Defined",
      "C": "Opposite"
    }
  },
  "55": {
    "name": "Symbol",
    "type": "STRING"
  },
  "56": {
    "name": "TargetCompID",
    "type": "STRING"
  },
  "57": {
    "name": "TargetSubID",
    "type": "STRING"
  },
  "58": {
    "name": "Text",
    "type": "STRING"
  },
  "59": {
    "name": "TimeInForce",
    "type": "CHAR",
    "values": {
      "0": "Day",
      "1": "Good Till Cancel",
      "2": "At The Opening",
      "3": "Immediate Or Cancel",
      "4": "Fill Or Kill",
      "5": "Good Till Crossing",
      "6": "Good Till Date",
      "7": "At The Close",
      "8": "Good Through Crossing",
      "9": "At Crossing",
      "A": "Auction",
      "S": "Time In Force Morning At The Close",
      "T": "Time In Force Afternoon At The Close",
      "U": "Time In Force Night At The Close",
      "V": "Good In Session",
      "W": "Day Plus",
      "X": "Good Till Cancel Plus",
      "Y": "Good Till Date Plus"
    }
  },
  "60": {
    "name": "TransactTime",
    "type": "UTCTIMESTAMP"
  },
  "62": {
    "name": "ValidUntilTime",
    "type": "UTCTIMESTAMP"
  },
  "63": {
    "name": "SettlType",
    "type": "STRING"
  },
  "64": {
    "name": "SettlDate",
    "type": "LOCALMKTDATE"
  },
  "66": {
    "name": "ListID",
    "type": "STRING"
  },
  "67": {
    "name": "ListSeqNo",
    "type": "INT"
  },
  "69": {
    "name": "ListExecInst",
    "type": "STRING"
  },
  "70": {
    "name": "AllocID",
    "type": "STRING"
  },
  "71": {
    "name": "AllocTransType",
    "type": "CHAR",
    "values": {
      "0": "New",
      "1": "Replace",
      "2": "Cancel"
    }
  },
  "73": {
    "name": "NoOrders",
    "type": "NUMINGROUP"
  },
  "75": {
    "name": "TradeDate",
    "type": "LOCALMKTDATE"
  },
  "77": {
    "name": "OpenClose",
    "type": "CHAR",
    "values": {
      "C": "Close",
      "O": "Open",
      "F": "Fifo"
    }
  },
  "78": {
    "name": "NoAllocs",
    "type": "NUMINGROUP"
  },
  "79": {
    "name": "AllocAccount",
    "type": "STRING"
  },
  "80": {
    "name": "AllocQty",
    "type": "QTY"
  },
  "81": {
    "name": "ProcessCode",
    "type": "CHAR",
    "values": {
      "0": "Regular",
      "1": "Soft Dollar",
      "2": "Step In",
      "3": "Setp Out",
      "4": "Soft Dollar Step In",
      "5": "Soft Dollar Step Out",
      "6": "Plan Sponsor"
    }
  },
  "87": {
    "name": "AllocStatus",
    "type": "INT",
    "values": {
      "0": "Accepted",
      "1": "Block Level Reject",
      "2": "Account Level Reject",
      "3": "Received",
      "4": "Incomplete",
      "5": "Rejected By Intermediary"
    }
  },
  "96": {
    "name": "RawData",
    "type": "STRING"
  },
  "97": {
    "name": "PossResend",
    "type": "BOOLEAN",
    "values": {
      "N": "No",
      "Y": "Yes"
    }
  },
  "98": {
    "name": "EncryptMethod",
    "type": "INT",
    "values": {
      "0": "None"
    }
  },
  "99": {
    "name": "StopPx",
    "type": "PRICE"
  },
  "100": {
    "name": "ExDestination",
    "type": "EXCHANGE"
  },
  "102": {
    "name": "CxlRejReason",
    "type": "INT",
    "values": {
      "0": "Too Late To Cancel",
      "1": "Unknown Order",
      "2": "Broker Option",
      "3": "Order Already In Pending Cancel Or Pending Replace Status",
      "4": "Unable To Process Order Mass Cancel Request",
      "5": "Origordmodtime",
      "6": "Duplicate Clordid",
      "7": "Duplicate Of A Verbally Communicated Order",
      "8": "Stale Order",
      "9": "Trade Along Required",
      "10": "Invalid Investor Id",
      "11": "Unsupported Order Characteristic",
      "12": "Surveillence Option",
      "13": "Incorrect Quantity",
      "14": "Incorrect Allocated Quantity",
      "15": "Unknown Account",
      "16": "Price Exceeds Current Price Band",
      "18": "Invalid Price Increment",
      "19": "Message Pending",
      "20": "Routing Error",
      "99": "Other",
      "1003": "Market Closed",
      "1007": "Fix Field Missing Or Incorrect",
      "1010": "Required Field Missing",
      "1011": "Fix Field Incorrect",
      "1012": "Price Must Be Greater Than Zero",
      "1013": "Invalid Order Qualifier",
      "1014": "User Not Authorized",
      "2013": "Market Orders Not Supported By Opposite",
      "2019": "Invalid Expire Date",
      "2044": "Order Not In Book",
      "2045": "Order Not In Book2",
      "2046": "Disclosed Qty Cannot Be Greater",
      "2047": "Unknown Contract",
      "2048": "Cancel With Different Sender Comp Id",
      "2049": "Clordid Different Than Correlationclordid",
      "2050": "Clordid Different Than Originalclordid",
      "2051": "Different Side",
      "2052": "Different Group",
      "2053": "Different Security Type",
      "2054": "Different Account",
      "2055": "Different Qty",
      "2056": "Cancel With Different Trader Id",
      "2058": "Stop Price Must Be Greater",
      "2059": "Stop Price Must Be Smaller",
      "2060": "Sell Stop Price Must Be Below Ltp",
      "2061": "Buy Stop Price Must Be Above Ltp",
      "2100": "Different Product",
      "2101": "Different Inflight Fill Mitigation",
      "2102": "Modify With Different Sender Comp Id",
      "2103": "Modify With Different Trader Id",
      "2115": "Order Qty Outside Allowable Range",
      "2130": "Invalid Order Type For Pcp",
      "2137": "Order Price Outside Limits",
      "2179": "Order Price Outside Bands",
      "2311": "Invalid Order Type For Group",
      "2500": "Instrument Cross Request In Progress",
      "2501": "Order Qty Too Low",
      "2600": "Market Maker Protection Has Tripped",
      "4000": "Engine Did Not Respond",
      "5001": "Euronext Unknown Order",
      "5020": "Comp Id Problem",
      "5099": "Euronext Other",
      "5300": "Logon Problem",
      "5313": "No Router For Security Group",
      "5314": "Router Not Available Or Connected",
      "5318": "Invalid Price",
      "5319": "Invalid Ordqty",
      "5320": "Invalid Ordtype",
      "5321": "Invalid Side",
      "6000": "Fully Filled",
      "6001": "Pending Replace",
      "6002": "Pending Cancel",
      "7000": "Order Rejected",
      "7001": "Contract Not Gtc Gtd Eligible",
      "7009": "Contract Past Expiration",
      "7011": "Max Contract Working Qty Exceeded",
      "7015": "Modify With Different Side",
      "7018": "Contract Not Gtc Gtd Eligible2",
      "7020": "No Trading Calendar For Expire Date",
      "7021": "Expire Date Beyond Instrument Expiration",
      "7022": "Expire Date Beyond Leg Instrument Expiration",
      "7024": "Market In No Cancel",
      "7027": "Invalid Order Type For Reserved Market",
      "7028": "Order Session Date In Past",
      "7613": "Disclosed Qty Cannot Be Smaller",
      "9999": "Technical Error Function Not Performed"
    }
  },
  "103": {
    "name": "OrdRejReason",
    "type": "INT",
    "values": {
      "0": "Broker Option",
      "1": "Unknown Symbol",
      "2": "Exchange Closed",
      "3": "Order Exceeds Limit",
      "4": "Too Late To Enter",
      "5": "Unknown Order",
      "6": "Duplicate Order",
      "7": "Duplicate Of A Verbally Communicated Order",
      "8": "Stale Order",
      "9": "Trade Along Required",
      "10": "Invalid Investor Id",
      "11": "Unsupported Order Characteristic",
      "12": "Surveillence Option",
      "13": "Incorrect Quantity",
      "14": "Incorrect Allocated Quantity",
      "15": "Unknown Account",
      "16": "Price Exceeds Current Price Band",
      "18": "Invalid Price Increment",
      "19": "Message Pending",
      "20": "Routing Error",
      "99": "Other",
      "100": "Time Out",
      "1003": "Market Closed",
      "1007": "Fix Field Missing Or Incorrect",
      "1010": "Required Field Missing",
      "1011": "Fix Field Incorrect",
      "1012": "Price Must Be Greater Than Zero",
      "1013": "Invalid Order Qualifier",
      "1014": "User Not Authorized",
      "2013": "Market Hours Not Suported By Opposite",
      "2019": "Invalid Expire Date",
      "2044": "Order Not In Book",
      "2045": "Order Not In Book 2",
      "2046": "Disclosed Qty Cannot Be Greater",
      "2047": "Unknown Contract",
      "2048": "Cancel With Different Sender Comp Id",
      "2049": "Clordid Different Than Correleation Clordid",
      "2050": "Clordid Different Than Original Clordid",
      "2051": "Different Side",
      "2052": "Different Group",
      "2053": "Different Security Type",
      "2054": "Different Account",
      "2055": "Different Qty",
      "2056": "Cancel With Different Trader Id",
      "2058": "Stop Price Must Be Greater",
      "2059": "Stop Price Must Be Smaller",
      "2060": "Sell Stop Price Must Be Below Ltp",
      "2061": "Buy Stop Price Must Be Above Ltp",
      "2100": "Different Product",
      "2101": "Different Inflight Fill Modification",
      "2102": "Modify With Different Sender Comp Id",
      "2103": "Modify With Different Trader Id",
      "2115": "Order Qty Outside Allowable Range",
      "2130": "Invalid Order Type For Pcp",
      "2137": "Order Price Outside Limits",
      "2179": "Order Price Outside Bands",
      "2311": "Invalid Order Type For Group",
      "2500": "Instrument Cross Request In Process",
      "2501": "Ordr Qty Too Low",
      "2600": "Market Maker Protection Has Tripped",
      "4000": "Engine Did Not Respond",
      "6001": "Pending Replace",
      "6002": "Pending Cancel",
      "7000": "Order Rejected",
      "7001": "Contract Not Gtc Gtd Eligible",
      "7009": "Contract Past Expiration",
      "7011": "Max Contract Working Qty Exceeded",
      "7015": "Modify With Different Side",
      "7018": "Contract Not Gtc Gtd Eligible 2",
      "7020": "No Trading Calendar For Expire Date",
      "7021": "Expire Date Beyond Instrument Expiration",
      "7022": "Expire Date Beyond Leg Instrument Expiration",
      "7024": "Market In No Cancel",
      "7027": "Invalid Order Type For Reserved Market",
      "7028": "Order Session Date In Past",
      "7613": "Disclosed Qty Cannot Be Smaller",
      "9999": "Technical Error Function Not Performed"
    }
  },
  "107": {
    "name": "SecurityDesc",
    "type": "STRING"
  },
  "108": {
    "name": "HeartBtInt",
    "type": "INT"
  },
  "110": {
    "name": "MinQty",
    "type": "QTY"
  },
  "112": {
    "name": "TestReqID",
    "type": "STRING"
  },
  "115": {
    "name": "OnBehalfOfCompID",
    "type": "STRING"
  },
  "116": {
    "name": "OnBehalfOfSubID",
    "type": "STRING"
  },
  "117": {
    "name": "QuoteId",
    "type": "STRING"
  },
  "118": {
    "name": "NetMoney",
    "type": "AMT"
  },
  "122": {
    "name": "OrigSendingTime",
    "type": "UTCTIMESTAMP"
  },
  "123": {
    "name": "GapFillFlag",
    "type": "BOOLEAN",
    "values": {
      "N": "No",
      "Y": "Yes"
    }
  },
  "124": {
    "name": "NoExecs",
    "type": "NUMINGROUP"
  },
  "126": {
    "name": "ExpireTime",
    "type": "UTCTIMESTAMP"
  },
  "127": {
    "name": "DKReason",
    "type": "CHAR",
    "values": {
      "A": "Unknown Symbol",
      "Z": "Other"
    }
  },
  "128": {
    "name": "DeliverToCompID",
    "type": "STRING"
  },
  "129": {
    "name": "DeliverToSubID",
    "type": "STRING"
  },
  "131": {
    "name": "QuoteReqID",
    "type": "STRING"
  },
  "132": {
    "name": "BidPx",
    "type": "PRICE"
  },
  "133": {
    "name": "OfferPx",
    "type": "PRICE"
  },
  "134": {
    "name": "BidSize",
    "type": "QTY"
  },
  "135": {
    "name": "OfferSize",
    "type": "QTY"
  },
  "136": {
    "name": "NoMiscFees",
    "type": "NUMINGROUP"
  },
  "137": {
    "name": "MiscFeeAmt",
    "type": "AMT"
  },
  "138": {
    "name": "MiscFeeCurr",
    "type": "CURRENCY"
  },
  "139": {
    "name": "MiscFeeType",
    "type": "INT",
    "values": {
      "1": "Regulatory",
      "2": "Tax",
      "3": "Local Commission",
      "4": "Exchange Fees",
      "5": "Stamp",
      "6": "Levy",
      "7": "Other",
      "8": "Markup",
      "9": "Consumption Tax",
      "10": "Per Transaction",
      "11": "Conversion",
      "12": "Agent"
    }
  },
  "141": {
    "name": "ResetSeqNumFlag",
    "type": "BOOLEAN",
    "values": {
      "N": "No",
      "Y": "Yes"
    }
  },
  "142": {
    "name": "SenderLocationID",
    "type": "STRING"
  },
  "146": {
    "name": "NoRelatedSym",
    "type": "NUMINGROUP"
  },
  "148": {
    "name": "Headline",
    "type": "STRING"
  },
  "150": {
    "name": "ExecType",
    "type": "CHAR",
    "values": {
      "0": "New",
      "1": "Partial Fill",
      "2": "Fill",
      "3": "Done For Day",
      "4": "Canceled",
      "5": "Replace",
      "6": "Pending Cancel",
      "7": "Stopped",
      "8": "Rejected",
      "9": "Suspended",
      "A": "Pending New",
      "B": "Calculated",
      "C": "Expired",
      "D": "Restated",
      "E": "Pending Replace",
      "F": "Trade",
      "G": "Trade Correct",
      "H": "Trade Cancel",
      "I": "Order Status",
      "J": "Trade In A Clearing Hold",
      "K": "Trade Has Been Released To Clearing",
      "L": "Triggered Or Activated By System",
      "a": "Cancelled By Stp",
      "b": "Order Cancelled Due To Cod Mechanism",
      "n": "Order Cancelled Due To Potential Trade Outside Fsp Limits",
      "u": "Order Cancelled Due To Market Maker Protection",
      "v": "Order Cancelled By Clearing Risk Manager",
      "w": "Order Cancelled Due To Trade Price Validation",
      "O": "Eliminated By Corporate Event",
      "P": "Cancelled By Member Risk Manager",
      "U": "Order Cancelled By Market Operations",
      "V": "Cancelled Due To Kill Command",
      "X": "Remaining Quantity Killed",
      "Y": "Beginning Of Pako Period",
      "R": "Rfq Partially Or Fully Matched With Other Counterparts"
    }
  },
  "151": {
    "name": "LeavesQty",
    "type": "QTY"
  },
  "153": {
    "name": "AllocAvgPx",
    "type": "PRICE"
  },
  "154": {
    "name": "AllocNetMoney",
    "type": "AMT"
  },
  "161": {
    "name": "AllocText",
    "type": "STRING"
  },
  "167": {
    "name": "SecurityType",
    "type": "STRING",
    "values": {
      "FUT": "Future",
      "OPT": "Option",
      "MLEG": "Spread",
      "SPOT": "Spot",
      "TBOND": "Tbond",
      "CUR": "Currency",
      "CS": "Common Stock",
      "INDEX": "Index",
      "NONE": "None"
    }
  },
  "168": {
    "name": "EffectiveTime",
    "type": "UTCTIMESTAMP"
  },
  "194": {
    "name": "LastSpotRate",
    "type": "PRICE"
  },
  "195": {
    "name": "LastForwardPoints",
    "type": "PRICEOFFSET"
  },
  "196": {
    "name": "AllocLinkID",
    "type": "STRING"
  },
  "198": {
    "name": "SecondaryOrderID",
    "type": "STRING"
  },
  "200": {
    "name": "MaturityMonthYear",
    "type": "MONTHYEAR"
  },
  "201": {
    "name": "PutOrCall",
    "type": "INT",
    "values": {
      "0": "Put",
      "1": "Call"
    }
  },
  "202": {
    "name": "StrikePrice",
    "type": "PRICE"
  },
  "205": {
    "name": "MaturityDay",
    "type": "DAYOFMONTH"
  },
  "206": {
    "name": "OptAttribute",
    "type": "CHAR"
  },
  "207": {
    "name": "SecurityExchange",
    "type": "EXCHANGE"
  },
  "210": {
    "name": "MaxShow",
    "type": "INT"
  },
  "262": {
    "name": "MDReqID",
    "type": "STRING"
  },
  "263": {
    "name": "SubscriptionRequestType",
    "type": "CHAR",
    "values": {
      "0": "Snapshot",
      "1": "Snapshot Plus Updates",
      "2": "Disable Previous Snapshot Plus Update Request"
    }
  },
  "264": {
    "name": "MarketDepth",
    "type": "INT",
    "values": {
      "0": "Full Book",
      "1": "Top Of Book"
    }
  },
  "265": {
    "name": "MDUpdateType",
    "type": "INT",
    "values": {
      "0": "Full Refresh",
      "1": "Incremental Refresh"
    }
  },
  "266": {
    "name": "AggregatedBook",
    "type": "BOOLEAN",
    "values": {
      "N": "No",
      "Y": "Yes"
    }
  },
  "267": {
    "name": "NoMDEntryTypes",
    "type": "NUMINGROUP"
  },
  "268": {
    "name": "NoMDEntries",
    "type": "NUMINGROUP"
  },
  "269": {
    "name": "MDEntryType",
    "type": "CHAR",
    "values": {
      "0": "Bid",
      "1": "Ask",
      "2": "Trade",
      "4": "Opening Price",
      "5": "Closing Price",
      "6": "Settlement Price",
      "7": "Trading Session High Price",
      "8": "Trading Session Low Price",
      "9": "Trading Session Vwap Price",
      "B": "Trade Volume",
      "J": "Empty Book",
      "L": "Leg Trade",
      "Y": "Implied Bid",
      "Z": "Implied Ask",
      "m": "Otc Trade",
      "p": "Indicative Open",
      "q": "Indicative Close",
      "r": "Indicative Bid",
      "s": "Indicative Ask",
      "t": "Indicative Settlement",
      "u": "Exchange Sending Time",
      "v": "Exchange Transact Time",
      "w": "Exchange Seq Num",
      "x": "Last Traded",
      "A": "Imbalance",
      "o": "Marketbidqty",
      "n": "Marketaskqty"
    }
  },
  "270": {
    "name": "MDEntryPx",
    "type": "PRICE"
  },
  "271": {
    "name": "MDEntrySize",
    "type": "QTY"
  },
  "272": {
    "name": "MDEntryDate",
    "type": "UTCDATEONLY"
  },
  "273": {
    "name": "MDEntryTime",
    "type": "UTCTIMEONLY"
  },
  "276": {
    "name": "QuoteCondition",
    "type": "CHAR",
    "values": {
      "A": "Open Active",
      "B": "Closed Inactive",
      "z": "Suspended"
    }
  },
  "279": {
    "name": "MDUpdateAction",
    "type": "CHAR",
    "values": {
      "0": "New",
      "1": "Change",
      "2": "Delete"
    }
  },
  "282": {
    "name": "MDEntryOriginator",
    "type": "STRING"
  },
  "290": {
    "name": "MDEntryPositionNo",
    "type": "INT"
  },
  "297": {
    "name": "QuoteStatus",
    "type": "INT",
    "values": {
      "0": "Accepted",
      "5": "Rejected",
      "7": "Expired"
    }
  },
  "305": {
    "name": "UnderlyingSecurityIDSource",
    "type": "STRING",
    "values": {
      "4": "Isin Number",
      "5": "Ric Code",
      "8": "Exchange Security Id",
      "91": "Exchange Ticker",
      "96": "Tt Security Id",
      "97": "Alias",
      "98": "Name",
      "A": "Bloomberg Code",
      "S": "Openfigi Id",
      "X": "Series Key",
      "H": "Clearing House"
    }
  },
  "306": {
    "name": "UnderlyingIssuer",
    "type": "STRING"
  },
  "309": {
    "name": "UnderlyingSecurityID",
    "type": "STRING"
  },
  "310": {
    "name": "UnderlyingSecurityType",
    "type": "STRING",
    "values": {
      "FUT": "Future",
      "OPT": "Option",
      "MLEG": "Spread",
      "SPOT": "Spot",
      "TBOND": "Tbond",
      "CUR": "Currency",
      "CS": "Common Stock",
      "NONE": "None"
    }
  },
  "311": {
    "name": "UnderlyingSymbol",
    "type": "STRING"
  },
  "316": {
    "name": "UnderlyingStrikePrice",
    "type": "PRICE"
  },
  "318": {
    "name": "UnderlyingCurrency",
    "type": "CURRENCY"
  },
  "320": {
    "name": "SecurityReqID",
    "type": "STRING"
  },
  "321": {
    "name": "SecurityRequestType",
    "type": "INT",
    "values": {
      "0": "Request Security Identity And Specifications",
      "1": "Request Security Identity For The Specifications Provided",
      "2": "Request List Security Types",
      "3": "Request List Securities"
    }
  },
  "322": {
    "name": "SecurityResponseID",
    "type": "STRING"
  },
  "323": {
    "name": "SecurityResponseType",
    "type": "INT",
    "values": {
      "1": "Accept Security Proposal As Is",
      "2": "Accept Security Proposal With Revisions As Indicated In The Message",
      "3": "List Of Security Types Returned Per Request",
      "4": "List Of Securities Returned Per Request",
      "5": "Reject Security Proposal",
      "6": "Can Not Match Selection Criteria"
    }
  },
  "324": {
    "name": "SecurityStatusReqID",
    "type": "STRING"
  },
  "326": {
    "name": "SecurityTradingStatus",
    "type": "INT",
    "values": {
      "2": "Trading Halt",
      "9": "Circuit Breaker",
      "17": "Ready To Trade",
      "18": "Not Available For Trading",
      "20": "Unknown Or Invalid",
      "21": "Preopen",
      "23": "Fast Market",
      "98": "Post Close",
      "99": "Pre Trade"
    }
  },
  "337": {
    "name": "ContraTrader",
    "type": "STRING"
  },
  "346": {
    "name": "NumberOfOrders",
    "type": "INT"
  },
  "366": {
    "name": "AllocPrice",
    "type": "PRICE"
  },
  "369": {
    "name": "LastSeqNumProcessed",
    "type": "SEQNUM"
  },
  "371": {
    "name": "RefTagID",
    "type": "INT"
  },
  "372": {
    "name": "RefMsgType",
    "type": "STRING"
  },
  "373": {
    "name": "SessionRejectReason",
    "type": "INT",
    "values": {
      "0": "Invalid Tag Number",
      "1": "Required Tag Missing",
      "2": "Tag Not Defined For This Message Type",
      "3": "Undefined Tag",
      "4": "Tag Specified Without A Value",
      "5": "Value Is Incorrect",
      "6": "Incorrect Data Format For Value",
      "7": "Decryption Problem",
      "8": "Signature Problem",
      "9": "Compid Problem",
      "10": "Sendingtime Accuracy Problem",
      "11": "Invalid Msgtype",
      "99": "Other"
    }
  },
  "375": {
    "name": "ContraBroker",
    "type": "STRING"
  },
  "378": {
    "name": "ExecRestatementReason",
    "type": "INT",
    "values": {
      "0": "Gt Corporate Action",
      "1": "Gt Renewal",
      "2": "Verbal Change",
      "3": "Repricing Of Order",
      "4": "Broker Option",
      "5": "Partial Decline Of Orderqty",
      "6": "Cancel On Trading Halt",
      "7": "Cancel On System Failure",
      "8": "Market",
      "9": "Cancel Not Best",
      "10": "Warehouse Recap",
      "11": "Peg Refresh",
      "50": "Control User Activity",
      "51": "Corporate Manager Activity",
      "52": "Branch Manager Activity",
      "53": "Exchange And Fix Server Connection Down",
      "99": "Other",
      "100": "Cancel On Disconnect",
      "103": "Cancel Resting Smp",
      "104": "Cancel From Credit Violation",
      "105": "Cancel From Firmsoft",
      "106": "Cancel From Risk",
      "107": "Cancel Aggressing Smp",
      "108": "Cancel From Min Lot Size",
      "109": "Exec Restatement Reason Cancel By System",
      "110": "Exec Restatement Reason Cancel By Proxy",
      "111": "Exec Restatement Reason Cancel Order Expired",
      "112": "Exec Restatement Reason Cancel Outside Price Limits",
      "113": "Exec Restatement Reason Cancel Session Transition",
      "114": "Exec Restatement Reason Cancel Auction Delete",
      "115": "Exec Restatement Reason Cancel Other",
      "116": "Order Passing Request Accepted",
      "117": "Order Passing Request Rejected",
      "118": "Incoming Order Self Match Prevention",
      "119": "Resting Order Self Match Prevention",
      "120": "Cancel Due To Self Match Prevention",
      "121": "Exec Restatement Reason Gtc Gtd Carryover",
      "122": "Exec Restatement Reason Reduction Of Ordqty",
      "123": "Exec Restatement Reason Price Sliding Reprice",
      "124": "Exec Restatement Reason State Change",
      "125": "Order Passing Request Initiate",
      "126": "Order Passing Request Undo",
      "9000": "Exec Restatement Reason Unsolicited Order Recovery",
      "9001": "Exec Restatement Reason Timeout",
      "9002": "Exec Restatement Reason Pending",
      "9003": "Exec Restatement Reason Revived"
    }
  },
  "379": {
    "name": "BusinessRejectRefID",
    "type": "STRING"
  },
  "380": {
    "name": "BusinessRejectReason",
    "type": "INT",
    "values": {
      "0": "Other",
      "1": "Unkown Id",
      "2": "Unknown Security",
      "3": "Unsupported Message Type",
      "4": "Application Not Available",
      "5": "Conditionally Required Field Missing"
    }
  },
  "381": {
    "name": "GrossTradeAmt",
    "type": "AMT"
  },
  "393": {
    "name": "TotalNumSecurities",
    "type": "INT"
  },
  "423": {
    "name": "PriceType",
    "type": "INT",
    "values": {
      "1": "Percentage",
      "2": "Per Unit",
      "3": "Fixed Amount",
      "4": "Discount",
      "5": "Premium",
      "6": "Spread",
      "7": "Ted Price",
      "8": "Ted Yield",
      "9": "Yield",
      "10": "Fixed Cabinet Trade Price",
      "11": "Variable Cabinet Trade Price"
    }
  },
  "432": {
    "name": "ExpireDate",
    "type": "LOCALMKTDATE"
  },
  "434": {
    "name": "CxlRejResponseTo",
    "type": "CHAR",
    "values": {
      "1": "Order Cancel Request",
      "2": "Order Cancel Replace Request",
      "3": "Quote Cancel",
      "4": "Quote Replace"
    }
  },
  "435": {
    "name": "UnderlyingSpotRate",
    "type": "FLOAT"
  },
  "440": {
    "name": "ClearingAccount",
    "type": "STRING"
  },
  "442": {
    "name": "MultiLegReportingType",
    "type": "CHAR",
    "values": {
      "1": "Single Security",
      "2": "Individual Leg Of A Multi Leg Security",
      "3": "Multi Leg Security"
    }
  },
  "447": {
    "name": "PartyIDSource",
    "type": "CHAR",
    "values": {
      "1": "Korean Investor Id",
      "2": "Taiwanese Qualified Foreign Investor Id Qfii Fid",
      "3": "Taiwanese Trading Acct",
      "4": "Malaysian Central Depository",
      "5": "Chinese Investor Id",
      "6": "Uk National Insurance Or Pension Number",
      "7": "Us Social Security Number",
      "8": "Us Employer Or Tax Id Number",
      "9": "Australian Business Number",
      "A": "Australian Tax File Number",
      "B": "Bic",
      "C": "Generally Accepted Market Participant Identifier",
      "D": "Proprietary",
      "E": "Iso Country Code",
      "F": "Settlement Entity Location",
      "G": "Mic",
      "H": "Csd Participant Member Code",
      "I": "Directed Broker Three Character Acronym As Defined In Isitc Etc Best Practice Guidelines Document",
      "P": "Short Code Identifier",
      "N": "Legal Entity Id"
    }
  },
  "448": {
    "name": "PartyID",
    "type": "STRING"
  },
  "452": {
    "name": "PartyRole",
    "type": "INT",
    "values": {
      "1": "Executing Firm",
      "2": "Broker Of Credit",
      "3": "Client Id",
      "4": "Clearing Firm",
      "5": "Investor Id",
      "6": "Introducing Firm",
      "7": "Entering Firm",
      "8": "Locate",
      "9": "Fund Manager Client Id",
      "10": "Settlement Location",
      "11": "Order Origination Trader",
      "12": "Executing Trader",
      "13": "Order Origination Firm",
      "14": "Giveup Clearing Firm",
      "15": "Correspondant Clearing Firm",
      "16": "Executing System",
      "17": "Contra Firm",
      "18": "Contra Clearing Firm",
      "19": "Sponsoring Firm",
      "20": "Underlying Contra Firm",
      "21": "Clearing Organization",
      "22": "Exchange",
      "24": "Customer Account",
      "25": "Correspondent Clearing Organization",
      "26": "Correspondent Broker",
      "27": "Buyer Seller",
      "28": "Custodian",
      "29": "Intermediary",
      "30": "Agent",
      "31": "Sub Custodian",
      "32": "Beneficiary",
      "33": "Interested Party",
      "34": "Regulatory Body",
      "35": "Liquidity Provider",
      "36": "Entering Trader",
      "37": "Contra Trader",
      "38": "Position Account",
      "39": "Contra Investor Id",
      "40": "Transfer To Firm",
      "41": "Contra Position Account",
      "42": "Contra Exchange",
      "43": "Internal Carry Account",
      "44": "Order Entry Operator Id",
      "45": "Secondary Account Number",
      "46": "Foreign Firm",
      "47": "Third Party Allocation Firm",
      "48": "Claiming Account",
      "49": "Asset Manager",
      "50": "Pledgor Account",
      "51": "Pledgee Account",
      "52": "Large Trader Reportable Account",
      "53": "Trader Mnemonic",
      "54": "Sender Location",
      "55": "Session Id",
      "56": "Acceptable Counterparty",
      "57": "Unacceptable Counterparty",
      "58": "Entering Unit",
      "59": "Executing Unit",
      "60": "Introducing Broker",
      "61": "Quote Originator",
      "62": "Report Originator",
      "63": "Systematic Internaliser",
      "64": "Multilateral Trading Facility",
      "65": "Regulated Market",
      "66": "Market Maker",
      "67": "Investment Firm",
      "68": "Host Competent Authority",
      "69": "Home Competent Authority",
      "70": "Competent Authority Of The Most Relevant Market In Terms Of Liquidity",
      "71": "Competent Authority Of The Transaction",
      "72": "Reporting Intermediary",
      "73": "Execution Venue",
      "74": "Market Data Entry Originator",
      "75": "Location Id",
      "76": "Desk Id",
      "77": "Market Data Market",
      "78": "Allocation Entity",
      "79": "Prime Broker Providing General Trade Services",
      "80": "Step Out Firm",
      "81": "Brokerclearingid",
      "82": "Central Registration Depository",
      "83": "Clearing Account",
      "84": "Acceptable Settling Counterparty",
      "85": "Unacceptable Settling Counterparty",
      "118": "Party Role Decision Maker",
      "119": "Party Role Client Id House",
      "122": "Investment Decision Maker",
      "200": "Account Code",
      "201": "Takeup Firm",
      "202": "Clearing Instruction",
      "203": "Customer Info",
      "204": "Allocation Entity Id",
      "205": "Account Type",
      "206": "Giveup Firm",
      "207": "Mifid Id",
      "208": "Composite Mifid Id",
      "209": "Cti Code",
      "210": "Lma Clearing Account",
      "211": "Authorized Trader Id",
      "212": "Frequent Trader Id",
      "213": "Party Role User",
      "214": "Party Role Member",
      "215": "Party Role Trading Member",
      "216": "Party Role Clearing Member",
      "217": "Party Role Acting User",
      "218": "Party Role Trader Id",
      "219": "Party Role Owner Type",
      "220": "Party Role Routing Member Id",
      "221": "Giveup Qualifier",
      "222": "Algo Strategy Type",
      "223": "Secondary Client Id",
      "224": "Secondary Executing Trader",
      "300": "Investment Decision In Firm",
      "301": "Execution Decision In Firm",
      "302": "Investment Decision Country",
      "303": "Execution Decision Country",
      "304": "Party Role Country Code"
    }
  },
  "453": {
    "name": "NoPartyIDs",
    "type": "NUMINGROUP"
  },
  "454": {
    "name": "NoSecurityAltID",
    "type": "NUMINGROUP"
  },
  "455": {
    "name": "SecurityAltID",
    "type": "STRING"
  },
  "456": {
    "name": "SecurityAltIDSource",
    "type": "STRING",
    "values": {
      "1": "Cusip",
      "4": "Isin Number",
      "5": "Ric Code",
      "8": "Exchange Security Id",
      "91": "Exchange Ticker",
      "92": "Tt Product Family Id",
      "93": "Tt Product Id",
      "94": "Alt Symbol",
      "95": "Clearport",
      "97": "Alias",
      "98": "Name",
      "99": "Security Group",
      "100": "Energy Identifier Code",
      "A": "Bloomberg Code",
      "S": "Openfigi Id",
      "H": "Clearing House",
      "X": "Series Key"
    }
  },
  "457": {
    "name": "NoUnderlyingSecurityAltID",
    "type": "NUMINGROUP"
  },
  "458": {
    "name": "UnderlyingSecurityAltID",
    "type": "STRING"
  },
  "459": {
    "name": "UnderlyingSecurityAltIDSource",
    "type": "STRING"
  },
  "460": {
    "name": "Product",
    "type": "INT",
    "values": {
      "1": "Agency",
      "2": "Commodity",
      "3": "Corporate",
      "4": "Currency",
      "5": "Equity",
      "6": "Government",
      "7": "Index",
      "8": "Loan",
      "9": "Moneymarket",
      "10": "Mortgage",
      "11": "Municipal",
      "12": "Other",
      "13": "Financing",
      "14": "Energy"
    }
  },
  "461": {
    "name": "CFICode",
    "type": "STRING"
  },
  "467": {
    "name": "IndividualAllocID",
    "type": "STRING"
  },
  "483": {
    "name": "TransBkdTime",
    "type": "UTCTIMESTAMP"
  },
  "487": {
    "name": "TradeReportTransType",
    "type": "INT",
    "values": {
      "0": "New",
      "1": "Cancel",
      "2": "Replace",
      "3": "Release",
      "4": "Reverse",
      "5": "Cancel Due To Back Out Of Trade",
      "101": "Inquire",
      "102": "Accept",
      "103": "Approve",
      "999": "Unknown"
    }
  },
  "524": {
    "name": "NestedPartyID",
    "type": "STRING"
  },
  "525": {
    "name": "NestedPartyIDSource",
    "type": "CHAR",
    "values": {
      "1": "Korean Investor Id",
      "2": "Taiwanese Qualified Foreign Investor Id Qfii Fid",
      "3": "Taiwanese Trading Acct",
      "4": "Malaysian Central Depository",
      "5": "Chinese Investor Id",
      "6": "Uk National Insurance Or Pension Number",
      "7": "Us Social Security Number",
      "8": "Us Employer Or Tax Id Number",
      "9": "Australian Business Number",
      "A": "Australian Tax File Number",
      "B": "Bic",
      "C": "Generally Accepted Market Participant Identifier",
      "D": "Proprietary",
      "E": "Iso Country Code",
      "F": "Settlement Entity Location",
      "G": "Mic",
      "H": "Csd Participant Member Code",
      "I": "Directed Broker Three Character Acronym As Defined In Isitc Etc Best Practice Guidelines Document"
    }
  },
  "526": {
    "name": "SecondaryClOrdID",
    "type": "STRING"
  },
  "527": {
    "name": "SecondaryExecID",
    "type": "STRING"
  },
  "528": {
    "name": "OrderCapacity",
    "type": "CHAR",
    "values": {
      "A": "Agency",
      "G": "Proprietary",
      "I": "Individual",
      "P": "Principal",
      "R": "Riskless Principal",
      "W": "Agent For Other Member"
    }
  },
  "529": {
    "name": "OrderRestriction",
    "type": "CHAR",
    "values": {
      "1": "Program Trade",
      "2": "Index Arbitage",
      "3": "Non Index Arbitage",
      "4": "Competing Market Maker",
      "5": "Acting Market Maker",
      "6": "Acting Market Maker Underlying Security",
      "7": "Foreign Entity",
      "8": "External Market Participant",
      "9": "External Market Linkage",
      "A": "Riskless Arbitage",
      "B": "Holding",
      "C": "Price Stabilization",
      "D": "Non Algorithmic",
      "E": "Algorithmic"
    }
  },
  "537": {
    "name": "QuoteType",
    "type": "INT",
    "values": {
      "0": "Indicative",
      "1": "Tradable",
      "99": "Cross Trade Request",
      "255": "Unknown"
    }
  },
  "538": {
    "name": "NestedPartyRole",
    "type": "INT",
    "values": {
      "1": "Executing Firm",
      "2": "Broker Of Credit",
      "3": "Client Id",
      "4": "Clearing Firm",
      "5": "Investor Id",
      "6": "Introducing Firm",
      "7": "Entering Firm",
      "8": "Locate Lending Firm",
      "9": "Fund Manager Client Id",
      "10": "Settlement Location",
      "11": "Order Origination Trader",
      "12": "Executing Trader",
      "13": "Order Origination Firm",
      "14": "Giveup Clearing Firm",
      "15": "Correspondant Clearing Firm",
      "16": "Executing System",
      "17": "Contra Firm",
      "18": "Contra Clearing Firm",
      "19": "Sponsoring Firm",
      "20": "Underlying Contra Firm",
      "21": "Clearing Organization",
      "22": "Exchange",
      "24": "Customer Account",
      "25": "Correspondent Clearing Organization",
      "26": "Correspondent Broker",
      "27": "Buyer Seller",
      "28": "Custodian",
      "29": "Intermediary",
      "30": "Agent",
      "31": "Sub Custodian",
      "32": "Beneficiary",
      "33": "Interested Party",
      "34": "Regulatory Body",
      "35": "Liquidity Provider",
      "36": "Entering Trader",
      "37": "Contra Trader",
      "38": "Position Account"
    }
  },
  "539": {
    "name": "NoNestedPartyIDs",
    "type": "NUMINGROUP"
  },
  "541": {
    "name": "MaturityDate",
    "type": "LOCALMKTDATE"
  },
  "542": {
    "name": "UnderlyingMaturityDate",
    "type": "LOCALMKTDATE"
  },
  "548": {
    "name": "CrossID",
    "type": "STRING"
  },
  "549": {
    "name": "CrossType",
    "type": "INT",
    "values": {
      "1": "Cross Aon",
      "2": "Cross Ioc",
      "3": "Cross One Side",
      "4": "Cross Same Price"
    }
  },
  "552": {
    "name": "NoSides",
    "type": "NUMINGROUP"
  },
  "554": {
    "name": "Password",
    "type": "STRING"
  },
  "555": {
    "name": "NoLegs",
    "type": "NUMINGROUP"
  },
  "556": {
    "name": "LegCurrency",
    "type": "CURRENCY"
  },
  "561": {
    "name": "RoundLot",
    "type": "QTY"
  },
  "562": {
    "name": "MinTradeVol",
    "type": "QTY"
  },
  "566": {
    "name": "LegPrice",
    "type": "PRICE"
  },
  "568": {
    "name": "TradeRequestID",
    "type": "STRING"
  },
  "569": {
    "name": "TradeRequestType",
    "type": "INT",
    "values": {
      "0": "All Trades",
      "1": "Matched Trades Matching Criteria Provided On Request",
      "2": "Unmatched Trades That Match Criteria",
      "3": "Unreported Trades That Match Criteria",
      "4": "Advisories That Match Criteria"
    }
  },
  "570": {
    "name": "PreviouslyReported",
    "type": "BOOLEAN",
    "values": {
      "N": "Not Reported To Counterparty",
      "Y": "Perviously Reported To Counterparty"
    }
  },
  "571": {
    "name": "TradeReportID",
    "type": "STRING"
  },
  "572": {
    "name": "TradeReportRefID",
    "type": "STRING"
  },
  "582": {
    "name": "CustOrderCapacity",
    "type": "INT",
    "values": {
      "1": "Member Trading For Their Own Account",
      "2": "Clearing Firm Trading For Its Proprietary Account",
      "3": "Member Trading For Another Member",
      "4": "All Other"
    }
  },
  "584": {
    "name": "MassStatusReqID",
    "type": "STRING"
  },
  "588": {
    "name": "LegSettlDate",
    "type": "LOCALMKTDATE"
  },
  "600": {
    "name": "LegSymbol",
    "type": "STRING"
  },
  "602": {
    "name": "LegSecurityID",
    "type": "STRING"
  },
  "603": {
    "name": "LegIDSource",
    "type": "STRING",
    "values": {
      "4": "Isin Number",
      "5": "Ric Code",
      "8": "Exchange Security Id",
      "91": "Exchange Ticker",
      "96": "Tt Security Id",
      "97": "Alias",
      "98": "Name",
      "X": "Series Key",
      "A": "Bloomberg Code",
      "S": "Openfigi Id",
      "H": "Clearing House"
    }
  },
  "604": {
    "name": "NoLegSecurityAltID",
    "type": "NUMINGROUP"
  },
  "605": {
    "name": "LegSecurityAltID",
    "type": "STRING"
  },
  "606": {
    "name": "LegSecurityAltIDSource",
    "type": "STRING",
    "values": {
      "1": "Cusip",
      "4": "Isin Number",
      "5": "Ric Code",
      "8": "Exchange Security Id",
      "91": "Exchange Ticker",
      "94": "Alt Symbol",
      "95": "Clearport",
      "97": "Alias",
      "98": "Name",
      "99": "Security Group",
      "A": "Bloomberg Code",
      "S": "Openfigi Id",
      "H": "Clearing House",
      "X": "Series Key"
    }
  },
  "607": {
    "name": "LegProduct",
    "type": "INT",
    "values": {
      "1": "Agency",
      "2": "Commodity",
      "3": "Corporate",
      "4": "Currency",
      "5": "Equity",
      "6": "Government",
      "7": "Index",
      "8": "Loan",
      "9": "Moneymarket",
      "10": "Mortgage",
      "11": "Municipal",
      "12": "Other",
      "13": "Financing",
      "14": "Energy"
    }
  },
  "608": {
    "name": "LegCFICode",
    "type": "STRING"
  },
  "609": {
    "name": "LegSecurityType",
    "type": "STRING",
    "values": {
      "FUT": "Future",
      "OPT": "Option",
      "MLEG": "Spread",
      "SPOT": "Spot",
      "TBOND": "Tbond",
      "CS": "Common Stock",
      "NONE": "None"
    }
  },
  "610": {
    "name": "LegMaturityMonthYear",
    "type": "MONTHYEAR"
  },
  "611": {
    "name": "LegMaturityDate",
    "type": "LOCALMKTDATE"
  },
  "612": {
    "name": "LegStrikePrice",
    "type": "PRICE"
  },
  "613": {
    "name": "LegOptAttribute",
    "type": "CHAR"
  },
  "616": {
    "name": "LegSecurityExchange",
    "type": "EXCHANGE"
  },
  "620": {
    "name": "LegSecurityDesc",
    "type": "STRING"
  },
  "623": {
    "name": "LegRatioQty",
    "type": "FLOAT"
  },
  "624": {
    "name": "LegSide",
    "type": "CHAR"
  },
  "625": {
    "name": "TradingSessionSubID",
    "type": "STRING",
    "values": {
      "1": "Pre Trading",
      "2": "Opening Or Opening Auction",
      "3": "Continuous",
      "4": "Closing Or Closing Auction",
      "5": "Post Trading",
      "6": "Intraday Auction",
      "7": "Quiescent"
    }
  },
  "626": {
    "name": "AllocType",
    "type": "INT",
    "values": {
      "1": "Calculated",
      "2": "Preliminary",
      "5": "Ready To Book",
      "7": "Warehouse Instruction",
      "8": "Request To Intermediary"
    }
  },
  "637": {
    "name": "LegLastPx",
    "type": "PRICE"
  },
  "654": {
    "name": "LegRefID",
    "type": "STRING"
  },
  "669": {
    "name": "LastParPx",
    "type": "PRICE"
  },
  "685": {
    "name": "LegOrderQty",
    "type": "QTY"
  },
  "687": {
    "name": "LegQty",
    "type": "QTY"
  },
  "711": {
    "name": "NoUnderlyings",
    "type": "NUMINGROUP"
  },
  "743": {
    "name": "DeliveryDate",
    "type": "LOCALMKTDATE"
  },
  "749": {
    "name": "TradeRequestResult",
    "type": "INT",
    "values": {
      "0": "Successful",
      "1": "Invalid Or Unknown Instrument",
      "2": "Invalid Type Requested",
      "3": "Invalid Parties",
      "4": "Invalid Transport Type Requested",
      "5": "Invalid Destination Requested",
      "8": "Trade Request Type Not Supported",
      "9": "Unauthorized For Trade Capture Report Request",
      "99": "Other"
    }
  },
  "750": {
    "name": "TradeRequestStatus",
    "type": "INT",
    "values": {
      "0": "Accepted",
      "1": "Completed",
      "2": "Rejected"
    }
  },
  "751": {
    "name": "TradeReportRejectReason",
    "type": "INT",
    "values": {
      "0": "Successful",
      "1": "Invalid Party Information",
      "2": "Unknown Instrument",
      "3": "Unauthorized To Report Trades",
      "4": "Invalid Trade Type",
      "99": "Other"
    }
  },
  "755": {
    "name": "AllocReportID",
    "type": "STRING"
  },
  "762": {
    "name": "SecuritySubType",
    "type": "STRING"
  },
  "763": {
    "name": "UnderlyingSecuritySubType",
    "type": "STRING"
  },
  "764": {
    "name": "LegSecuritySubType",
    "type": "STRING"
  },
  "779": {
    "name": "LastUpdateTime",
    "type": "UTCTIMESTAMP"
  },
  "789": {
    "name": "NextExpectedMsgSeqNum",
    "type": "SEQNUM"
  },
  "790": {
    "name": "OrdStatusReqID",
    "type": "STRING"
  },
  "794": {
    "name": "AllocReportType",
    "type": "INT",
    "values": {
      "3": "Sellside Calculated Using Preliminary",
      "4": "Sellside Calculated Without Preliminary",
      "5": "Warehouse Recap",
      "8": "Request To Intermediary"
    }
  },
  "799": {
    "name": "OrderAvgPx",
    "type": "PRICE"
  },
  "810": {
    "name": "UnderlyingPx",
    "type": "PRICE"
  },
  "811": {
    "name": "OptionDelta",
    "type": "FLOAT"
  },
  "818": {
    "name": "SecondaryTradeReportID",
    "type": "STRING"
  },
  "820": {
    "name": "TradeLinkID",
    "type": "STRING"
  },
  "828": {
    "name": "TrdType",
    "type": "INT",
    "values": {
      "0": "Regular Trade",
      "1": "Block Trade",
      "2": "Exchange For Physical",
      "3": "Transfer",
      "11": "Exchange For Risk",
      "12": "Exchange For Swap",
      "14": "Exchange Of Options For Options",
      "22": "Over The Counter Privately Negotiated Trades",
      "23": "Substitution Of Futures For Forwards",
      "45": "Option Exercise",
      "54": "Large Notional Off Facility Swap",
      "55": "Exchange Basis Facility",
      "57": "Netted Trade",
      "58": "Stp Block Swap Trade",
      "59": "Credit Event Trade",
      "60": "Succession Event Trade",
      "1000": "Volatility",
      "1001": "Efp Financial",
      "1002": "Efp Index Futures",
      "1003": "Strategy Block Trade",
      "1004": "Block Standard Cf",
      "1005": "Block Combination Cf",
      "1006": "Efs Efp Cf",
      "1007": "Block Internal Cf",
      "1008": "Portfolio Cf",
      "1009": "Correction Cf",
      "1010": "Block Combination Buyer Cf",
      "1011": "Block Combination Seller Cf",
      "1012": "Efs Efp Combination Cf",
      "1013": "Efs Efp Combination Buyer Cf",
      "1014": "Efs Efp Combination Seller Cf",
      "1015": "Otc Standard Cio",
      "1016": "Otc Combination Cio",
      "1017": "Otc Combination Buyer Cio",
      "1018": "Otc Combination Seller Cio",
      "1019": "Standard Trade Cd",
      "1020": "Standard Outside Spread Cd",
      "1021": "Combination Cd",
      "1022": "Old Cd",
      "1023": "Internal Cd",
      "1024": "Portfolio Cd",
      "1025": "Correction Cd",
      "1026": "Exchange Granted Fd",
      "1027": "Standard Outside Fd",
      "1028": "Off Hours Fd",
      "1029": "Block Fd",
      "1030": "Exch Granted Exceed Max Lot Fd",
      "1031": "Exch Granted Eml Off Hours Fd",
      "1032": "Exch Granted Late Fd",
      "1033": "Flex Contract Conversion Fd",
      "1034": "Ice Efrp",
      "1035": "Iceblk",
      "1036": "Basis",
      "1037": "Volatility Contingent",
      "1038": "Stock Contingent",
      "1039": "Ccx Efp",
      "1040": "Other Clearing Value",
      "1041": "N2ex",
      "1042": "Eex",
      "1043": "Efs Efp Contra",
      "1044": "Efm",
      "1045": "Ng Efp Efs",
      "1046": "Contra",
      "1047": "Cpblk",
      "1048": "Bilateral Off Exch",
      "1049": "Otc Privately Negotiated Trades",
      "1050": "Otc Large Notional Off Facility Swap",
      "1051": "Block Swap Trade",
      "1052": "Large In Scale",
      "1053": "Against Actual",
      "1054": "Large In Scale Package",
      "1055": "Guaranteed Cross",
      "1056": "Request For Cross",
      "1057": "Efp Cd",
      "1058": "B And S No Clearing Cd",
      "1059": "Buyer No Clearing Cd",
      "1060": "Seller No Clearing Cd",
      "1061": "Efp No Fee Cd",
      "1062": "Match Exch Manually Cd",
      "1063": "Match Exch Combination Cd",
      "1064": "Fut Ds Fut Combo Cd",
      "1065": "Block Nonfinancial Cp Cd",
      "1066": "Exch For Swap Options Cd",
      "1067": "Block Nonfinancial Cp Cf",
      "1068": "Exch For Swap Options Cf",
      "1069": "Asset Allocation",
      "1070": "Cross Contra Trade",
      "1071": "Committed",
      "1072": "Internal",
      "1073": "Interbank",
      "1074": "One Sided",
      "1075": "Cross",
      "1076": "Efp Bond",
      "1077": "Efp Spi Xjo",
      "1078": "Cash Related Trade",
      "1079": "Non Disclosed Otc Trade",
      "1080": "Disclosed Otc Trade",
      "1081": "Si Trade",
      "1082": "Eurex Enlight Triggered Trade",
      "1083": "Efp Against Actual",
      "1084": "Efr",
      "1085": "Eoo",
      "1086": "Tam",
      "1087": "Efs",
      "1088": "Lp",
      "9999": "Unknown"
    }
  },
  "829": {
    "name": "TrdSubType",
    "type": "INT",
    "values": {
      "1": "Trade Purpose Arbitrage",
      "2": "Trade Purpose Combination",
      "3": "Trade Purpose Cross Trade",
      "4": "Trade Purpose Exchange For Physical",
      "5": "Trade Purpose Position Consolidation",
      "6": "Trade Purpose Rollover",
      "7": "Trade Purpose Other",
      "8": "Trade Purpose Implied Spread Leg Executed Against An Outright",
      "36": "Trade Purpose Converted Swap",
      "37": "Trade Purpose Crossed Trade",
      "40": "Trade Purpose Traded At Settlement",
      "42": "Trade Purpose Auction Trade",
      "43": "Trade Purpose Traded At Marker",
      "48": "Trade Purpose Multilateral Compression",
      "200": "Trade Purpose Delivery Transfer"
    }
  },
  "851": {
    "name": "LastLiquidityIndicator",
    "type": "INT",
    "values": {
      "1": "Added Liquidity",
      "2": "Removed Liquidity"
    }
  },
  "856": {
    "name": "TradeReportType",
    "type": "INT",
    "values": {
      "0": "Submit",
      "1": "Alleged",
      "2": "Accept",
      "3": "Decline",
      "5": "No Was",
      "6": "Cancel",
      "11": "Alleged New",
      "13": "Alleged No Was",
      "101": "Notification",
      "102": "Waiting For Cancel Approval",
      "103": "Partially Filled",
      "999": "Unknown",
      "1000": "Clearing"
    }
  },
  "857": {
    "name": "AllocNoOrdersType",
    "type": "INT",
    "values": {
      "0": "Not Specified",
      "1": "Explicit List Provided"
    }
  },
  "860": {
    "name": "AvgParPx",
    "type": "PRICE"
  },
  "864": {
    "name": "NoEvents",
    "type": "NUMINGROUP"
  },
  "865": {
    "name": "EventType",
    "type": "INT",
    "values": {
      "5": "Expiry Date",
      "6": "Last Trading Date",
      "8": "Swap Start Date",
      "9": "Swap End Date",
      "13": "First Delivery Date",
      "14": "Last Delivery Date",
      "101": "First Trading Date",
      "102": "Sdat First Trading Date"
    }
  },
  "866": {
    "name": "EventDate",
    "type": "LOCALMKTDATE"
  },
  "870": {
    "name": "NoInstrumentExtensions",
    "type": "NUMINGROUP"
  },
  "871": {
    "name": "InstrumentAttributeType",
    "type": "INT",
    "values": {
      "5": "Variable Rate",
      "100": "Coupon Rate",
      "101": "Offset To Variable Coupon Rate",
      "102": "Swap Customer 1",
      "103": "Swap Customer 2",
      "104": "Cash Basket Reference"
    }
  },
  "872": {
    "name": "InstrumentAttributeValue",
    "type": "STRING"
  },
  "879": {
    "name": "UnderlyingQty",
    "type": "QTY"
  },
  "880": {
    "name": "TrdMatchID",
    "type": "STRING"
  },
  "887": {
    "name": "NoUnderlyingStipulations",
    "type": "NUMINGROUP"
  },
  "888": {
    "name": "UnderlyingStipulationType",
    "type": "INT",
    "values": {
      "1": "Payfreq"
    }
  },
  "889": {
    "name": "UnderlyingStipulationValue",
    "type": "STRING",
    "values": {
      "12": "Monthly",
      "01": "Annually",
      "02": "Semi Annually",
      "04": "Quarterly"
    }
  },
  "912": {
    "name": "LastRptRequested",
    "type": "BOOLEAN"
  },
  "916": {
    "name": "StartDate",
    "type": "UTCTIMESTAMP"
  },
  "917": {
    "name": "EndDate",
    "type": "UTCTIMESTAMP"
  },
  "939": {
    "name": "TrdRptStatus",
    "type": "INT",
    "values": {
      "0": "Accepted",
      "1": "Rejected",
      "3": "Accepted With Errors",
      "99": "Unknown"
    }
  },
  "957": {
    "name": "NoStrategyParameters",
    "type": "NUMINGROUP"
  },
  "958": {
    "name": "StrategyParameterName",
    "type": "STRING"
  },
  "959": {
    "name": "StrategyParameterType",
    "type": "INT",
    "values": {
      "1": "Int",
      "6": "Float",
      "7": "Qty",
      "8": "Price",
      "13": "Boolean",
      "14": "String",
      "19": "Utctimestamp"
    }
  },
  "960": {
    "name": "StrategyParameterValue",
    "type": "STRING"
  },
  "961": {
    "name": "HostCrossID",
    "type": "STRING"
  },
  "1003": {
    "name": "TradeID",
    "type": "STRING"
  },
  "1028": {
    "name": "ManualOrderIndicator",
    "type": "BOOLEAN",
    "values": {
      "N": "Electronic",
      "Y": "Manual"
    }
  },
  "1031": {
    "name": "CustOrderHandlingInst",
    "type": "CHAR",
    "values": {
      "W": "Desk",
      "Y": "Electronic",
      "C": "Vendor Platform Billed By Executing Broker",
      "G": "Sponsored Access Via Api Or Fix By Executing Broker",
      "H": "Premium Algo Trading Provider Billed By Executing Broker",
      "D": "Other"
    }
  },
  "1047": {
    "name": "AllocPositionEffect",
    "type": "CHAR",
    "values": {
      "O": "Open",
      "C": "Close",
      "R": "Rolled",
      "F": "Fifo",
      "N": "Close But Notify On Open",
      "D": "Default"
    }
  },
  "1057": {
    "name": "AggressorIndicator",
    "type": "BOOLEAN",
    "values": {
      "N": "No",
      "Y": "Yes"
    }
  },
  "1071": {
    "name": "LastSwapPoints",
    "type": "PRICEOFFSET"
  },
  "1088": {
    "name": "RefreshQty",
    "type": "QTY"
  },
  "1116": {
    "name": "NoRootPartyIDs",
    "type": "NUMINGROUP"
  },
  "1117": {
    "name": "RootPartyID",
    "type": "STRING"
  },
  "1118": {
    "name": "RootPartyIDSource",
    "type": "CHAR",
    "values": {
      "F": "Settlement Entity Location"
    }
  },
  "1119": {
    "name": "RootPartyRole",
    "type": "INT",
    "values": {
      "10": "Settlement Location"
    }
  },
  "1123": {
    "name": "TradeHandlingInstr",
    "type": "CHAR",
    "values": {
      "0": "Trade Confirmation",
      "1": "Two Party Report",
      "2": "One Party Report For Matching",
      "3": "One Party Report For Pass Through",
      "4": "Automated Floor Order Routing",
      "7": "Third Party Report For Pass Through",
      "8": "Trade Handling Instr Pending Trade Report",
      "9": "Trade Handling Instr Completed Trade Report",
      "A": "Trade Handling Instr Expired Trade Report",
      "B": "Trade Handling Instr Broadcast",
      "C": "Trade Handling Instr Pending Approval",
      "D": "Trade Handling Instr Approved",
      "E": "Trade Handling Instr Pending Cancel"
    }
  },
  "1125": {
    "name": "OrigTradeDate",
    "type": "LOCALMKTDATE"
  },
  "1126": {
    "name": "OrigTradeID",
    "type": "STRING"
  },
  "1138": {
    "name": "DisplayQty",
    "type": "QTY"
  },
  "1145": {
    "name": "EventTime",
    "type": "UTCTIMESTAMP"
  },
  "1152": {
    "name": "LegNumber",
    "type": "INT"
  },
  "1188": {
    "name": "Volatility",
    "type": "STRING"
  },
  "1189": {
    "name": "ExpirationTimeValue",
    "type": "FLOAT"
  },
  "1190": {
    "name": "RiskFreeRate",
    "type": "PRICE"
  },
  "1194": {
    "name": "ExerciseStyle",
    "type": "INT"
  },
  "1227": {
    "name": "ProductComplex",
    "type": "STRING"
  },
  "1358": {
    "name": "LegPutOrCall",
    "type": "INT"
  },
  "1362": {
    "name": "NoFills",
    "type": "NUMINGROUP"
  },
  "1363": {
    "name": "FillExecID",
    "type": "STRING"
  },
  "1364": {
    "name": "FillPx",
    "type": "PRICE"
  },
  "1365": {
    "name": "FillQty",
    "type": "QTY"
  },
  "1366": {
    "name": "LegAllocID",
    "type": "STRING"
  },
  "1385": {
    "name": "ContingencyType",
    "type": "INT",
    "values": {
      "1": "One Cancels The Other",
      "2": "One Triggers The Other",
      "3": "One Updates The Other 3",
      "4": "One Updates The Other 4"
    }
  },
  "1390": {
    "name": "TradePublishIndicator",
    "type": "INT",
    "values": {
      "0": "Do Not Publish Trade",
      "1": "Publish Trade",
      "2": "Deferred Publication"
    }
  },
  "1418": {
    "name": "LegLastQty",
    "type": "QTY"
  },
  "1420": {
    "name": "LegExerciseStyle",
    "type": "INT"
  },
  "1461": {
    "name": "NoTargetPartyIDs",
    "type": "NUMINGROUP"
  },
  "1462": {
    "name": "TargetPartyExchangeTraderID",
    "type": "STRING"
  },
  "1622": {
    "name": "FillYieldType",
    "type": "STRING"
  },
  "1724": {
    "name": "OrderOrigination",
    "type": "INT",
    "values": {
      "1": "Order Received From Customer",
      "2": "Order Received From Within Firm",
      "3": "Order Received From Another Broker Dealer",
      "4": "Order Received From Customer Or Originated Within Firm",
      "5": "Order Received From Direct Or Sponsored Access Customer",
      "99": "Order Received From Other Non Dea"
    }
  },
  "1795": {
    "name": "NoOrderEvents",
    "type": "NUMINGROUP"
  },
  "1796": {
    "name": "OrderEventType",
    "type": "INT",
    "values": {
      "1": "Added",
      "2": "Modified",
      "3": "Deleted",
      "4": "Partially Filled",
      "5": "Filled",
      "6": "Suspended",
      "7": "Released",
      "8": "Restated",
      "9": "Locked",
      "10": "Triggered",
      "11": "Activated"
    }
  },
  "1797": {
    "name": "OrderEventExecID",
    "type": "STRING"
  },
  "1798": {
    "name": "OrderEventReason",
    "type": "INT",
    "values": {
      "1": "Add Order Request",
      "2": "Modify Order Request",
      "3": "Delete Order Request",
      "4": "Order Entered Out Of Band",
      "5": "Order Modified Out Of Band",
      "6": "Order Deleted Out Of Band",
      "7": "Order Activated Or Triggered",
      "8": "Order Expired",
      "9": "Reserve Order Refreshed",
      "10": "Away Market Better",
      "11": "Corporate Action",
      "12": "Start Of Day",
      "13": "End Of Day",
      "100": "Binary Trade Reporting"
    }
  },
  "1799": {
    "name": "OrderEventPx",
    "type": "PRICE"
  },
  "1800": {
    "name": "OrderEventQty",
    "type": "QTY"
  },
  "1801": {
    "name": "OrderEventLiquidityIndicator",
    "type": "INT",
    "values": {
      "0": "Neither Added Nor Removed Liquidity",
      "1": "Added Liquidity",
      "2": "Removed Liquidity",
      "3": "Liquidity Routed Out",
      "4": "Auction Execution",
      "5": "Triggered Stop Order",
      "6": "Triggered Contingency Order",
      "7": "Triggered Market Order",
      "8": "Removed Liquidity After Firm Order Commitment",
      "9": "Auction Execution After Firm Order Commitment",
      "10": "Unknown",
      "11": "Other"
    }
  },
  "1802": {
    "name": "OrderEventText",
    "type": "STRING"
  },
  "1856": {
    "name": "RelatedTradeID",
    "type": "STRING"
  },
  "1860": {
    "name": "RelatedTradeQty",
    "type": "QTY"
  },
  "2376": {
    "name": "PartyRoleQualifier",
    "type": "INT",
    "values": {
      "22": "Algorithm",
      "23": "Firm Or Legal Entity",
      "24": "Natural Person"
    }
  },
  "2404": {
    "name": "ComplianceText",
    "type": "STRING"
  },
  "2446": {
    "name": "AggressorSide",
    "type": "INT",
    "values": {
      "0": "No Aggressor",
      "1": "Buy",
      "2": "Sell"
    }
  },
  "2593": {
    "name": "NoOrderAttributes",
    "type": "INT"
  },
  "2594": {
    "name": "OrderAttributeType",
    "type": "INT",
    "values": {
      "0": "Aggregated Order",
      "1": "Pending Allocation",
      "2": "Liquidity Provision Activity Order",
      "3": "Risk Reduction Order",
      "4": "Algorithmic Order",
      "5": "Systematic Internalizer Order"
    }
  },
  "2595": {
    "name": "OrderAttributeValue",
    "type": "STRING"
  },
  "5024": {
    "name": "StartSequenceNumber",
    "type": "SEQNUM"
  },
  "7111": {
    "name": "AllocStrategy",
    "type": "STRING"
  },
  "7928": {
    "name": "SelfMatchPreventionID",
    "type": "STRING"
  },
  "8000": {
    "name": "SMPInstruction",
    "type": "CHAR",
    "values": {
      "O": "Smp Inst Type Cancel Resting",
      "N": "Smp Inst Type Cancel Aggressor",
      "B": "Smp Inst Type Cancel Both",
      "M": "Smp Inst Type Match",
      "m": "Smp Inst Type Not Match",
      "S": "Smp Inst Type Smallest",
      "D": "Smp Inst Type Decrement Larger",
      "d": "Smp Inst Type Decrement Leaves Qty",
      "e": "Smp Inst Type Market Wide",
      "f": "Smp Inst Type Market Wide Cancel Aggressor",
      "g": "Smp Inst Type Market Wide Cancel Resting",
      "h": "Smp Inst Type Market Wide Decrement Leaves Qty"
    }
  },
  "8013": {
    "name": "TrdRegPublicationReason",
    "type": "INT",
    "values": {
      "4": "Ilqd",
      "5": "Size",
      "6": "Lrgs"
    }
  },
  "8016": {
    "name": "TradingVenueRegulatoryTradeID",
    "type": "STRING"
  },
  "9012": {
    "name": "IsFirm",
    "type": "INT",
    "values": {
      "1": "Firm",
      "2": "Last Look"
    }
  },
  "9020": {
    "name": "FixingDate",
    "type": "LOCALMKTDATE"
  },
  "9021": {
    "name": "FixingSource",
    "type": "STRING"
  },
  "9032": {
    "name": "ReportingParty",
    "type": "BOOLEAN"
  },
  "9103": {
    "name": "MaxParticipation",
    "type": "FLOAT"
  },
  "9106": {
    "name": "IWouldPrice",
    "type": "FLOAT"
  },
  "9111": {
    "name": "Aggression",
    "type": "INT"
  },
  "9112": {
    "name": "TiltMode",
    "type": "INT"
  },
  "9115": {
    "name": "BriskLimitMode",
    "type": "INT"
  },
  "9117": {
    "name": "BlockLimit",
    "type": "INT"
  },
  "9120": {
    "name": "LiquidityIndicator",
    "type": "CHAR",
    "values": {
      "A": "Added Liquidity",
      "R": "Removed Liquidity"
    }
  },
  "9121": {
    "name": "MemoFieldICE",
    "type": "STRING"
  },
  "9139": {
    "name": "OriginatorUserID",
    "type": "STRING"
  },
  "9145": {
    "name": "Tracking",
    "type": "INT"
  },
  "9147": {
    "name": "MinParticipation",
    "type": "FLOAT"
  },
  "9190": {
    "name": "IfTouchedPrice",
    "type": "FLOAT"
  },
  "9191": {
    "name": "PostTriggerDuration",
    "type": "INT"
  },
  "9200": {
    "name": "SubStrategy",
    "type": "STRING"
  },
  "9202": {
    "name": "DurationRCM",
    "type": "INT"
  },
  "9203": {
    "name": "EndTimeOverride",
    "type": "INT",
    "values": {
      "0": "None",
      "1": "Last Session Close",
      "2": "Next Session Close",
      "3": "Settlement"
    }
  },
  "9207": {
    "name": "CustomerAccountRefID",
    "type": "STRING"
  },
  "9210": {
    "name": "MaxShowRCM",
    "type": "INT"
  },
  "9211": {
    "name": "MinShow",
    "type": "INT"
  },
  "9212": {
    "name": "PassivePriceLevel",
    "type": "INT"
  },
  "9213": {
    "name": "NumPostLevels",
    "type": "INT"
  },
  "9214": {
    "name": "AverageDelay",
    "type": "FLOAT"
  },
  "9215": {
    "name": "IWouldQty",
    "type": "INT"
  },
  "9216": {
    "name": "IWouldQtyPct",
    "type": "FLOAT"
  },
  "9217": {
    "name": "WithATickQty",
    "type": "INT"
  },
  "9218": {
    "name": "WithATickQtyPct",
    "type": "FLOAT"
  },
  "9219": {
    "name": "CleanupPct",
    "type": "FLOAT"
  },
  "9220": {
    "name": "PostTicksApart",
    "type": "INT"
  },
  "9221": {
    "name": "MaxSpreadCrossTicks",
    "type": "INT"
  },
  "9222": {
    "name": "TacticalPeg",
    "type": "BOOLEAN"
  },
  "9225": {
    "name": "IWouldQtyVariancePct",
    "type": "FLOAT"
  },
  "9302": {
    "name": "DynamicEndTime",
    "type": "BOOLEAN"
  },
  "9700": {
    "name": "DirectElectronicAccess",
    "type": "INT",
    "values": {
      "0": "No",
      "1": "Yes"
    }
  },
  "9701": {
    "name": "TradingCapacity",
    "type": "INT",
    "values": {
      "0": "Deal",
      "1": "Mtch",
      "2": "Aotc"
    }
  },
  "9702": {
    "name": "LiquidityProvision",
    "type": "INT",
    "values": {
      "0": "No",
      "1": "Yes"
    }
  },
  "9703": {
    "name": "OriginalSecondaryExecID",
    "type": "STRING"
  },
  "9704": {
    "name": "InvestmentDecision",
    "type": "INT"
  },
  "9705": {
    "name": "ExecutionDecision",
    "type": "INT"
  },
  "9706": {
    "name": "ClientIDCode",
    "type": "INT"
  },
  "9707": {
    "name": "MiFIDID",
    "type": "STRING"
  },
  "9717": {
    "name": "CorrelationClOrdID",
    "type": "STRING"
  },
  "9787": {
    "name": "DisplayFactor",
    "type": "STRING"
  },
  "9821": {
    "name": "SelfMatchPreventionIDICE",
    "type": "STRING"
  },
  "9822": {
    "name": "SelfMatchPreventionInstruction",
    "type": "CHAR"
  },
  "9991": {
    "name": "LegRiskAversion",
    "type": "INT"
  },
  "9992": {
    "name": "HedgeDiscretionTicks",
    "type": "INT"
  },
  "10010": {
    "name": "DisplayFactorQty",
    "type": "STRING"
  },
  "10011": {
    "name": "TTClOrdID",
    "type": "STRING"
  },
  "10553": {
    "name": "TTID",
    "type": "STRING"
  },
  "10555": {
    "name": "NoTCRLegs",
    "type": "NUMINGROUP"
  },
  "16000": {
    "name": "Timezone",
    "type": "STRING"
  },
  "16052": {
    "name": "ExchangeSendingTime",
    "type": "STRING"
  },
  "16060": {
    "name": "ExchangeTransactTime",
    "type": "STRING"
  },
  "16106": {
    "name": "StagedOrderMsg",
    "type": "STRING"
  },
  "16109": {
    "name": "StagedOrderStatus",
    "type": "CHAR",
    "values": {
      "A": "Available",
      "O": "Owned"
    }
  },
  "16110": {
    "name": "StagedOrderOwner",
    "type": "STRING"
  },
  "16112": {
    "name": "NoLinks",
    "type": "INT"
  },
  "16113": {
    "name": "LinkID",
    "type": "STRING"
  },
  "16114": {
    "name": "LinkType",
    "type": "CHAR",
    "values": {
      "7": "Staged Child",
      "8": "Staged Bulked Child",
      "9": "Staged Stiched Child",
      "P": "Parent Order Id",
      "X": "Position Transfer Id",
      "A": "Staged Split Child",
      "E": "Unique Exec Id Allocated From",
      "R": "Root Algo Order Id",
      "F": "Parent Account Id"
    }
  },
  "16115": {
    "name": "ExternalSource",
    "type": "BOOLEAN"
  },
  "16116": {
    "name": "OrderIDGUID",
    "type": "STRING"
  },
  "16117": {
    "name": "OrderSource",
    "type": "INT",
    "values": {
      "0": "Source Ase",
      "2": "Source Ntw",
      "3": "Source Invalid",
      "4": "Source T Trader",
      "6": "Source Mobile",
      "7": "Source Roe",
      "9": "Source External",
      "10": "Source Fix Adapter",
      "11": "Source Aggregator",
      "12": "Source Bouncer",
      "13": "Source Lambda Liquidator",
      "14": "Source External Fix Adapter",
      "15": "Source Prime Ase",
      "16": "Source Nimbus",
      "17": "Source Adl",
      "18": "Source Ttsdk",
      "19": "Source Tt Algo",
      "20": "Source Adl Prime",
      "21": "Source Ttsdk Prime",
      "22": "Source Tt Algo Prime",
      "23": "Source Chart",
      "24": "Source Ttd",
      "25": "Source Ttd Chart",
      "26": "Source Ttint",
      "27": "Source Tt Admin",
      "28": "Source Dotnet Api Clt",
      "29": "Source Dotnet Api Srv",
      "30": "Source Cpp Api",
      "31": "Source Options Risk",
      "32": "Source External Upload",
      "33": "Source Stager",
      "34": "Source Score",
      "35": "Source Fix Adapter Child Router",
      "36": "Source Pot Child Router",
      "37": "Source Terminator"
    }
  },
  "16118": {
    "name": "FillTradingVenueRegulatoryTradeID",
    "type": "STRING"
  },
  "16119": {
    "name": "FillLastLiquidityIndicator",
    "type": "INT",
    "values": {
      "1": "Added Liquidity",
      "2": "Removed Liquidity"
    }
  },
  "16120": {
    "name": "LegNoFills",
    "type": "NUMINGROUP"
  },
  "16121": {
    "name": "LegFillExecID",
    "type": "STRING"
  },
  "16122": {
    "name": "LegFillPx",
    "type": "PRICE"
  },
  "16123": {
    "name": "LegFillQty",
    "type": "QTY"
  },
  "16124": {
    "name": "LegFillTradingVenueRegulatoryTradeID",
    "type": "STRING"
  },
  "16125": {
    "name": "LegFillLastLiquidityIndicator",
    "type": "INT",
    "values": {
      "1": "Added Liquidity",
      "2": "Removed Liquidity"
    }
  },
  "16130": {
    "name": "IntentToCross",
    "type": "BOOLEAN"
  },
  "16131": {
    "name": "RejectSource",
    "type": "INT",
    "values": {
      "1": "Reject Source Edge",
      "2": "Reject Source Risk",
      "3": "Reject Source Gateway",
      "4": "Reject Source Exchange",
      "5": "Reject Source Algo",
      "6": "Reject Source Ase",
      "7": "Reject Source Ttint",
      "8": "Reject Source External",
      "9": "Reject Source Ttapi",
      "10": "Reject Source Client App",
      "11": "Reject Source Fix Adapter",
      "12": "Reject Source Stager",
      "13": "Reject Source Options Risk"
    }
  },
  "16207": {
    "name": "BloombergSecurityExchange",
    "type": "STRING"
  },
  "16451": {
    "name": "PriceDisplayType",
    "type": "INT"
  },
  "16456": {
    "name": "NumTickTblEntries",
    "type": "INT"
  },
  "16457": {
    "name": "NumTicks",
    "type": "INT"
  },
  "16458": {
    "name": "MaxPrice",
    "type": "PRICE"
  },
  "16460": {
    "name": "MinLotSize",
    "type": "INT"
  },
  "16463": {
    "name": "NumberOfBlocks",
    "type": "INT"
  },
  "16464": {
    "name": "TradesInFlow",
    "type": "CHAR"
  },
  "16552": {
    "name": "ExchTickSize",
    "type": "FLOAT"
  },
  "16554": {
    "name": "ExchPointValue",
    "type": "FLOAT"
  },
  "16556": {
    "name": "TextA",
    "type": "STRING"
  },
  "16557": {
    "name": "TextB",
    "type": "STRING"
  },
  "16558": {
    "name": "TextTT",
    "type": "STRING"
  },
  "16559": {
    "name": "TextC",
    "type": "STRING"
  },
  "16561": {
    "name": "TimeReceivedFromExchange",
    "type": "UTCTIMESTAMP"
  },
  "16566": {
    "name": "DropCopyOrder",
    "type": "BOOLEAN",
    "values": {
      "Y": "Yes",
      "N": "No"
    }
  },
  "16567": {
    "name": "ByPassSessionRecovery",
    "type": "BOOLEAN"
  },
  "16568": {
    "name": "LegAvgPx",
    "type": "PRICE"
  },
  "16601": {
    "name": "EchoDC_01",
    "type": "STRING"
  },
  "16602": {
    "name": "EchoDC_02",
    "type": "STRING"
  },
  "16603": {
    "name": "EchoDC_03",
    "type": "STRING"
  },
  "16604": {
    "name": "EchoDC_04",
    "type": "STRING"
  },
  "16605": {
    "name": "EchoDC_05",
    "type": "STRING"
  },
  "16606": {
    "name": "EchoDC_06",
    "type": "STRING"
  },
  "16607": {
    "name": "EchoDC_07",
    "type": "STRING"
  },
  "16608": {
    "name": "EchoDC_08",
    "type": "STRING"
  },
  "16609": {
    "name": "EchoDC_09",
    "type": "STRING"
  },
  "16610": {
    "name": "EchoDC_10",
    "type": "STRING"
  },
  "16611": {
    "name": "MlegHeadExecId",
    "type": "STRING"
  },
  "16612": {
    "name": "UniqueExecID",
    "type": "STRING"
  },
  "16615": {
    "name": "LegTTRoutingAccount",
    "type": "STRING"
  },
  "16616": {
    "name": "LegBloombergSecurityExchange",
    "type": "STRING"
  },
  "16623": {
    "name": "SpreadLegRatioQty",
    "type": "FLOAT"
  },
  "16624": {
    "name": "AccountRiskGroup",
    "type": "STRING"
  },
  "16625": {
    "name": "TextTTModifyingUser",
    "type": "STRING"
  },
  "16626": {
    "name": "NVDR",
    "type": "BOOLEAN",
    "values": {
      "Y": "Yes",
      "N": "No"
    }
  },
  "16627": {
    "name": "TTF",
    "type": "BOOLEAN",
    "values": {
      "Y": "Yes",
      "N": "No"
    }
  },
  "16628": {
    "name": "TFUserType",
    "type": "CHAR",
    "values": {
      "T": "Traditional Trading",
      "P": "Program Trading",
      "M": "Market Making",
      "G": "Market Making With Program Trading"
    }
  },
  "16631": {
    "name": "EchoDC_11",
    "type": "STRING"
  },
  "16632": {
    "name": "EchoDC_12",
    "type": "STRING"
  },
  "16633": {
    "name": "EchoDC_13",
    "type": "STRING"
  },
  "16634": {
    "name": "EchoDC_14",
    "type": "STRING"
  },
  "16635": {
    "name": "EchoDC_15",
    "type": "STRING"
  },
  "16636": {
    "name": "EchoDC_16",
    "type": "STRING"
  },
  "16637": {
    "name": "EchoDC_17",
    "type": "STRING"
  },
  "16638": {
    "name": "EchoDC_18",
    "type": "STRING"
  },
  "16639": {
    "name": "EchoDC_19",
    "type": "STRING"
  },
  "16640": {
    "name": "EchoDC_20",
    "type": "STRING"
  },
  "16700": {
    "name": "PriceFormula",
    "type": "STRING"
  },
  "16701": {
    "name": "ReloadOffset",
    "type": "INT"
  },
  "16702": {
    "name": "OverrideTickNumerator",
    "type": "INT"
  },
  "16703": {
    "name": "FormulaBasedOn",
    "type": "STRING",
    "values": {
      "price_diff": "Price Diff",
      "ratio": "Ratio",
      "net_change": "Net Change",
      "custom": "Custom"
    }
  },
  "16704": {
    "name": "ReloadDelay",
    "type": "INT"
  },
  "16705": {
    "name": "DisclosedQty",
    "type": "QTY"
  },
  "16706": {
    "name": "Reload",
    "type": "BOOLEAN"
  },
  "16707": {
    "name": "OverrideTickSize",
    "type": "BOOLEAN"
  },
  "16708": {
    "name": "OverrideTickDenominator",
    "type": "INT"
  },
  "16728": {
    "name": "TotalNumOrders",
    "type": "INT"
  },
  "16751": {
    "name": "Multiplier",
    "type": "FLOAT"
  },
  "16752": {
    "name": "IsHedging",
    "type": "BOOLEAN"
  },
  "16753": {
    "name": "QueueHolder",
    "type": "QTY"
  },
  "16754": {
    "name": "MLQ",
    "type": "STRING"
  },
  "16755": {
    "name": "PayupTicks",
    "type": "INT"
  },
  "16756": {
    "name": "IsQuoting",
    "type": "BOOLEAN"
  },
  "16757": {
    "name": "ConvertQuoteToHedge",
    "type": "INT",
    "values": {
      "1": "Attempt",
      "2": "Always",
      "3": "Always Preserve Queue"
    }
  },
  "16758": {
    "name": "IsLeanIndicative",
    "type": "BOOLEAN"
  },
  "16759": {
    "name": "IsShared",
    "type": "BOOLEAN"
  },
  "16760": {
    "name": "LegRatioExt",
    "type": "INT"
  },
  "16761": {
    "name": "InsertTime",
    "type": "UTCTIMESTAMP"
  },
  "16762": {
    "name": "DefSecuritySubTypeID",
    "type": "INT"
  },
  "16847": {
    "name": "TargetStrategyName",
    "type": "STRING"
  },
  "16848": {
    "name": "TargetStrategyType",
    "type": "INT",
    "values": {
      "0": "Adl",
      "1": "Sse",
      "3": "Bank Algo",
      "12": "Core Sdk"
    }
  },
  "16849": {
    "name": "SideTextA",
    "type": "STRING"
  },
  "16850": {
    "name": "SideTextB",
    "type": "STRING"
  },
  "16851": {
    "name": "SideTextC",
    "type": "STRING"
  },
  "16852": {
    "name": "ParentVendorOrderID",
    "type": "STRING"
  },
  "16853": {
    "name": "ParentVendorUserID",
    "type": "STRING"
  },
  "16854": {
    "name": "ParentVendorAccountID",
    "type": "STRING"
  },
  "16855": {
    "name": "ParentVendorBrokerID",
    "type": "STRING"
  },
  "16856": {
    "name": "ParentVendorProfileID",
    "type": "STRING"
  },
  "16857": {
    "name": "TTSMPID",
    "type": "STRING"
  },
  "16858": {
    "name": "TTSMPInstruction",
    "type": "INT",
    "values": {
      "1": "Tt Smp Inst Reject New",
      "3": "Tt Smp Inst Cancel Resting",
      "4": "Tt Smp Inst Internalization",
      "6": "Tt Smp Inst Internalize Best",
      "10": "Tt Smp Inst Internalize Allow Split",
      "11": "Tt Smp Inst Internalize Best Allow Split"
    }
  },
  "16859": {
    "name": "QuoteAckStatus",
    "type": "INT",
    "values": {
      "0": "Quote Request Status Ok",
      "5": "Quote Request Status Rejected"
    }
  },
  "16860": {
    "name": "ParentVendorAlgoID",
    "type": "STRING"
  },
  "16861": {
    "name": "ParentVendorAlgoType",
    "type": "STRING"
  },
  "16874": {
    "name": "LegParentVendorAccountID",
    "type": "STRING"
  },
  "16875": {
    "name": "NewsReportID",
    "type": "STRING"
  },
  "16901": {
    "name": "BracketOrderType",
    "type": "INT",
    "values": {
      "0": "Limit",
      "1": "Stop Limit",
      "2": "Stop Market"
    }
  },
  "16902": {
    "name": "BracketStopLimitOffset",
    "type": "INT"
  },
  "16903": {
    "name": "ChildTIF",
    "type": "CHAR",
    "values": {
      "0": "Day",
      "1": "Good Till Cancel",
      "2": "At The Opening",
      "3": "Immediate Or Cancel",
      "4": "Fill Or Kill",
      "5": "Good Till Crossing",
      "6": "Good Till Date",
      "7": "At The Close",
      "8": "Good Through Crossing",
      "9": "At Crossing",
      "A": "Auction",
      "V": "Good In Session",
      "W": "Day Plus",
      "X": "Good Till Cancel Plus",
      "Y": "Good Till Date Plus"
    }
  },
  "16904": {
    "name": "DiscVal",
    "type": "INT"
  },
  "16905": {
    "name": "DiscValType",
    "type": "INT"
  },
  "16906": {
    "name": "ETimeAct",
    "type": "INT",
    "values": {
      "1": "Cancel",
      "2": "Gotomarket"
    }
  },
  "16907": {
    "name": "Interval",
    "type": "INT"
  },
  "16908": {
    "name": "IsTrlTrg",
    "type": "STRING"
  },
  "16909": {
    "name": "LeftoverAction",
    "type": "INT",
    "values": {
      "0": "Leave",
      "1": "Payup",
      "2": "Merge",
      "3": "Gotomarket"
    }
  },
  "16910": {
    "name": "LeftoverTicks",
    "type": "INT"
  },
  "16911": {
    "name": "LimitPriceType",
    "type": "INT"
  },
  "16912": {
    "name": "LimitTicksAway",
    "type": "INT"
  },
  "16913": {
    "name": "OcoStopTriggerPrice",
    "type": "PRICE"
  },
  "16914": {
    "name": "ProfitTarget",
    "type": "INT"
  },
  "16915": {
    "name": "StopLimitOffset",
    "type": "INT"
  },
  "16916": {
    "name": "StopOrderType",
    "type": "INT",
    "values": {
      "1": "Limit",
      "2": "Market",
      "3": "Tt Stop"
    }
  },
  "16917": {
    "name": "StopTarget",
    "type": "INT"
  },
  "16918": {
    "name": "TriggerPriceType",
    "type": "INT",
    "values": {
      "1": "Bid",
      "2": "Ask",
      "3": "Ltp",
      "6": "Sameside",
      "7": "Oppositeside"
    }
  },
  "16919": {
    "name": "TriggerTicksAway",
    "type": "INT"
  },
  "16920": {
    "name": "TriggerType",
    "type": "INT",
    "values": {
      "1": "Stop",
      "2": "It"
    }
  },
  "16921": {
    "name": "WithATickType",
    "type": "INT",
    "values": {
      "1": "Qty",
      "2": "Percent"
    }
  },
  "16922": {
    "name": "WithATick",
    "type": "INT"
  },
  "16923": {
    "name": "TriggerQtyType",
    "type": "INT",
    "values": {
      "1": "Qty",
      "2": "Percent"
    }
  },
  "16924": {
    "name": "TriggerQtyCompare",
    "type": "INT",
    "values": {
      "3": "Lte",
      "5": "Gte"
    }
  },
  "16925": {
    "name": "TriggerQty",
    "type": "INT"
  },
  "16926": {
    "name": "TriggerLTPReset",
    "type": "BOOLEAN"
  },
  "16927": {
    "name": "TTStopLimitPriceType",
    "type": "INT",
    "values": {
      "1": "Bid",
      "2": "Ask",
      "3": "Ltp"
    }
  },
  "16928": {
    "name": "TTStopWithATickType",
    "type": "INT",
    "values": {
      "1": "Qty",
      "2": "Percent"
    }
  },
  "16929": {
    "name": "TTStopWithATick",
    "type": "INT"
  },
  "16930": {
    "name": "Payup",
    "type": "INT"
  },
  "16931": {
    "name": "TTStopTriggerPriceType",
    "type": "INT",
    "values": {
      "1": "Bid",
      "2": "Ask",
      "3": "Ltp"
    }
  },
  "16932": {
    "name": "TTStopIsTrlTrg",
    "type": "BOOLEAN",
    "values": {
      "Y": "Yes",
      "N": "No"
    }
  },
  "16933": {
    "name": "TTStopTriggerTicksAway",
    "type": "INT"
  },
  "16934": {
    "name": "TTStopTriggerQtyType",
    "type": "INT",
    "values": {
      "1": "Qty",
      "2": "Percentage"
    }
  },
  "16935": {
    "name": "TTStopTriggerQTyCompare",
    "type": "INT",
    "values": {
      "3": "Lte",
      "5": "Gte"
    }
  },
  "16936": {
    "name": "TTStopTriggerQty",
    "type": "INT"
  },
  "16937": {
    "name": "TTStopTriggerLTPReset",
    "type": "BOOLEAN",
    "values": {
      "Y": "Yes",
      "N": "No"
    }
  },
  "16938": {
    "name": "TTStopTriggeredOrderType",
    "type": "INT",
    "values": {
      "1": "Mkt",
      "2": "Limit",
      "21": "Mlm"
    }
  },
  "16939": {
    "name": "TTStopTriggeredOrderPrice",
    "type": "PRICE"
  },
  "16940": {
    "name": "TTStopLimitTicksAway",
    "type": "INT"
  },
  "16941": {
    "name": "TTStopPayup",
    "type": "INT"
  },
  "16942": {
    "name": "RetryCount",
    "type": "INT"
  },
  "16943": {
    "name": "RetryInterval",
    "type": "INT"
  },
  "16944": {
    "name": "Duration",
    "type": "INT"
  },
  "16945": {
    "name": "DurationBaseUnit",
    "type": "INT",
    "values": {
      "1": "Hour",
      "2": "Minute",
      "3": "Second"
    }
  },
  "16946": {
    "name": "DurationSTime",
    "type": "UTCTIMESTAMP"
  },
  "16947": {
    "name": "DurationETime",
    "type": "UTCTIMESTAMP"
  },
  "16948": {
    "name": "LeftoverTimeAction",
    "type": "INT",
    "values": {
      "0": "Atend",
      "1": "Halflife"
    }
  },
  "16949": {
    "name": "AutoResubExpiredGTD",
    "type": "BOOLEAN"
  },
  "16950": {
    "name": "ParentTIF",
    "type": "INT",
    "values": {
      "0": "Day",
      "1": "Gtc",
      "7": "Time",
      "15": "Dayplus",
      "16": "Gtcplus"
    }
  },
  "16951": {
    "name": "TTStopSecondConditionIsOn",
    "type": "BOOLEAN"
  },
  "16952": {
    "name": "TTStopSecondTriggerPriceType",
    "type": "INT",
    "values": {
      "1": "Bid",
      "2": "Ask",
      "3": "Ltp",
      "6": "Sameside",
      "7": "Oppositeside"
    }
  },
  "16953": {
    "name": "TTStopSecondConditionIsTrlTrg",
    "type": "BOOLEAN"
  },
  "16954": {
    "name": "TTStopSecondTriggerTicksAway",
    "type": "INT"
  },
  "16955": {
    "name": "TTStopSecondTriggerQtyType",
    "type": "INT",
    "values": {
      "1": "Qty",
      "2": "Percentage"
    }
  },
  "16956": {
    "name": "TTStopSecondTriggerQtyCompare",
    "type": "INT",
    "values": {
      "3": "Lte",
      "5": "Gte"
    }
  },
  "16957": {
    "name": "TTStopSecondTriggerQty",
    "type": "QTY"
  },
  "16958": {
    "name": "Variance",
    "type": "INT"
  },
  "16959": {
    "name": "IncludeQuotes",
    "type": "BOOLEAN"
  },
  "16960": {
    "name": "ETAGoToMktTicks",
    "type": "INT"
  },
  "16961": {
    "name": "WaitingOption",
    "type": "INT"
  },
  "16962": {
    "name": "TTStopChildTIFOverride",
    "type": "INT"
  },
  "16963": {
    "name": "Seq",
    "type": "INT"
  },
  "16964": {
    "name": "LegFillSeq",
    "type": "INT"
  },
  "16965": {
    "name": "NoTTReserved",
    "type": "NUMINGROUP"
  },
  "16966": {
    "name": "TTReservedName",
    "type": "STRING"
  },
  "16967": {
    "name": "TTReservedValue",
    "type": "STRING"
  },
  "16968": {
    "name": "LeftoverMktOrderLimitTicks",
    "type": "INT"
  },
  "16969": {
    "name": "SecondConditionIsOn",
    "type": "BOOLEAN"
  },
  "16970": {
    "name": "SecondTriggerTicksAway",
    "type": "INT"
  },
  "16971": {
    "name": "SecondTriggerQtyType",
    "type": "INT",
    "values": {
      "1": "E Qty",
      "2": "E Percentage"
    }
  },
  "16972": {
    "name": "SecondTriggerQtyCompare",
    "type": "INT",
    "values": {
      "3": "E LTE",
      "5": "E GTE"
    }
  },
  "16973": {
    "name": "SecondTriggerQty",
    "type": "QTY"
  },
  "16974": {
    "name": "LeftoverTime",
    "type": "INT",
    "values": {
      "0": "E At End",
      "1": "E At Half Life"
    }
  },
  "16975": {
    "name": "SecondTriggerPriceType",
    "type": "INT",
    "values": {
      "1": "E Bid",
      "2": "E Ask",
      "3": "E Ltp",
      "6": "E Same Side",
      "7": "E Opposite Side"
    }
  },
  "16976": {
    "name": "NoImplies",
    "type": "BOOLEAN"
  },
  "16977": {
    "name": "CustomSliceSched",
    "type": "STRING"
  },
  "16978": {
    "name": "TTStopNoImplies",
    "type": "BOOLEAN"
  },
  "16979": {
    "name": "HKExSSEAlgoHandling",
    "type": "BOOLEAN"
  },
  "16980": {
    "name": "Aggressiveness",
    "type": "FLOAT"
  },
  "16981": {
    "name": "IgnoreMarketState",
    "type": "BOOLEAN"
  },
  "16982": {
    "name": "InstanceName",
    "type": "STRING"
  },
  "16983": {
    "name": "HedgeOrderType",
    "type": "INT",
    "values": {
      "1": "E Mkt"
    }
  },
  "16984": {
    "name": "DeltaRounding",
    "type": "INT",
    "values": {
      "0": "E Round Normal",
      "1": "E Round Up",
      "2": "E Round Down"
    }
  },
  "16990": {
    "name": "Vol",
    "type": "FLOAT"
  },
  "16999": {
    "name": "ClearingAccountOverride",
    "type": "STRING"
  },
  "17000": {
    "name": "RequestTickTable",
    "type": "BOOLEAN",
    "values": {
      "Y": "Yes",
      "N": "No"
    }
  },
  "17001": {
    "name": "VendorDefinedField1",
    "type": "STRING"
  },
  "17002": {
    "name": "VendorDefinedField2",
    "type": "STRING"
  },
  "17003": {
    "name": "VendorDefinedField3",
    "type": "STRING"
  },
  "17004": {
    "name": "VendorDefinedField4",
    "type": "STRING"
  },
  "17005": {
    "name": "VendorDefinedField5",
    "type": "STRING"
  },
  "17006": {
    "name": "MaxPart",
    "type": "INT"
  },
  "17007": {
    "name": "MaxDisp",
    "type": "INT"
  },
  "17008": {
    "name": "TwapStyle",
    "type": "INT",
    "values": {
      "0": "E Aggressive",
      "1": "E Default",
      "2": "E Passive"
    }
  },
  "17009": {
    "name": "WouldIfPrc",
    "type": "PRICE"
  },
  "17010": {
    "name": "LimitPrc",
    "type": "PRICE"
  },
  "18000": {
    "name": "ForceLogout",
    "type": "INT",
    "values": {
      "0": "Not Forced",
      "1": "Forced"
    }
  },
  "18001": {
    "name": "MockOrderFlag",
    "type": "INT",
    "values": {
      "0": "Not Mockorder",
      "1": "Mock Order"
    }
  },
  "18002": {
    "name": "CustomMode",
    "type": "CHAR"
  },
  "18009": {
    "name": "TradingStrategy",
    "type": "INT",
    "values": {
      "1": "Arbitrage",
      "10": "Hedge",
      "11": "Directional"
    }
  },
  "18010": {
    "name": "ReverseSpreadOC",
    "type": "INT",
    "values": {
      "0": "Do Not Reverse Open Close Flag On Far Leg",
      "1": "Reverse Spread Open Close Flag On Far Le"
    }
  },
  "18100": {
    "name": "LegExDestination",
    "type": "EXCHANGE"
  },
  "18101": {
    "name": "AccountID",
    "type": "STRING"
  },
  "18102": {
    "name": "UserID",
    "type": "STRING"
  },
  "18210": {
    "name": "PriceFeedStatus",
    "type": "INT"
  },
  "18211": {
    "name": "DeliveryTerm",
    "type": "CHAR",
    "values": {
      "D": "Day",
      "W": "Week",
      "B": "Balance",
      "Q": "Quarter",
      "S": "Season",
      "Y": "Year",
      "V": "Variable",
      "L": "Balance Of Week",
      "X": "Custom",
      "A": "Same Day",
      "N": "Next Day",
      "M": "Month",
      "E": "Weekly",
      "P": "Pack",
      "U": "Bundle",
      "T": "Weekend",
      "H": "Hour",
      "C": "Eom",
      "a": "Quarter Hour",
      "b": "Half Hour",
      "c": "One Hour",
      "d": "Two Hour",
      "e": "Four Hour",
      "f": "Eight Hour",
      "g": "One Plus Two",
      "h": "Three Plus Four",
      "i": "Baseload",
      "j": "Peakload",
      "k": "Overnight",
      "l": "Extended Peak"
    }
  },
  "18212": {
    "name": "LegDeliveryTerm",
    "type": "CHAR",
    "values": {
      "D": "Day",
      "W": "Week",
      "B": "Balance",
      "Q": "Quarter",
      "S": "Season",
      "Y": "Year",
      "V": "Variable",
      "L": "Balance Of Week",
      "X": "Custom",
      "A": "Same Day",
      "N": "Next Day",
      "M": "Month",
      "E": "Weekly",
      "P": "Pack",
      "U": "Bundle",
      "T": "Weekend",
      "H": "Hour",
      "C": "Eom",
      "a": "Quarter Hour",
      "b": "Half Hour",
      "c": "One Hour",
      "d": "Two Hour",
      "e": "Four Hour",
      "f": "Eight Hour",
      "g": "One Plus Two",
      "h": "Three Plus Four",
      "i": "Baseload",
      "j": "Peakload",
      "k": "Overnight",
      "l": "Extended Peak"
    }
  },
  "18213": {
    "name": "LegDeliveryDate",
    "type": "LOCALMKTDATE"
  },
  "18214": {
    "name": "IncludeNumberOfOrders",
    "type": "CHAR",
    "values": {
      "N": "No",
      "Y": "Yes"
    }
  },
  "18216": {
    "name": "ExchCred",
    "type": "STRING"
  },
  "18217": {
    "name": "RefID",
    "type": "STRING"
  },
  "18218": {
    "name": "TTCustomerName",
    "type": "STRING"
  },
  "18219": {
    "name": "SecondaryAccount",
    "type": "STRING"
  },
  "18220": {
    "name": "BrokerID",
    "type": "STRING"
  },
  "18221": {
    "name": "CompanyID",
    "type": "STRING"
  },
  "18222": {
    "name": "AOTCPreventionActionType",
    "type": "CHAR",
    "values": {
      "0": "Crossing Order Prevention None",
      "1": "Crossing Order Prevention Held",
      "2": "Crossing Order Prevention Cancel",
      "3": "Crossing Order Prevention Fill",
      "4": "Crossing Order Prevention Reduced Order",
      "5": "Crossing Order Prevention Reduced Change",
      "6": "Crossing Order Prevention Released Order",
      "7": "Crossing Order Prevention Replaced Order",
      "8": "Crossing Order Prevention No Action On Order",
      "9": "Crossing Order Prevention Cancel Replace"
    }
  },
  "18223": {
    "name": "ContractYearMonth",
    "type": "STRING"
  },
  "18224": {
    "name": "LegContractYearMonth",
    "type": "STRING"
  },
  "18225": {
    "name": "ExchangeSeqNum",
    "type": "INT"
  },
  "18226": {
    "name": "TTSyntheticType",
    "type": "INT"
  },
  "18227": {
    "name": "Organization",
    "type": "STRING"
  },
  "18228": {
    "name": "RoutingAccount",
    "type": "STRING"
  },
  "18229": {
    "name": "ReviewUserID",
    "type": "STRING"
  },
  "18230": {
    "name": "ReviewStatus",
    "type": "INT",
    "values": {
      "1": "Review Status None",
      "2": "Review Status Reviewed",
      "3": "Review Status Approved"
    }
  },
  "18231": {
    "name": "UniqueLegID",
    "type": "STRING"
  },
  "18232": {
    "name": "LastTradingDate",
    "type": "LOCALMKTDATE"
  },
  "18233": {
    "name": "BrokerRoute",
    "type": "STRING"
  },
  "18235": {
    "name": "HedgeType",
    "type": "INT",
    "values": {
      "1": "Hedge Type Duration",
      "2": "Hedge Type Nominal",
      "3": "Hedge Type Price Factor"
    }
  },
  "18236": {
    "name": "UnderlyingMemo",
    "type": "STRING"
  },
  "18314": {
    "name": "LegMaturityDay",
    "type": "DAYOFMONTH"
  },
  "18602": {
    "name": "QuoteSubType",
    "type": "INT",
    "values": {
      "1": "Working Delta",
      "2": "Basis Trade",
      "3": "Regular Lds Negotiation",
      "4": "Negotiate Underlying Outside Exchange",
      "5": "Vola Strategy Fix",
      "6": "Vola Strategy Negotiate Underlying"
    }
  },
  "18603": {
    "name": "QuoteRefPrice",
    "type": "PRICE"
  },
  "18604": {
    "name": "UnderlyingDeltaPercentage",
    "type": "FLOAT"
  },
  "18605": {
    "name": "SRFQTransType",
    "type": "INT",
    "values": {
      "1": "New",
      "2": "Replace",
      "3": "Close",
      "4": "Update",
      "5": "Expire"
    }
  },
  "18606": {
    "name": "NegotiationID",
    "type": "STRING"
  },
  "18607": {
    "name": "SecondaryNegotiationID",
    "type": "STRING"
  },
  "18608": {
    "name": "MktQuoteID",
    "type": "STRING"
  },
  "18609": {
    "name": "SecondaryQuoteID",
    "type": "STRING"
  },
  "18610": {
    "name": "QuotingStatus",
    "type": "INT",
    "values": {
      "1": "Quoting Status Open Active",
      "2": "Quoting Status Open Working",
      "3": "Quoting Status Closed Inactive"
    }
  },
  "20000": {
    "name": "OneOffSharedKey",
    "type": "STRING"
  },
  "20016": {
    "name": "FutureReferencePrice",
    "type": "PRICE"
  },
  "37711": {
    "name": "MDTradeEntryID",
    "type": "INT"
  },
  "60111": {
    "name": "AllocVolumeType",
    "type": "STRING"
  }
}

export const MSG_TYPES: Record<string, string> = {
  "0": "Heartbeat",
  "1": "Test Request",
  "2": "Resend Request",
  "3": "Reject",
  "4": "Sequence Reset",
  "5": "Logout",
  "6": "Ioi",
  "7": "Advertisement",
  "8": "Execution Report",
  "9": "Order Cancel Reject",
  "A": "Logon",
  "B": "News",
  "C": "Email",
  "D": "New Order Single",
  "E": "New Order List",
  "F": "Order Cancel Request",
  "G": "Order Cancel Replace Request",
  "H": "Order Status Request",
  "J": "Allocation Instruction",
  "K": "List Cancel Request",
  "L": "List Execute",
  "M": "List Status Request",
  "N": "List Status",
  "P": "Allocation Instruction Ack",
  "Q": "Dont Know Trade",
  "R": "Quote Request",
  "S": "Quote",
  "T": "Settlement Instructions",
  "V": "Market Data Request",
  "W": "Market Data Snapshot Full Refresh",
  "X": "Market Data Incremental Refresh",
  "Y": "Market Data Request Reject",
  "Z": "Quote Cancel",
  "a": "Quote Status Request",
  "b": "Mass Quote Acknowledgement",
  "c": "Security Definition Request",
  "d": "Security Definition",
  "e": "Security Status Request",
  "f": "Security Status",
  "g": "Trading Session Status Request",
  "h": "Trading Session Status",
  "i": "Mass Quote",
  "j": "Business Message Reject",
  "k": "Bid Request",
  "l": "Bid Response",
  "m": "List Strike Price",
  "n": "XMLnon FIX",
  "o": "Registration Instructions",
  "p": "Registration Instructions Response",
  "q": "Order Mass Cancel Request",
  "r": "Order Mass Cancel Report",
  "s": "New Order Cross",
  "t": "Cross Order Cancel Replace Request",
  "u": "Cross Order Cancel Request",
  "v": "Security Type Request",
  "w": "Security Types",
  "x": "Security List Request",
  "y": "Security List",
  "z": "Derivative Security List Request",
  "AA": "Derivative Security List",
  "AB": "New Order Multileg",
  "AC": "Multileg Order Cancel Replace",
  "AD": "Trade Capture Report Request",
  "AE": "Trade Capture Report",
  "AF": "Order Mass Status Request",
  "AG": "Quote Request Reject",
  "AH": "RFQRequest",
  "AI": "Quote Status Report",
  "AJ": "Quote Response",
  "AK": "Confirmation",
  "AL": "Position Maintenance Request",
  "AM": "Position Maintenance Report",
  "AN": "Request For Positions",
  "AO": "Request For Positions Ack",
  "AP": "Position Report",
  "AQ": "Trade Capture Report Request Ack",
  "AR": "Trade Capture Report Ack",
  "AS": "Allocation Report",
  "AT": "Allocation Report Ack",
  "AU": "Confirmation Ack",
  "AV": "Settlement Instruction Request",
  "AW": "Assignment Report",
  "AX": "Collateral Request",
  "AY": "Collateral Assignment",
  "AZ": "Collateral Response",
  "BA": "Collateral Report",
  "BB": "Collateral Inquiry",
  "BC": "Network Counterparty System Status Request",
  "BD": "Network Counterparty System Status Response",
  "BE": "User Request",
  "BF": "User Response",
  "BG": "Collateral Inquiry Ack",
  "BH": "Confirmation Request"
}

export const REQUIRED_FIELDS_42: Record<string, string[]> = {
  "0": [],
  "1": [
    "TestReqID"
  ],
  "2": [
    "BeginSeqNo",
    "EndSeqNo"
  ],
  "3": [
    "RefSeqNum"
  ],
  "4": [
    "NewSeqNo"
  ],
  "5": [],
  "6": [
    "IOIid",
    "IOITransType",
    "Symbol",
    "Side",
    "IOIShares"
  ],
  "7": [
    "AdvId",
    "AdvTransType",
    "Symbol",
    "AdvSide",
    "Shares"
  ],
  "8": [
    "OrderID",
    "ExecID",
    "ExecTransType",
    "ExecType",
    "OrdStatus",
    "Symbol",
    "Side",
    "LeavesQty",
    "CumQty",
    "AvgPx"
  ],
  "9": [
    "OrderID",
    "ClOrdID",
    "OrigClOrdID",
    "OrdStatus",
    "CxlRejResponseTo"
  ],
  "A": [
    "EncryptMethod",
    "HeartBtInt"
  ],
  "B": [
    "Headline"
  ],
  "C": [
    "EmailThreadID",
    "EmailType",
    "Subject"
  ],
  "D": [
    "ClOrdID",
    "HandlInst",
    "Symbol",
    "Side",
    "TransactTime",
    "OrdType"
  ],
  "E": [
    "ListID",
    "BidType",
    "TotNoOrders"
  ],
  "F": [
    "OrigClOrdID",
    "ClOrdID",
    "Symbol",
    "Side",
    "TransactTime"
  ],
  "G": [
    "OrigClOrdID",
    "ClOrdID",
    "HandlInst",
    "Symbol",
    "Side",
    "TransactTime",
    "OrdType"
  ],
  "H": [
    "ClOrdID",
    "Symbol",
    "Side"
  ],
  "J": [
    "AllocID",
    "AllocTransType",
    "Side",
    "Symbol",
    "Shares",
    "AvgPx",
    "TradeDate"
  ],
  "K": [
    "ListID",
    "TransactTime"
  ],
  "L": [
    "ListID",
    "TransactTime"
  ],
  "M": [
    "ListID"
  ],
  "N": [
    "ListID",
    "ListStatusType",
    "NoRpts",
    "ListOrderStatus",
    "RptSeq",
    "TotNoOrders"
  ],
  "P": [
    "AllocID",
    "TradeDate",
    "AllocStatus"
  ],
  "Q": [
    "OrderID",
    "ExecID",
    "DKReason",
    "Symbol",
    "Side"
  ],
  "R": [
    "QuoteReqID"
  ],
  "S": [
    "QuoteID",
    "Symbol"
  ],
  "T": [
    "SettlInstID",
    "SettlInstTransType",
    "SettlInstRefID",
    "SettlInstMode",
    "SettlInstSource",
    "AllocAccount",
    "TransactTime"
  ],
  "V": [
    "MDReqID",
    "SubscriptionRequestType",
    "MarketDepth"
  ],
  "W": [
    "Symbol"
  ],
  "X": [],
  "Y": [
    "MDReqID"
  ],
  "Z": [
    "QuoteID",
    "QuoteCancelType"
  ],
  "a": [
    "Symbol"
  ],
  "b": [
    "QuoteStatus"
  ],
  "c": [
    "SecurityReqID",
    "SecurityRequestType"
  ],
  "d": [
    "SecurityReqID",
    "SecurityResponseID",
    "TotalNumSecurities"
  ],
  "e": [
    "SecurityStatusReqID",
    "Symbol",
    "SubscriptionRequestType"
  ],
  "f": [
    "Symbol"
  ],
  "g": [
    "TradSesReqID",
    "SubscriptionRequestType"
  ],
  "h": [
    "TradingSessionID",
    "TradSesStatus"
  ],
  "i": [
    "QuoteID"
  ],
  "j": [
    "RefMsgType",
    "BusinessRejectReason"
  ],
  "k": [
    "ClientBidID",
    "BidRequestTransType",
    "TotalNumSecurities",
    "BidType",
    "TradeType",
    "BasisPxType"
  ],
  "l": [],
  "m": [
    "ListID",
    "TotNoStrikes"
  ]
}

export const REQUIRED_FIELDS_44: Record<string, string[]> = {
  "0": [],
  "1": [
    "TestReqID"
  ],
  "2": [
    "BeginSeqNo",
    "EndSeqNo"
  ],
  "3": [
    "RefSeqNum"
  ],
  "4": [
    "NewSeqNo"
  ],
  "5": [],
  "6": [
    "IOIID",
    "IOITransType",
    "Side",
    "IOIQty"
  ],
  "7": [
    "AdvId",
    "AdvTransType",
    "AdvSide",
    "Quantity"
  ],
  "8": [
    "OrderID",
    "ExecID",
    "ExecType",
    "OrdStatus",
    "Side",
    "LeavesQty",
    "CumQty",
    "AvgPx"
  ],
  "9": [
    "OrderID",
    "ClOrdID",
    "OrigClOrdID",
    "OrdStatus",
    "CxlRejResponseTo"
  ],
  "A": [
    "EncryptMethod",
    "HeartBtInt"
  ],
  "B": [
    "Headline"
  ],
  "C": [
    "EmailThreadID",
    "EmailType",
    "Subject"
  ],
  "D": [
    "ClOrdID",
    "Side",
    "TransactTime",
    "OrdType"
  ],
  "E": [
    "ListID",
    "BidType",
    "TotNoOrders"
  ],
  "F": [
    "OrigClOrdID",
    "ClOrdID",
    "Side",
    "TransactTime"
  ],
  "G": [
    "OrigClOrdID",
    "ClOrdID",
    "Side",
    "TransactTime",
    "OrdType"
  ],
  "H": [
    "ClOrdID",
    "Side"
  ],
  "J": [
    "AllocID",
    "AllocTransType",
    "AllocType",
    "AllocNoOrdersType",
    "Side",
    "Quantity",
    "AvgPx",
    "TradeDate"
  ],
  "K": [
    "ListID",
    "TransactTime"
  ],
  "L": [
    "ListID",
    "TransactTime"
  ],
  "M": [
    "ListID"
  ],
  "N": [
    "ListID",
    "ListStatusType",
    "NoRpts",
    "ListOrderStatus",
    "RptSeq",
    "TotNoOrders"
  ],
  "P": [
    "AllocID",
    "TransactTime",
    "AllocStatus"
  ],
  "Q": [
    "OrderID",
    "ExecID",
    "DKReason",
    "Side"
  ],
  "R": [
    "QuoteReqID"
  ],
  "S": [
    "QuoteID"
  ],
  "T": [
    "SettlInstMsgID",
    "SettlInstMode",
    "TransactTime"
  ],
  "V": [
    "MDReqID",
    "SubscriptionRequestType",
    "MarketDepth"
  ],
  "W": [],
  "X": [],
  "Y": [
    "MDReqID"
  ],
  "Z": [
    "QuoteID",
    "QuoteCancelType"
  ],
  "a": [],
  "b": [
    "QuoteStatus"
  ],
  "c": [
    "SecurityReqID",
    "SecurityRequestType"
  ],
  "d": [
    "SecurityReqID",
    "SecurityResponseID",
    "SecurityResponseType"
  ],
  "e": [
    "SecurityStatusReqID",
    "SubscriptionRequestType"
  ],
  "f": [],
  "g": [
    "TradSesReqID",
    "SubscriptionRequestType"
  ],
  "h": [
    "TradingSessionID",
    "TradSesStatus"
  ],
  "i": [
    "QuoteID"
  ],
  "j": [
    "RefMsgType",
    "BusinessRejectReason"
  ],
  "k": [
    "ClientBidID",
    "BidRequestTransType",
    "TotNoRelatedSym",
    "BidType",
    "BidTradeType",
    "BasisPxType"
  ],
  "l": [],
  "m": [
    "ListID",
    "TotNoStrikes"
  ],
  "n": [],
  "o": [
    "RegistID",
    "RegistTransType",
    "RegistRefID"
  ],
  "p": [
    "RegistID",
    "RegistTransType",
    "RegistRefID",
    "RegistStatus"
  ],
  "q": [
    "ClOrdID",
    "MassCancelRequestType",
    "TransactTime"
  ],
  "r": [
    "OrderID",
    "MassCancelRequestType",
    "MassCancelResponse"
  ],
  "s": [
    "CrossID",
    "CrossType",
    "CrossPrioritization",
    "TransactTime",
    "OrdType"
  ],
  "t": [
    "CrossID",
    "OrigCrossID",
    "CrossType",
    "CrossPrioritization",
    "TransactTime",
    "OrdType"
  ],
  "u": [
    "CrossID",
    "OrigCrossID",
    "CrossType",
    "CrossPrioritization",
    "TransactTime"
  ],
  "v": [
    "SecurityReqID"
  ],
  "w": [
    "SecurityReqID",
    "SecurityResponseID",
    "SecurityResponseType"
  ],
  "x": [
    "SecurityReqID",
    "SecurityListRequestType"
  ],
  "y": [
    "SecurityReqID",
    "SecurityResponseID",
    "SecurityRequestResult"
  ],
  "z": [
    "SecurityReqID",
    "SecurityListRequestType"
  ],
  "AA": [
    "SecurityReqID",
    "SecurityResponseID",
    "SecurityRequestResult"
  ],
  "AB": [
    "ClOrdID",
    "Side",
    "TransactTime",
    "OrdType"
  ],
  "AC": [
    "OrigClOrdID",
    "ClOrdID",
    "Side",
    "TransactTime",
    "OrdType"
  ],
  "AD": [
    "TradeRequestID",
    "TradeRequestType"
  ],
  "AE": [
    "TradeReportID",
    "PreviouslyReported",
    "LastQty",
    "LastPx",
    "TradeDate",
    "TransactTime"
  ],
  "AF": [
    "MassStatusReqID",
    "MassStatusReqType"
  ],
  "AG": [
    "QuoteReqID",
    "QuoteRequestRejectReason"
  ],
  "AH": [
    "RFQReqID"
  ],
  "AI": [
    "QuoteID"
  ],
  "AJ": [
    "QuoteRespID",
    "QuoteRespType"
  ],
  "AK": [
    "ConfirmID",
    "ConfirmTransType",
    "ConfirmType",
    "ConfirmStatus",
    "TransactTime",
    "TradeDate",
    "AllocQty",
    "Side",
    "AllocAccount",
    "AvgPx",
    "GrossTradeAmt",
    "NetMoney"
  ],
  "AL": [
    "PosReqID",
    "PosTransType",
    "PosMaintAction",
    "ClearingBusinessDate",
    "Account",
    "AccountType",
    "TransactTime"
  ],
  "AM": [
    "PosMaintRptID",
    "PosTransType",
    "PosMaintAction",
    "OrigPosReqRefID",
    "PosMaintStatus",
    "ClearingBusinessDate",
    "Account",
    "AccountType",
    "TransactTime"
  ],
  "AN": [
    "PosReqID",
    "PosReqType",
    "Account",
    "AccountType",
    "ClearingBusinessDate",
    "TransactTime"
  ],
  "AO": [
    "PosMaintRptID",
    "PosReqResult",
    "PosReqStatus",
    "Account",
    "AccountType"
  ],
  "AP": [
    "PosMaintRptID",
    "PosReqResult",
    "ClearingBusinessDate",
    "Account",
    "AccountType",
    "SettlPrice",
    "SettlPriceType",
    "PriorSettlPrice"
  ],
  "AQ": [
    "TradeRequestID",
    "TradeRequestType",
    "TradeRequestResult",
    "TradeRequestStatus"
  ],
  "AR": [
    "TradeReportID",
    "ExecType"
  ],
  "AS": [
    "AllocReportID",
    "AllocTransType",
    "AllocReportType",
    "AllocStatus",
    "AllocNoOrdersType",
    "Side",
    "Quantity",
    "AvgPx",
    "TradeDate"
  ],
  "AT": [
    "AllocReportID",
    "AllocID",
    "TransactTime",
    "AllocStatus"
  ],
  "AU": [
    "ConfirmID",
    "TradeDate",
    "TransactTime",
    "AffirmStatus"
  ],
  "AV": [
    "SettlInstReqID",
    "TransactTime"
  ],
  "AW": [
    "AsgnRptID",
    "AccountType",
    "SettlPrice",
    "SettlPriceType",
    "UnderlyingSettlPrice",
    "AssignmentMethod",
    "OpenInterest",
    "ExerciseMethod",
    "SettlSessID",
    "SettlSessSubID",
    "ClearingBusinessDate"
  ],
  "AX": [
    "CollReqID",
    "CollAsgnReason",
    "TransactTime"
  ],
  "AY": [
    "CollAsgnID",
    "CollAsgnReason",
    "CollAsgnTransType",
    "TransactTime"
  ],
  "AZ": [
    "CollRespID",
    "CollAsgnID",
    "CollAsgnReason",
    "CollAsgnRespType",
    "TransactTime"
  ],
  "BA": [
    "CollRptID",
    "CollStatus"
  ],
  "BB": [],
  "BC": [
    "NetworkRequestType",
    "NetworkRequestID"
  ],
  "BD": [
    "NetworkStatusResponseType",
    "NetworkResponseID"
  ],
  "BE": [
    "UserRequestID",
    "UserRequestType",
    "Username"
  ],
  "BF": [
    "UserRequestID",
    "Username"
  ],
  "BG": [
    "CollInquiryID",
    "CollInquiryStatus"
  ],
  "BH": [
    "ConfirmReqID",
    "ConfirmType",
    "TransactTime"
  ]
}

export const REQUIRED_FIELDS_TT42: Record<string, string[]> = {
  "0": [],
  "1": [
    "TestReqID"
  ],
  "2": [
    "BeginSeqNo",
    "EndSeqNo"
  ],
  "3": [
    "RefSeqNum"
  ],
  "4": [
    "NewSeqNo"
  ],
  "5": [],
  "8": [
    "OrderID",
    "ExecType",
    "OrdStatus",
    "LeavesQty",
    "CumQty",
    "AvgPx"
  ],
  "9": [
    "OrderID",
    "OrdStatus",
    "CxlRejResponseTo"
  ],
  "AB": [
    "ClOrdID",
    "Account",
    "OrderQty",
    "Side",
    "OrdType"
  ],
  "D": [
    "ClOrdID",
    "Account",
    "OrderQty",
    "Side",
    "OrdType"
  ],
  "AC": [
    "ClOrdID",
    "Account",
    "OrderQty",
    "Side",
    "OrdType"
  ],
  "G": [
    "ClOrdID",
    "Account",
    "OrderQty",
    "Side",
    "OrdType"
  ],
  "F": [
    "ClOrdID"
  ],
  "c": [
    "SecurityReqID"
  ],
  "d": [
    "SecurityReqID",
    "SecurityResponseID",
    "SecurityResponseType",
    "TotalNumSecurities"
  ],
  "e": [
    "SecurityStatusReqID",
    "SubscriptionRequestType"
  ],
  "f": [
    "SecurityStatusReqID",
    "SecurityTradingStatus"
  ],
  "V": [
    "MDReqID",
    "SubscriptionRequestType"
  ],
  "Y": [
    "MDReqID",
    "Text"
  ],
  "W": [
    "MDReqID"
  ],
  "X": [
    "MDReqID"
  ],
  "R": [],
  "b": [],
  "S": [],
  "AI": [],
  "AJ": [],
  "A": [
    "HeartBtInt"
  ],
  "j": [
    "RefMsgType",
    "BusinessRejectReason"
  ],
  "H": [],
  "AD": [
    "SubscriptionRequestType"
  ],
  "AQ": [],
  "AE": [],
  "AR": [],
  "B": [
    "Headline",
    "LinesOfText",
    "Text"
  ],
  "U2": [],
  "Q": [
    "OrderID",
    "ExecID",
    "DKReason"
  ],
  "J": [
    "AllocID",
    "AllocType",
    "AllocNoOrdersType",
    "Side",
    "Quantity",
    "AvgPx",
    "TradeDate"
  ],
  "P": [
    "AllocID",
    "TransactTime",
    "AllocStatus"
  ],
  "AS": [
    "AllocReportID",
    "AllocTransType",
    "AllocReportType",
    "AllocStatus",
    "AllocNoOrdersType",
    "Side",
    "Quantity",
    "AvgPx",
    "TradeDate"
  ],
  "E": [
    "ListID"
  ]
}

export const REQUIRED_FIELDS_TT44: Record<string, string[]> = {
  "0": [],
  "1": [
    "TestReqID"
  ],
  "2": [
    "BeginSeqNo",
    "EndSeqNo"
  ],
  "3": [
    "RefSeqNum"
  ],
  "4": [
    "NewSeqNo"
  ],
  "5": [],
  "8": [
    "OrderID",
    "ExecType",
    "OrdStatus",
    "LeavesQty",
    "CumQty",
    "AvgPx"
  ],
  "9": [
    "OrderID",
    "OrdStatus",
    "CxlRejResponseTo"
  ],
  "AB": [
    "ClOrdID",
    "Account",
    "OrderQty",
    "Side",
    "OrdType"
  ],
  "D": [
    "ClOrdID",
    "Account",
    "OrderQty",
    "Side",
    "OrdType"
  ],
  "AC": [
    "ClOrdID",
    "Account",
    "OrderQty",
    "Side",
    "OrdType"
  ],
  "G": [
    "ClOrdID",
    "Account",
    "OrderQty",
    "Side",
    "OrdType"
  ],
  "F": [
    "ClOrdID"
  ],
  "c": [
    "SecurityReqID"
  ],
  "d": [
    "SecurityReqID",
    "SecurityResponseID",
    "SecurityResponseType",
    "TotalNumSecurities"
  ],
  "e": [
    "SecurityStatusReqID",
    "SubscriptionRequestType"
  ],
  "f": [
    "SecurityStatusReqID",
    "SecurityTradingStatus"
  ],
  "V": [
    "MDReqID",
    "SubscriptionRequestType"
  ],
  "Y": [
    "MDReqID",
    "Text"
  ],
  "W": [
    "MDReqID"
  ],
  "X": [
    "MDReqID"
  ],
  "R": [],
  "b": [],
  "S": [],
  "AI": [],
  "AJ": [],
  "A": [
    "HeartBtInt"
  ],
  "j": [
    "RefMsgType",
    "BusinessRejectReason"
  ],
  "H": [],
  "AD": [
    "SubscriptionRequestType"
  ],
  "AQ": [],
  "AE": [],
  "AR": [],
  "B": [
    "Headline",
    "LinesOfText",
    "Text"
  ],
  "U2": [],
  "Q": [
    "OrderID",
    "ExecID",
    "DKReason"
  ],
  "J": [
    "AllocID",
    "AllocType",
    "AllocNoOrdersType",
    "Side",
    "Quantity",
    "AvgPx",
    "TradeDate"
  ],
  "P": [
    "AllocID",
    "TransactTime",
    "AllocStatus"
  ],
  "AS": [
    "AllocReportID",
    "AllocTransType",
    "AllocReportType",
    "AllocStatus",
    "AllocNoOrdersType",
    "Side",
    "Quantity",
    "AvgPx",
    "TradeDate"
  ],
  "E": [
    "ListID"
  ]
}

export interface MessageDef {
  msgtype: string
  name: string
  requiredFields: string[]
  allFields: string[]
}

export const MESSAGES_42: MessageDef[] = [
  {
    "msgtype": "0",
    "name": "Heartbeat",
    "requiredFields": [],
    "allFields": [
      "TestReqID"
    ]
  },
  {
    "msgtype": "1",
    "name": "Test Request",
    "requiredFields": [
      "TestReqID"
    ],
    "allFields": [
      "TestReqID"
    ]
  },
  {
    "msgtype": "2",
    "name": "Resend Request",
    "requiredFields": [
      "BeginSeqNo",
      "EndSeqNo"
    ],
    "allFields": [
      "BeginSeqNo",
      "EndSeqNo"
    ]
  },
  {
    "msgtype": "3",
    "name": "Reject",
    "requiredFields": [
      "RefSeqNum"
    ],
    "allFields": [
      "RefSeqNum",
      "RefTagID",
      "RefMsgType",
      "SessionRejectReason",
      "Text",
      "EncodedTextLen",
      "EncodedText"
    ]
  },
  {
    "msgtype": "4",
    "name": "Sequence Reset",
    "requiredFields": [
      "NewSeqNo"
    ],
    "allFields": [
      "GapFillFlag",
      "NewSeqNo"
    ]
  },
  {
    "msgtype": "5",
    "name": "Logout",
    "requiredFields": [],
    "allFields": [
      "Text",
      "EncodedTextLen",
      "EncodedText"
    ]
  },
  {
    "msgtype": "6",
    "name": "Ioi",
    "requiredFields": [
      "IOIid",
      "IOITransType",
      "Symbol",
      "Side",
      "IOIShares"
    ],
    "allFields": [
      "IOIid",
      "IOITransType",
      "IOIRefID",
      "Symbol",
      "SymbolSfx",
      "SecurityID",
      "IDSource",
      "SecurityType",
      "MaturityMonthYear",
      "MaturityDay",
      "PutOrCall",
      "StrikePrice",
      "OptAttribute",
      "ContractMultiplier",
      "CouponRate",
      "SecurityExchange",
      "Issuer",
      "EncodedIssuerLen",
      "EncodedIssuer",
      "SecurityDesc",
      "EncodedSecurityDescLen",
      "EncodedSecurityDesc",
      "Side",
      "IOIShares",
      "Price",
      "Currency",
      "ValidUntilTime",
      "IOIQltyInd",
      "IOINaturalFlag",
      "Text",
      "EncodedTextLen",
      "EncodedText",
      "TransactTime",
      "URLLink",
      "SpreadToBenchmark",
      "Benchmark"
    ]
  },
  {
    "msgtype": "7",
    "name": "Advertisement",
    "requiredFields": [
      "AdvId",
      "AdvTransType",
      "Symbol",
      "AdvSide",
      "Shares"
    ],
    "allFields": [
      "AdvId",
      "AdvTransType",
      "AdvRefID",
      "Symbol",
      "SymbolSfx",
      "SecurityID",
      "IDSource",
      "SecurityType",
      "MaturityMonthYear",
      "MaturityDay",
      "PutOrCall",
      "StrikePrice",
      "OptAttribute",
      "ContractMultiplier",
      "CouponRate",
      "SecurityExchange",
      "Issuer",
      "EncodedIssuerLen",
      "EncodedIssuer",
      "SecurityDesc",
      "EncodedSecurityDescLen",
      "EncodedSecurityDesc",
      "AdvSide",
      "Shares",
      "Price",
      "Currency",
      "TradeDate",
      "TransactTime",
      "Text",
      "EncodedTextLen",
      "EncodedText",
      "URLLink",
      "LastMkt",
      "TradingSessionID"
    ]
  },
  {
    "msgtype": "8",
    "name": "Execution Report",
    "requiredFields": [
      "OrderID",
      "ExecID",
      "ExecTransType",
      "ExecType",
      "OrdStatus",
      "Symbol",
      "Side",
      "LeavesQty",
      "CumQty",
      "AvgPx"
    ],
    "allFields": [
      "OrderID",
      "SecondaryOrderID",
      "ClOrdID",
      "OrigClOrdID",
      "ClientID",
      "ExecBroker",
      "ListID",
      "ExecID",
      "ExecTransType",
      "ExecRefID",
      "ExecType",
      "OrdStatus",
      "OrdRejReason",
      "ExecRestatementReason",
      "Account",
      "SettlmntTyp",
      "FutSettDate",
      "Symbol",
      "SymbolSfx",
      "SecurityID",
      "IDSource",
      "SecurityType",
      "MaturityMonthYear",
      "MaturityDay",
      "PutOrCall",
      "StrikePrice",
      "OptAttribute",
      "ContractMultiplier",
      "CouponRate",
      "SecurityExchange",
      "Issuer",
      "EncodedIssuerLen",
      "EncodedIssuer",
      "SecurityDesc",
      "EncodedSecurityDescLen",
      "EncodedSecurityDesc",
      "Side",
      "OrderQty",
      "CashOrderQty",
      "OrdType",
      "Price",
      "StopPx",
      "PegDifference",
      "DiscretionInst",
      "DiscretionOffset",
      "Currency",
      "ComplianceID",
      "SolicitedFlag",
      "TimeInForce",
      "EffectiveTime",
      "ExpireDate",
      "ExpireTime",
      "ExecInst",
      "Rule80A",
      "LastShares",
      "LastPx",
      "LastSpotRate",
      "LastForwardPoints",
      "LastMkt",
      "TradingSessionID",
      "LastCapacity",
      "LeavesQty",
      "CumQty",
      "AvgPx",
      "DayOrderQty",
      "DayCumQty",
      "DayAvgPx",
      "GTBookingInst",
      "TradeDate",
      "TransactTime",
      "ReportToExch",
      "Commission",
      "CommType",
      "GrossTradeAmt",
      "SettlCurrAmt",
      "SettlCurrency",
      "SettlCurrFxRate",
      "SettlCurrFxRateCalc",
      "HandlInst",
      "MinQty",
      "MaxFloor",
      "OpenClose",
      "MaxShow",
      "Text",
      "EncodedTextLen",
      "EncodedText",
      "FutSettDate2",
      "OrderQty2",
      "ClearingFirm",
      "ClearingAccount",
      "MultiLegReportingType"
    ]
  },
  {
    "msgtype": "9",
    "name": "Order Cancel Reject",
    "requiredFields": [
      "OrderID",
      "ClOrdID",
      "OrigClOrdID",
      "OrdStatus",
      "CxlRejResponseTo"
    ],
    "allFields": [
      "OrderID",
      "SecondaryOrderID",
      "ClOrdID",
      "OrigClOrdID",
      "OrdStatus",
      "ClientID",
      "ExecBroker",
      "ListID",
      "Account",
      "TransactTime",
      "CxlRejResponseTo",
      "CxlRejReason",
      "Text",
      "EncodedTextLen",
      "EncodedText"
    ]
  },
  {
    "msgtype": "A",
    "name": "Logon",
    "requiredFields": [
      "EncryptMethod",
      "HeartBtInt"
    ],
    "allFields": [
      "EncryptMethod",
      "HeartBtInt",
      "RawDataLength",
      "RawData",
      "ResetSeqNumFlag",
      "MaxMessageSize"
    ]
  },
  {
    "msgtype": "B",
    "name": "News",
    "requiredFields": [
      "Headline"
    ],
    "allFields": [
      "OrigTime",
      "Urgency",
      "Headline",
      "EncodedHeadlineLen",
      "EncodedHeadline",
      "URLLink",
      "RawDataLength",
      "RawData"
    ]
  },
  {
    "msgtype": "C",
    "name": "Email",
    "requiredFields": [
      "EmailThreadID",
      "EmailType",
      "Subject"
    ],
    "allFields": [
      "EmailThreadID",
      "EmailType",
      "OrigTime",
      "Subject",
      "EncodedSubjectLen",
      "EncodedSubject",
      "OrderID",
      "ClOrdID",
      "RawDataLength",
      "RawData"
    ]
  },
  {
    "msgtype": "D",
    "name": "New Order Single",
    "requiredFields": [
      "ClOrdID",
      "HandlInst",
      "Symbol",
      "Side",
      "TransactTime",
      "OrdType"
    ],
    "allFields": [
      "ClOrdID",
      "ClientID",
      "ExecBroker",
      "Account",
      "SettlmntTyp",
      "FutSettDate",
      "HandlInst",
      "ExecInst",
      "MinQty",
      "MaxFloor",
      "ExDestination",
      "ProcessCode",
      "Symbol",
      "SymbolSfx",
      "SecurityID",
      "IDSource",
      "SecurityType",
      "MaturityMonthYear",
      "MaturityDay",
      "PutOrCall",
      "StrikePrice",
      "OptAttribute",
      "ContractMultiplier",
      "CouponRate",
      "SecurityExchange",
      "Issuer",
      "EncodedIssuerLen",
      "EncodedIssuer",
      "SecurityDesc",
      "EncodedSecurityDescLen",
      "EncodedSecurityDesc",
      "PrevClosePx",
      "Side",
      "LocateReqd",
      "TransactTime",
      "OrderQty",
      "CashOrderQty",
      "OrdType",
      "Price",
      "StopPx",
      "Currency",
      "ComplianceID",
      "SolicitedFlag",
      "IOIid",
      "QuoteID",
      "TimeInForce",
      "EffectiveTime",
      "ExpireDate",
      "ExpireTime",
      "GTBookingInst",
      "Commission",
      "CommType",
      "Rule80A",
      "ForexReq",
      "SettlCurrency",
      "Text",
      "EncodedTextLen",
      "EncodedText",
      "FutSettDate2",
      "OrderQty2",
      "OpenClose",
      "CoveredOrUncovered",
      "CustomerOrFirm",
      "MaxShow",
      "PegDifference",
      "DiscretionInst",
      "DiscretionOffset",
      "ClearingFirm",
      "ClearingAccount"
    ]
  },
  {
    "msgtype": "E",
    "name": "New Order List",
    "requiredFields": [
      "ListID",
      "BidType",
      "TotNoOrders"
    ],
    "allFields": [
      "ListID",
      "BidID",
      "ClientBidID",
      "ProgRptReqs",
      "BidType",
      "ProgPeriodInterval",
      "ListExecInstType",
      "ListExecInst",
      "EncodedListExecInstLen",
      "EncodedListExecInst",
      "TotNoOrders"
    ]
  },
  {
    "msgtype": "F",
    "name": "Order Cancel Request",
    "requiredFields": [
      "OrigClOrdID",
      "ClOrdID",
      "Symbol",
      "Side",
      "TransactTime"
    ],
    "allFields": [
      "OrigClOrdID",
      "OrderID",
      "ClOrdID",
      "ListID",
      "Account",
      "ClientID",
      "ExecBroker",
      "Symbol",
      "SymbolSfx",
      "SecurityID",
      "IDSource",
      "SecurityType",
      "MaturityMonthYear",
      "MaturityDay",
      "PutOrCall",
      "StrikePrice",
      "OptAttribute",
      "ContractMultiplier",
      "CouponRate",
      "SecurityExchange",
      "Issuer",
      "EncodedIssuerLen",
      "EncodedIssuer",
      "SecurityDesc",
      "EncodedSecurityDescLen",
      "EncodedSecurityDesc",
      "Side",
      "TransactTime",
      "OrderQty",
      "CashOrderQty",
      "ComplianceID",
      "SolicitedFlag",
      "Text",
      "EncodedTextLen",
      "EncodedText"
    ]
  },
  {
    "msgtype": "G",
    "name": "Order Cancel Replace Request",
    "requiredFields": [
      "OrigClOrdID",
      "ClOrdID",
      "HandlInst",
      "Symbol",
      "Side",
      "TransactTime",
      "OrdType"
    ],
    "allFields": [
      "OrderID",
      "ClientID",
      "ExecBroker",
      "OrigClOrdID",
      "ClOrdID",
      "ListID",
      "Account",
      "SettlmntTyp",
      "FutSettDate",
      "HandlInst",
      "ExecInst",
      "MinQty",
      "MaxFloor",
      "ExDestination",
      "Symbol",
      "SymbolSfx",
      "SecurityID",
      "IDSource",
      "SecurityType",
      "MaturityMonthYear",
      "MaturityDay",
      "PutOrCall",
      "StrikePrice",
      "OptAttribute",
      "ContractMultiplier",
      "CouponRate",
      "SecurityExchange",
      "Issuer",
      "EncodedIssuerLen",
      "EncodedIssuer",
      "SecurityDesc",
      "EncodedSecurityDescLen",
      "EncodedSecurityDesc",
      "Side",
      "TransactTime",
      "OrderQty",
      "CashOrderQty",
      "OrdType",
      "Price",
      "StopPx",
      "PegDifference",
      "DiscretionInst",
      "DiscretionOffset",
      "ComplianceID",
      "SolicitedFlag",
      "Currency",
      "TimeInForce",
      "EffectiveTime",
      "ExpireDate",
      "ExpireTime",
      "GTBookingInst",
      "Commission",
      "CommType",
      "Rule80A",
      "ForexReq",
      "SettlCurrency",
      "Text",
      "EncodedTextLen",
      "EncodedText",
      "FutSettDate2",
      "OrderQty2",
      "OpenClose",
      "CoveredOrUncovered",
      "CustomerOrFirm",
      "MaxShow",
      "LocateReqd",
      "ClearingFirm",
      "ClearingAccount"
    ]
  },
  {
    "msgtype": "H",
    "name": "Order Status Request",
    "requiredFields": [
      "ClOrdID",
      "Symbol",
      "Side"
    ],
    "allFields": [
      "OrderID",
      "ClOrdID",
      "ClientID",
      "Account",
      "ExecBroker",
      "Symbol",
      "SymbolSfx",
      "SecurityID",
      "IDSource",
      "SecurityType",
      "MaturityMonthYear",
      "MaturityDay",
      "PutOrCall",
      "StrikePrice",
      "OptAttribute",
      "ContractMultiplier",
      "CouponRate",
      "SecurityExchange",
      "Issuer",
      "EncodedIssuerLen",
      "EncodedIssuer",
      "SecurityDesc",
      "EncodedSecurityDescLen",
      "EncodedSecurityDesc",
      "Side"
    ]
  },
  {
    "msgtype": "J",
    "name": "Allocation",
    "requiredFields": [
      "AllocID",
      "AllocTransType",
      "Side",
      "Symbol",
      "Shares",
      "AvgPx",
      "TradeDate"
    ],
    "allFields": [
      "AllocID",
      "AllocTransType",
      "RefAllocID",
      "AllocLinkID",
      "AllocLinkType",
      "Side",
      "Symbol",
      "SymbolSfx",
      "SecurityID",
      "IDSource",
      "SecurityType",
      "MaturityMonthYear",
      "MaturityDay",
      "PutOrCall",
      "StrikePrice",
      "OptAttribute",
      "ContractMultiplier",
      "CouponRate",
      "SecurityExchange",
      "Issuer",
      "EncodedIssuerLen",
      "EncodedIssuer",
      "SecurityDesc",
      "EncodedSecurityDescLen",
      "EncodedSecurityDesc",
      "Shares",
      "LastMkt",
      "TradingSessionID",
      "AvgPx",
      "Currency",
      "AvgPrxPrecision",
      "TradeDate",
      "TransactTime",
      "SettlmntTyp",
      "FutSettDate",
      "GrossTradeAmt",
      "NetMoney",
      "OpenClose",
      "Text",
      "EncodedTextLen",
      "EncodedText",
      "NumDaysInterest",
      "AccruedInterestRate"
    ]
  },
  {
    "msgtype": "K",
    "name": "List Cancel Request",
    "requiredFields": [
      "ListID",
      "TransactTime"
    ],
    "allFields": [
      "ListID",
      "TransactTime",
      "Text",
      "EncodedTextLen",
      "EncodedText"
    ]
  },
  {
    "msgtype": "L",
    "name": "List Execute",
    "requiredFields": [
      "ListID",
      "TransactTime"
    ],
    "allFields": [
      "ListID",
      "ClientBidID",
      "BidID",
      "TransactTime",
      "Text",
      "EncodedTextLen",
      "EncodedText"
    ]
  },
  {
    "msgtype": "M",
    "name": "List Status Request",
    "requiredFields": [
      "ListID"
    ],
    "allFields": [
      "ListID",
      "Text",
      "EncodedTextLen",
      "EncodedText"
    ]
  },
  {
    "msgtype": "N",
    "name": "List Status",
    "requiredFields": [
      "ListID",
      "ListStatusType",
      "NoRpts",
      "ListOrderStatus",
      "RptSeq",
      "TotNoOrders"
    ],
    "allFields": [
      "ListID",
      "ListStatusType",
      "NoRpts",
      "ListOrderStatus",
      "RptSeq",
      "ListStatusText",
      "EncodedListStatusTextLen",
      "EncodedListStatusText",
      "TransactTime",
      "TotNoOrders"
    ]
  },
  {
    "msgtype": "P",
    "name": "Allocation Instruction Ack",
    "requiredFields": [
      "AllocID",
      "TradeDate",
      "AllocStatus"
    ],
    "allFields": [
      "ClientID",
      "ExecBroker",
      "AllocID",
      "TradeDate",
      "TransactTime",
      "AllocStatus",
      "AllocRejCode",
      "Text",
      "EncodedTextLen",
      "EncodedText"
    ]
  },
  {
    "msgtype": "Q",
    "name": "Dont Know Trade",
    "requiredFields": [
      "OrderID",
      "ExecID",
      "DKReason",
      "Symbol",
      "Side"
    ],
    "allFields": [
      "OrderID",
      "ExecID",
      "DKReason",
      "Symbol",
      "SymbolSfx",
      "SecurityID",
      "IDSource",
      "SecurityType",
      "MaturityMonthYear",
      "MaturityDay",
      "PutOrCall",
      "StrikePrice",
      "OptAttribute",
      "ContractMultiplier",
      "CouponRate",
      "SecurityExchange",
      "Issuer",
      "EncodedIssuerLen",
      "EncodedIssuer",
      "SecurityDesc",
      "EncodedSecurityDescLen",
      "EncodedSecurityDesc",
      "Side",
      "OrderQty",
      "CashOrderQty",
      "LastShares",
      "LastPx",
      "Text",
      "EncodedTextLen",
      "EncodedText"
    ]
  },
  {
    "msgtype": "R",
    "name": "Quote Request",
    "requiredFields": [
      "QuoteReqID"
    ],
    "allFields": [
      "QuoteReqID"
    ]
  },
  {
    "msgtype": "S",
    "name": "Quote",
    "requiredFields": [
      "QuoteID",
      "Symbol"
    ],
    "allFields": [
      "QuoteReqID",
      "QuoteID",
      "QuoteResponseLevel",
      "TradingSessionID",
      "Symbol",
      "SymbolSfx",
      "SecurityID",
      "IDSource",
      "SecurityType",
      "MaturityMonthYear",
      "MaturityDay",
      "PutOrCall",
      "StrikePrice",
      "OptAttribute",
      "ContractMultiplier",
      "CouponRate",
      "SecurityExchange",
      "Issuer",
      "EncodedIssuerLen",
      "EncodedIssuer",
      "SecurityDesc",
      "EncodedSecurityDescLen",
      "EncodedSecurityDesc",
      "BidPx",
      "OfferPx",
      "BidSize",
      "OfferSize",
      "ValidUntilTime",
      "BidSpotRate",
      "OfferSpotRate",
      "BidForwardPoints",
      "OfferForwardPoints",
      "TransactTime",
      "FutSettDate",
      "OrdType",
      "FutSettDate2",
      "OrderQty2",
      "Currency"
    ]
  },
  {
    "msgtype": "T",
    "name": "Settlement Instructions",
    "requiredFields": [
      "SettlInstID",
      "SettlInstTransType",
      "SettlInstRefID",
      "SettlInstMode",
      "SettlInstSource",
      "AllocAccount",
      "TransactTime"
    ],
    "allFields": [
      "SettlInstID",
      "SettlInstTransType",
      "SettlInstRefID",
      "SettlInstMode",
      "SettlInstSource",
      "AllocAccount",
      "SettlLocation",
      "TradeDate",
      "AllocID",
      "LastMkt",
      "TradingSessionID",
      "Side",
      "SecurityType",
      "EffectiveTime",
      "TransactTime",
      "ClientID",
      "ExecBroker",
      "StandInstDbType",
      "StandInstDbName",
      "StandInstDbID",
      "SettlDeliveryType",
      "SettlDepositoryCode",
      "SettlBrkrCode",
      "SettlInstCode",
      "SecuritySettlAgentName",
      "SecuritySettlAgentCode",
      "SecuritySettlAgentAcctNum",
      "SecuritySettlAgentAcctName",
      "SecuritySettlAgentContactName",
      "SecuritySettlAgentContactPhone",
      "CashSettlAgentName",
      "CashSettlAgentCode",
      "CashSettlAgentAcctNum",
      "CashSettlAgentAcctName",
      "CashSettlAgentContactName",
      "CashSettlAgentContactPhone"
    ]
  },
  {
    "msgtype": "V",
    "name": "Market Data Request",
    "requiredFields": [
      "MDReqID",
      "SubscriptionRequestType",
      "MarketDepth"
    ],
    "allFields": [
      "MDReqID",
      "SubscriptionRequestType",
      "MarketDepth",
      "MDUpdateType",
      "AggregatedBook"
    ]
  },
  {
    "msgtype": "W",
    "name": "Market Data Snapshot Full Refresh",
    "requiredFields": [
      "Symbol"
    ],
    "allFields": [
      "MDReqID",
      "Symbol",
      "SymbolSfx",
      "SecurityID",
      "IDSource",
      "SecurityType",
      "MaturityMonthYear",
      "MaturityDay",
      "PutOrCall",
      "StrikePrice",
      "OptAttribute",
      "ContractMultiplier",
      "CouponRate",
      "SecurityExchange",
      "Issuer",
      "EncodedIssuerLen",
      "EncodedIssuer",
      "SecurityDesc",
      "EncodedSecurityDescLen",
      "EncodedSecurityDesc",
      "FinancialStatus",
      "CorporateAction",
      "TotalVolumeTraded"
    ]
  },
  {
    "msgtype": "X",
    "name": "Market Data Incremental Refresh",
    "requiredFields": [],
    "allFields": [
      "MDReqID"
    ]
  },
  {
    "msgtype": "Y",
    "name": "Market Data Request Reject",
    "requiredFields": [
      "MDReqID"
    ],
    "allFields": [
      "MDReqID",
      "MDReqRejReason",
      "Text",
      "EncodedTextLen",
      "EncodedText"
    ]
  },
  {
    "msgtype": "Z",
    "name": "Quote Cancel",
    "requiredFields": [
      "QuoteID",
      "QuoteCancelType"
    ],
    "allFields": [
      "QuoteReqID",
      "QuoteID",
      "QuoteCancelType",
      "QuoteResponseLevel",
      "TradingSessionID"
    ]
  },
  {
    "msgtype": "a",
    "name": "Quote Status Request",
    "requiredFields": [
      "Symbol"
    ],
    "allFields": [
      "QuoteID",
      "Symbol",
      "SymbolSfx",
      "SecurityID",
      "IDSource",
      "SecurityType",
      "MaturityMonthYear",
      "MaturityDay",
      "PutOrCall",
      "StrikePrice",
      "OptAttribute",
      "ContractMultiplier",
      "CouponRate",
      "SecurityExchange",
      "Issuer",
      "EncodedIssuerLen",
      "EncodedIssuer",
      "SecurityDesc",
      "EncodedSecurityDescLen",
      "EncodedSecurityDesc",
      "Side",
      "TradingSessionID"
    ]
  },
  {
    "msgtype": "b",
    "name": "Quote Acknowledgement",
    "requiredFields": [
      "QuoteStatus"
    ],
    "allFields": [
      "QuoteReqID",
      "QuoteID",
      "QuoteStatus",
      "QuoteRejectReason",
      "QuoteResponseLevel",
      "TradingSessionID",
      "Text"
    ]
  },
  {
    "msgtype": "c",
    "name": "Security Definition Request",
    "requiredFields": [
      "SecurityReqID",
      "SecurityRequestType"
    ],
    "allFields": [
      "SecurityReqID",
      "SecurityRequestType",
      "Symbol",
      "SymbolSfx",
      "SecurityID",
      "IDSource",
      "SecurityType",
      "MaturityMonthYear",
      "MaturityDay",
      "PutOrCall",
      "StrikePrice",
      "OptAttribute",
      "ContractMultiplier",
      "CouponRate",
      "SecurityExchange",
      "Issuer",
      "EncodedIssuerLen",
      "EncodedIssuer",
      "SecurityDesc",
      "EncodedSecurityDescLen",
      "EncodedSecurityDesc",
      "Currency",
      "Text",
      "EncodedTextLen",
      "EncodedText",
      "TradingSessionID"
    ]
  },
  {
    "msgtype": "d",
    "name": "Security Definition",
    "requiredFields": [
      "SecurityReqID",
      "SecurityResponseID",
      "TotalNumSecurities"
    ],
    "allFields": [
      "SecurityReqID",
      "SecurityResponseID",
      "SecurityResponseType",
      "TotalNumSecurities",
      "Symbol",
      "SymbolSfx",
      "SecurityID",
      "IDSource",
      "SecurityType",
      "MaturityMonthYear",
      "MaturityDay",
      "PutOrCall",
      "StrikePrice",
      "OptAttribute",
      "ContractMultiplier",
      "CouponRate",
      "SecurityExchange",
      "Issuer",
      "EncodedIssuerLen",
      "EncodedIssuer",
      "SecurityDesc",
      "EncodedSecurityDescLen",
      "EncodedSecurityDesc",
      "Currency",
      "TradingSessionID",
      "Text",
      "EncodedTextLen",
      "EncodedText"
    ]
  },
  {
    "msgtype": "e",
    "name": "Security Status Request",
    "requiredFields": [
      "SecurityStatusReqID",
      "Symbol",
      "SubscriptionRequestType"
    ],
    "allFields": [
      "SecurityStatusReqID",
      "Symbol",
      "SymbolSfx",
      "SecurityID",
      "IDSource",
      "SecurityType",
      "MaturityMonthYear",
      "MaturityDay",
      "PutOrCall",
      "StrikePrice",
      "OptAttribute",
      "ContractMultiplier",
      "CouponRate",
      "SecurityExchange",
      "Issuer",
      "EncodedIssuerLen",
      "EncodedIssuer",
      "SecurityDesc",
      "EncodedSecurityDescLen",
      "EncodedSecurityDesc",
      "Currency",
      "SubscriptionRequestType",
      "TradingSessionID"
    ]
  },
  {
    "msgtype": "f",
    "name": "Security Status",
    "requiredFields": [
      "Symbol"
    ],
    "allFields": [
      "SecurityStatusReqID",
      "Symbol",
      "SymbolSfx",
      "SecurityID",
      "IDSource",
      "SecurityType",
      "MaturityMonthYear",
      "MaturityDay",
      "PutOrCall",
      "StrikePrice",
      "OptAttribute",
      "ContractMultiplier",
      "CouponRate",
      "SecurityExchange",
      "Issuer",
      "EncodedIssuerLen",
      "EncodedIssuer",
      "SecurityDesc",
      "EncodedSecurityDescLen",
      "EncodedSecurityDesc",
      "Currency",
      "TradingSessionID",
      "UnsolicitedIndicator",
      "SecurityTradingStatus",
      "FinancialStatus",
      "CorporateAction",
      "HaltReasonChar",
      "InViewOfCommon",
      "DueToRelated",
      "BuyVolume",
      "SellVolume",
      "HighPx",
      "LowPx",
      "LastPx",
      "TransactTime",
      "Adjustment"
    ]
  },
  {
    "msgtype": "g",
    "name": "Trading Session Status Request",
    "requiredFields": [
      "TradSesReqID",
      "SubscriptionRequestType"
    ],
    "allFields": [
      "TradSesReqID",
      "TradingSessionID",
      "TradSesMethod",
      "TradSesMode",
      "SubscriptionRequestType"
    ]
  },
  {
    "msgtype": "h",
    "name": "Trading Session Status",
    "requiredFields": [
      "TradingSessionID",
      "TradSesStatus"
    ],
    "allFields": [
      "TradSesReqID",
      "TradingSessionID",
      "TradSesMethod",
      "TradSesMode",
      "UnsolicitedIndicator",
      "TradSesStatus",
      "TradSesStartTime",
      "TradSesOpenTime",
      "TradSesPreCloseTime",
      "TradSesCloseTime",
      "TradSesEndTime",
      "TotalVolumeTraded",
      "Text",
      "EncodedTextLen",
      "EncodedText"
    ]
  },
  {
    "msgtype": "i",
    "name": "Mass Quote",
    "requiredFields": [
      "QuoteID"
    ],
    "allFields": [
      "QuoteReqID",
      "QuoteID",
      "QuoteResponseLevel",
      "DefBidSize",
      "DefOfferSize"
    ]
  },
  {
    "msgtype": "j",
    "name": "Business Message Reject",
    "requiredFields": [
      "RefMsgType",
      "BusinessRejectReason"
    ],
    "allFields": [
      "RefSeqNum",
      "RefMsgType",
      "BusinessRejectRefID",
      "BusinessRejectReason",
      "Text",
      "EncodedTextLen",
      "EncodedText"
    ]
  },
  {
    "msgtype": "k",
    "name": "Bid Request",
    "requiredFields": [
      "ClientBidID",
      "BidRequestTransType",
      "TotalNumSecurities",
      "BidType",
      "TradeType",
      "BasisPxType"
    ],
    "allFields": [
      "BidID",
      "ClientBidID",
      "BidRequestTransType",
      "ListName",
      "TotalNumSecurities",
      "BidType",
      "NumTickets",
      "Currency",
      "SideValue1",
      "SideValue2",
      "LiquidityIndType",
      "WtAverageLiquidity",
      "ExchangeForPhysical",
      "OutMainCntryUIndex",
      "CrossPercent",
      "ProgRptReqs",
      "ProgPeriodInterval",
      "IncTaxInd",
      "ForexReq",
      "NumBidders",
      "TradeDate",
      "TradeType",
      "BasisPxType",
      "StrikeTime",
      "Text",
      "EncodedTextLen",
      "EncodedText"
    ]
  },
  {
    "msgtype": "l",
    "name": "Bid Response",
    "requiredFields": [],
    "allFields": [
      "BidID",
      "ClientBidID"
    ]
  },
  {
    "msgtype": "m",
    "name": "List Strike Price",
    "requiredFields": [
      "ListID",
      "TotNoStrikes"
    ],
    "allFields": [
      "ListID",
      "TotNoStrikes"
    ]
  }
]

export const MESSAGES_44: MessageDef[] = [
  {
    "msgtype": "0",
    "name": "Heartbeat",
    "requiredFields": [],
    "allFields": [
      "TestReqID"
    ]
  },
  {
    "msgtype": "1",
    "name": "Test Request",
    "requiredFields": [
      "TestReqID"
    ],
    "allFields": [
      "TestReqID"
    ]
  },
  {
    "msgtype": "2",
    "name": "Resend Request",
    "requiredFields": [
      "BeginSeqNo",
      "EndSeqNo"
    ],
    "allFields": [
      "BeginSeqNo",
      "EndSeqNo"
    ]
  },
  {
    "msgtype": "3",
    "name": "Reject",
    "requiredFields": [
      "RefSeqNum"
    ],
    "allFields": [
      "RefSeqNum",
      "RefTagID",
      "RefMsgType",
      "SessionRejectReason",
      "Text",
      "EncodedTextLen",
      "EncodedText"
    ]
  },
  {
    "msgtype": "4",
    "name": "Sequence Reset",
    "requiredFields": [
      "NewSeqNo"
    ],
    "allFields": [
      "GapFillFlag",
      "NewSeqNo"
    ]
  },
  {
    "msgtype": "5",
    "name": "Logout",
    "requiredFields": [],
    "allFields": [
      "Text",
      "EncodedTextLen",
      "EncodedText"
    ]
  },
  {
    "msgtype": "6",
    "name": "Ioi",
    "requiredFields": [
      "IOIID",
      "IOITransType",
      "Side",
      "IOIQty"
    ],
    "allFields": [
      "IOIID",
      "IOITransType",
      "IOIRefID",
      "Symbol",
      "SymbolSfx",
      "SecurityID",
      "SecurityIDSource",
      "Product",
      "CFICode",
      "SecurityType",
      "SecuritySubType",
      "MaturityMonthYear",
      "MaturityDate",
      "PutOrCall",
      "CouponPaymentDate",
      "IssueDate",
      "RepoCollateralSecurityType",
      "RepurchaseTerm",
      "RepurchaseRate",
      "Factor",
      "CreditRating",
      "InstrRegistry",
      "CountryOfIssue",
      "StateOrProvinceOfIssue",
      "LocaleOfIssue",
      "RedemptionDate",
      "StrikePrice",
      "StrikeCurrency",
      "OptAttribute",
      "ContractMultiplier",
      "CouponRate",
      "SecurityExchange",
      "Issuer",
      "EncodedIssuerLen",
      "EncodedIssuer",
      "SecurityDesc",
      "EncodedSecurityDescLen",
      "EncodedSecurityDesc",
      "Pool",
      "ContractSettlMonth",
      "CPProgram",
      "CPRegType",
      "DatedDate",
      "InterestAccrualDate",
      "AgreementDesc",
      "AgreementID",
      "AgreementDate",
      "AgreementCurrency",
      "TerminationType",
      "StartDate",
      "EndDate",
      "DeliveryType",
      "MarginRatio",
      "Side",
      "QtyType",
      "OrderQty",
      "CashOrderQty",
      "OrderPercent",
      "RoundingDirection",
      "RoundingModulus",
      "IOIQty",
      "Currency",
      "PriceType",
      "Price",
      "ValidUntilTime",
      "IOIQltyInd",
      "IOINaturalFlag",
      "Text",
      "EncodedTextLen",
      "EncodedText",
      "TransactTime",
      "URLLink",
      "Spread",
      "BenchmarkCurveCurrency",
      "BenchmarkCurveName",
      "BenchmarkCurvePoint",
      "BenchmarkPrice",
      "BenchmarkPriceType",
      "BenchmarkSecurityID",
      "BenchmarkSecurityIDSource",
      "YieldType",
      "Yield",
      "YieldCalcDate",
      "YieldRedemptionDate",
      "YieldRedemptionPrice",
      "YieldRedemptionPriceType"
    ]
  },
  {
    "msgtype": "7",
    "name": "Advertisement",
    "requiredFields": [
      "AdvId",
      "AdvTransType",
      "AdvSide",
      "Quantity"
    ],
    "allFields": [
      "AdvId",
      "AdvTransType",
      "AdvRefID",
      "Symbol",
      "SymbolSfx",
      "SecurityID",
      "SecurityIDSource",
      "Product",
      "CFICode",
      "SecurityType",
      "SecuritySubType",
      "MaturityMonthYear",
      "MaturityDate",
      "PutOrCall",
      "CouponPaymentDate",
      "IssueDate",
      "RepoCollateralSecurityType",
      "RepurchaseTerm",
      "RepurchaseRate",
      "Factor",
      "CreditRating",
      "InstrRegistry",
      "CountryOfIssue",
      "StateOrProvinceOfIssue",
      "LocaleOfIssue",
      "RedemptionDate",
      "StrikePrice",
      "StrikeCurrency",
      "OptAttribute",
      "ContractMultiplier",
      "CouponRate",
      "SecurityExchange",
      "Issuer",
      "EncodedIssuerLen",
      "EncodedIssuer",
      "SecurityDesc",
      "EncodedSecurityDescLen",
      "EncodedSecurityDesc",
      "Pool",
      "ContractSettlMonth",
      "CPProgram",
      "CPRegType",
      "DatedDate",
      "InterestAccrualDate",
      "AdvSide",
      "Quantity",
      "QtyType",
      "Price",
      "Currency",
      "TradeDate",
      "TransactTime",
      "Text",
      "EncodedTextLen",
      "EncodedText",
      "URLLink",
      "LastMkt",
      "TradingSessionID",
      "TradingSessionSubID"
    ]
  },
  {
    "msgtype": "8",
    "name": "Execution Report",
    "requiredFields": [
      "OrderID",
      "ExecID",
      "ExecType",
      "OrdStatus",
      "Side",
      "LeavesQty",
      "CumQty",
      "AvgPx"
    ],
    "allFields": [
      "OrderID",
      "SecondaryOrderID",
      "SecondaryClOrdID",
      "SecondaryExecID",
      "ClOrdID",
      "OrigClOrdID",
      "ClOrdLinkID",
      "QuoteRespID",
      "OrdStatusReqID",
      "MassStatusReqID",
      "TotNumReports",
      "LastRptRequested",
      "TradeOriginationDate",
      "ListID",
      "CrossID",
      "OrigCrossID",
      "CrossType",
      "ExecID",
      "ExecRefID",
      "ExecType",
      "OrdStatus",
      "WorkingIndicator",
      "OrdRejReason",
      "ExecRestatementReason",
      "Account",
      "AcctIDSource",
      "AccountType",
      "DayBookingInst",
      "BookingUnit",
      "PreallocMethod",
      "SettlType",
      "SettlDate",
      "CashMargin",
      "ClearingFeeIndicator",
      "Symbol",
      "SymbolSfx",
      "SecurityID",
      "SecurityIDSource",
      "Product",
      "CFICode",
      "SecurityType",
      "SecuritySubType",
      "MaturityMonthYear",
      "MaturityDate",
      "PutOrCall",
      "CouponPaymentDate",
      "IssueDate",
      "RepoCollateralSecurityType",
      "RepurchaseTerm",
      "RepurchaseRate",
      "Factor",
      "CreditRating",
      "InstrRegistry",
      "CountryOfIssue",
      "StateOrProvinceOfIssue",
      "LocaleOfIssue",
      "RedemptionDate",
      "StrikePrice",
      "StrikeCurrency",
      "OptAttribute",
      "ContractMultiplier",
      "CouponRate",
      "SecurityExchange",
      "Issuer",
      "EncodedIssuerLen",
      "EncodedIssuer",
      "SecurityDesc",
      "EncodedSecurityDescLen",
      "EncodedSecurityDesc",
      "Pool",
      "ContractSettlMonth",
      "CPProgram",
      "CPRegType",
      "DatedDate",
      "InterestAccrualDate",
      "AgreementDesc",
      "AgreementID",
      "AgreementDate",
      "AgreementCurrency",
      "TerminationType",
      "StartDate",
      "EndDate",
      "DeliveryType",
      "MarginRatio",
      "Side",
      "QtyType",
      "OrderQty",
      "CashOrderQty",
      "OrderPercent",
      "RoundingDirection",
      "RoundingModulus",
      "OrdType",
      "PriceType",
      "Price",
      "StopPx",
      "PegOffsetValue",
      "PegMoveType",
      "PegOffsetType",
      "PegLimitType",
      "PegRoundDirection",
      "PegScope",
      "DiscretionInst",
      "DiscretionOffsetValue",
      "DiscretionMoveType",
      "DiscretionOffsetType",
      "DiscretionLimitType",
      "DiscretionRoundDirection",
      "DiscretionScope",
      "PeggedPrice",
      "DiscretionPrice",
      "TargetStrategy",
      "TargetStrategyParameters",
      "ParticipationRate",
      "TargetStrategyPerformance",
      "Currency",
      "ComplianceID",
      "SolicitedFlag",
      "TimeInForce",
      "EffectiveTime",
      "ExpireDate",
      "ExpireTime",
      "ExecInst",
      "OrderCapacity",
      "OrderRestrictions",
      "CustOrderCapacity",
      "LastQty",
      "UnderlyingLastQty",
      "LastPx",
      "UnderlyingLastPx",
      "LastParPx",
      "LastSpotRate",
      "LastForwardPoints",
      "LastMkt",
      "TradingSessionID",
      "TradingSessionSubID",
      "TimeBracket",
      "LastCapacity",
      "LeavesQty",
      "CumQty",
      "AvgPx",
      "DayOrderQty",
      "DayCumQty",
      "DayAvgPx",
      "GTBookingInst",
      "TradeDate",
      "TransactTime",
      "ReportToExch",
      "Commission",
      "CommType",
      "CommCurrency",
      "FundRenewWaiv",
      "Spread",
      "BenchmarkCurveCurrency",
      "BenchmarkCurveName",
      "BenchmarkCurvePoint",
      "BenchmarkPrice",
      "BenchmarkPriceType",
      "BenchmarkSecurityID",
      "BenchmarkSecurityIDSource",
      "YieldType",
      "Yield",
      "YieldCalcDate",
      "YieldRedemptionDate",
      "YieldRedemptionPrice",
      "YieldRedemptionPriceType",
      "GrossTradeAmt",
      "NumDaysInterest",
      "ExDate",
      "AccruedInterestRate",
      "AccruedInterestAmt",
      "InterestAtMaturity",
      "EndAccruedInterestAmt",
      "StartCash",
      "EndCash",
      "TradedFlatSwitch",
      "BasisFeatureDate",
      "BasisFeaturePrice",
      "Concession",
      "TotalTakedown",
      "NetMoney",
      "SettlCurrAmt",
      "SettlCurrency",
      "SettlCurrFxRate",
      "SettlCurrFxRateCalc",
      "HandlInst",
      "MinQty",
      "MaxFloor",
      "PositionEffect",
      "MaxShow",
      "BookingType",
      "Text",
      "EncodedTextLen",
      "EncodedText",
      "SettlDate2",
      "OrderQty2",
      "LastForwardPoints2",
      "MultiLegReportingType",
      "CancellationRights",
      "MoneyLaunderingStatus",
      "RegistID",
      "Designation",
      "TransBkdTime",
      "ExecValuationPoint",
      "ExecPriceType",
      "ExecPriceAdjustment",
      "PriorityIndicator",
      "PriceImprovement",
      "LastLiquidityInd",
      "CopyMsgIndicator"
    ]
  },
  {
    "msgtype": "9",
    "name": "Order Cancel Reject",
    "requiredFields": [
      "OrderID",
      "ClOrdID",
      "OrigClOrdID",
      "OrdStatus",
      "CxlRejResponseTo"
    ],
    "allFields": [
      "OrderID",
      "SecondaryOrderID",
      "SecondaryClOrdID",
      "ClOrdID",
      "ClOrdLinkID",
      "OrigClOrdID",
      "OrdStatus",
      "WorkingIndicator",
      "OrigOrdModTime",
      "ListID",
      "Account",
      "AcctIDSource",
      "AccountType",
      "TradeOriginationDate",
      "TradeDate",
      "TransactTime",
      "CxlRejResponseTo",
      "CxlRejReason",
      "Text",
      "EncodedTextLen",
      "EncodedText"
    ]
  },
  {
    "msgtype": "A",
    "name": "Logon",
    "requiredFields": [
      "EncryptMethod",
      "HeartBtInt"
    ],
    "allFields": [
      "EncryptMethod",
      "HeartBtInt",
      "RawDataLength",
      "RawData",
      "ResetSeqNumFlag",
      "NextExpectedMsgSeqNum",
      "MaxMessageSize",
      "TestMessageIndicator",
      "Username",
      "Password"
    ]
  },
  {
    "msgtype": "B",
    "name": "News",
    "requiredFields": [
      "Headline"
    ],
    "allFields": [
      "OrigTime",
      "Urgency",
      "Headline",
      "EncodedHeadlineLen",
      "EncodedHeadline",
      "URLLink",
      "RawDataLength",
      "RawData"
    ]
  },
  {
    "msgtype": "C",
    "name": "Email",
    "requiredFields": [
      "EmailThreadID",
      "EmailType",
      "Subject"
    ],
    "allFields": [
      "EmailThreadID",
      "EmailType",
      "OrigTime",
      "Subject",
      "EncodedSubjectLen",
      "EncodedSubject",
      "OrderID",
      "ClOrdID",
      "RawDataLength",
      "RawData"
    ]
  },
  {
    "msgtype": "D",
    "name": "New Order Single",
    "requiredFields": [
      "ClOrdID",
      "Side",
      "TransactTime",
      "OrdType"
    ],
    "allFields": [
      "ClOrdID",
      "SecondaryClOrdID",
      "ClOrdLinkID",
      "TradeOriginationDate",
      "TradeDate",
      "Account",
      "AcctIDSource",
      "AccountType",
      "DayBookingInst",
      "BookingUnit",
      "PreallocMethod",
      "AllocID",
      "SettlType",
      "SettlDate",
      "CashMargin",
      "ClearingFeeIndicator",
      "HandlInst",
      "ExecInst",
      "MinQty",
      "MaxFloor",
      "ExDestination",
      "ProcessCode",
      "Symbol",
      "SymbolSfx",
      "SecurityID",
      "SecurityIDSource",
      "Product",
      "CFICode",
      "SecurityType",
      "SecuritySubType",
      "MaturityMonthYear",
      "MaturityDate",
      "PutOrCall",
      "CouponPaymentDate",
      "IssueDate",
      "RepoCollateralSecurityType",
      "RepurchaseTerm",
      "RepurchaseRate",
      "Factor",
      "CreditRating",
      "InstrRegistry",
      "CountryOfIssue",
      "StateOrProvinceOfIssue",
      "LocaleOfIssue",
      "RedemptionDate",
      "StrikePrice",
      "StrikeCurrency",
      "OptAttribute",
      "ContractMultiplier",
      "CouponRate",
      "SecurityExchange",
      "Issuer",
      "EncodedIssuerLen",
      "EncodedIssuer",
      "SecurityDesc",
      "EncodedSecurityDescLen",
      "EncodedSecurityDesc",
      "Pool",
      "ContractSettlMonth",
      "CPProgram",
      "CPRegType",
      "DatedDate",
      "InterestAccrualDate",
      "AgreementDesc",
      "AgreementID",
      "AgreementDate",
      "AgreementCurrency",
      "TerminationType",
      "StartDate",
      "EndDate",
      "DeliveryType",
      "MarginRatio",
      "PrevClosePx",
      "Side",
      "LocateReqd",
      "TransactTime",
      "QtyType",
      "OrderQty",
      "CashOrderQty",
      "OrderPercent",
      "RoundingDirection",
      "RoundingModulus",
      "OrdType",
      "PriceType",
      "Price",
      "StopPx",
      "Spread",
      "BenchmarkCurveCurrency",
      "BenchmarkCurveName",
      "BenchmarkCurvePoint",
      "BenchmarkPrice",
      "BenchmarkPriceType",
      "BenchmarkSecurityID",
      "BenchmarkSecurityIDSource",
      "YieldType",
      "Yield",
      "YieldCalcDate",
      "YieldRedemptionDate",
      "YieldRedemptionPrice",
      "YieldRedemptionPriceType",
      "Currency",
      "ComplianceID",
      "SolicitedFlag",
      "IOIID",
      "QuoteID",
      "TimeInForce",
      "EffectiveTime",
      "ExpireDate",
      "ExpireTime",
      "GTBookingInst",
      "Commission",
      "CommType",
      "CommCurrency",
      "FundRenewWaiv",
      "OrderCapacity",
      "OrderRestrictions",
      "CustOrderCapacity",
      "ForexReq",
      "SettlCurrency",
      "BookingType",
      "Text",
      "EncodedTextLen",
      "EncodedText",
      "SettlDate2",
      "OrderQty2",
      "Price2",
      "PositionEffect",
      "CoveredOrUncovered",
      "MaxShow",
      "PegOffsetValue",
      "PegMoveType",
      "PegOffsetType",
      "PegLimitType",
      "PegRoundDirection",
      "PegScope",
      "DiscretionInst",
      "DiscretionOffsetValue",
      "DiscretionMoveType",
      "DiscretionOffsetType",
      "DiscretionLimitType",
      "DiscretionRoundDirection",
      "DiscretionScope",
      "TargetStrategy",
      "TargetStrategyParameters",
      "ParticipationRate",
      "CancellationRights",
      "MoneyLaunderingStatus",
      "RegistID",
      "Designation"
    ]
  },
  {
    "msgtype": "E",
    "name": "New Order List",
    "requiredFields": [
      "ListID",
      "BidType",
      "TotNoOrders"
    ],
    "allFields": [
      "ListID",
      "BidID",
      "ClientBidID",
      "ProgRptReqs",
      "BidType",
      "ProgPeriodInterval",
      "CancellationRights",
      "MoneyLaunderingStatus",
      "RegistID",
      "ListExecInstType",
      "ListExecInst",
      "EncodedListExecInstLen",
      "EncodedListExecInst",
      "AllowableOneSidednessPct",
      "AllowableOneSidednessValue",
      "AllowableOneSidednessCurr",
      "TotNoOrders",
      "LastFragment"
    ]
  },
  {
    "msgtype": "F",
    "name": "Order Cancel Request",
    "requiredFields": [
      "OrigClOrdID",
      "ClOrdID",
      "Side",
      "TransactTime"
    ],
    "allFields": [
      "OrigClOrdID",
      "OrderID",
      "ClOrdID",
      "SecondaryClOrdID",
      "ClOrdLinkID",
      "ListID",
      "OrigOrdModTime",
      "Account",
      "AcctIDSource",
      "AccountType",
      "Symbol",
      "SymbolSfx",
      "SecurityID",
      "SecurityIDSource",
      "Product",
      "CFICode",
      "SecurityType",
      "SecuritySubType",
      "MaturityMonthYear",
      "MaturityDate",
      "PutOrCall",
      "CouponPaymentDate",
      "IssueDate",
      "RepoCollateralSecurityType",
      "RepurchaseTerm",
      "RepurchaseRate",
      "Factor",
      "CreditRating",
      "InstrRegistry",
      "CountryOfIssue",
      "StateOrProvinceOfIssue",
      "LocaleOfIssue",
      "RedemptionDate",
      "StrikePrice",
      "StrikeCurrency",
      "OptAttribute",
      "ContractMultiplier",
      "CouponRate",
      "SecurityExchange",
      "Issuer",
      "EncodedIssuerLen",
      "EncodedIssuer",
      "SecurityDesc",
      "EncodedSecurityDescLen",
      "EncodedSecurityDesc",
      "Pool",
      "ContractSettlMonth",
      "CPProgram",
      "CPRegType",
      "DatedDate",
      "InterestAccrualDate",
      "AgreementDesc",
      "AgreementID",
      "AgreementDate",
      "AgreementCurrency",
      "TerminationType",
      "StartDate",
      "EndDate",
      "DeliveryType",
      "MarginRatio",
      "Side",
      "TransactTime",
      "OrderQty",
      "CashOrderQty",
      "OrderPercent",
      "RoundingDirection",
      "RoundingModulus",
      "ComplianceID",
      "Text",
      "EncodedTextLen",
      "EncodedText"
    ]
  },
  {
    "msgtype": "G",
    "name": "Order Cancel Replace Request",
    "requiredFields": [
      "OrigClOrdID",
      "ClOrdID",
      "Side",
      "TransactTime",
      "OrdType"
    ],
    "allFields": [
      "OrderID",
      "TradeOriginationDate",
      "TradeDate",
      "OrigClOrdID",
      "ClOrdID",
      "SecondaryClOrdID",
      "ClOrdLinkID",
      "ListID",
      "OrigOrdModTime",
      "Account",
      "AcctIDSource",
      "AccountType",
      "DayBookingInst",
      "BookingUnit",
      "PreallocMethod",
      "AllocID",
      "SettlType",
      "SettlDate",
      "CashMargin",
      "ClearingFeeIndicator",
      "HandlInst",
      "ExecInst",
      "MinQty",
      "MaxFloor",
      "ExDestination",
      "Symbol",
      "SymbolSfx",
      "SecurityID",
      "SecurityIDSource",
      "Product",
      "CFICode",
      "SecurityType",
      "SecuritySubType",
      "MaturityMonthYear",
      "MaturityDate",
      "PutOrCall",
      "CouponPaymentDate",
      "IssueDate",
      "RepoCollateralSecurityType",
      "RepurchaseTerm",
      "RepurchaseRate",
      "Factor",
      "CreditRating",
      "InstrRegistry",
      "CountryOfIssue",
      "StateOrProvinceOfIssue",
      "LocaleOfIssue",
      "RedemptionDate",
      "StrikePrice",
      "StrikeCurrency",
      "OptAttribute",
      "ContractMultiplier",
      "CouponRate",
      "SecurityExchange",
      "Issuer",
      "EncodedIssuerLen",
      "EncodedIssuer",
      "SecurityDesc",
      "EncodedSecurityDescLen",
      "EncodedSecurityDesc",
      "Pool",
      "ContractSettlMonth",
      "CPProgram",
      "CPRegType",
      "DatedDate",
      "InterestAccrualDate",
      "AgreementDesc",
      "AgreementID",
      "AgreementDate",
      "AgreementCurrency",
      "TerminationType",
      "StartDate",
      "EndDate",
      "DeliveryType",
      "MarginRatio",
      "Side",
      "TransactTime",
      "QtyType",
      "OrderQty",
      "CashOrderQty",
      "OrderPercent",
      "RoundingDirection",
      "RoundingModulus",
      "OrdType",
      "PriceType",
      "Price",
      "StopPx",
      "Spread",
      "BenchmarkCurveCurrency",
      "BenchmarkCurveName",
      "BenchmarkCurvePoint",
      "BenchmarkPrice",
      "BenchmarkPriceType",
      "BenchmarkSecurityID",
      "BenchmarkSecurityIDSource",
      "YieldType",
      "Yield",
      "YieldCalcDate",
      "YieldRedemptionDate",
      "YieldRedemptionPrice",
      "YieldRedemptionPriceType",
      "PegOffsetValue",
      "PegMoveType",
      "PegOffsetType",
      "PegLimitType",
      "PegRoundDirection",
      "PegScope",
      "DiscretionInst",
      "DiscretionOffsetValue",
      "DiscretionMoveType",
      "DiscretionOffsetType",
      "DiscretionLimitType",
      "DiscretionRoundDirection",
      "DiscretionScope",
      "TargetStrategy",
      "TargetStrategyParameters",
      "ParticipationRate",
      "ComplianceID",
      "SolicitedFlag",
      "Currency",
      "TimeInForce",
      "EffectiveTime",
      "ExpireDate",
      "ExpireTime",
      "GTBookingInst",
      "Commission",
      "CommType",
      "CommCurrency",
      "FundRenewWaiv",
      "OrderCapacity",
      "OrderRestrictions",
      "CustOrderCapacity",
      "ForexReq",
      "SettlCurrency",
      "BookingType",
      "Text",
      "EncodedTextLen",
      "EncodedText",
      "SettlDate2",
      "OrderQty2",
      "Price2",
      "PositionEffect",
      "CoveredOrUncovered",
      "MaxShow",
      "LocateReqd",
      "CancellationRights",
      "MoneyLaunderingStatus",
      "RegistID",
      "Designation"
    ]
  },
  {
    "msgtype": "H",
    "name": "Order Status Request",
    "requiredFields": [
      "ClOrdID",
      "Side"
    ],
    "allFields": [
      "OrderID",
      "ClOrdID",
      "SecondaryClOrdID",
      "ClOrdLinkID",
      "OrdStatusReqID",
      "Account",
      "AcctIDSource",
      "Symbol",
      "SymbolSfx",
      "SecurityID",
      "SecurityIDSource",
      "Product",
      "CFICode",
      "SecurityType",
      "SecuritySubType",
      "MaturityMonthYear",
      "MaturityDate",
      "PutOrCall",
      "CouponPaymentDate",
      "IssueDate",
      "RepoCollateralSecurityType",
      "RepurchaseTerm",
      "RepurchaseRate",
      "Factor",
      "CreditRating",
      "InstrRegistry",
      "CountryOfIssue",
      "StateOrProvinceOfIssue",
      "LocaleOfIssue",
      "RedemptionDate",
      "StrikePrice",
      "StrikeCurrency",
      "OptAttribute",
      "ContractMultiplier",
      "CouponRate",
      "SecurityExchange",
      "Issuer",
      "EncodedIssuerLen",
      "EncodedIssuer",
      "SecurityDesc",
      "EncodedSecurityDescLen",
      "EncodedSecurityDesc",
      "Pool",
      "ContractSettlMonth",
      "CPProgram",
      "CPRegType",
      "DatedDate",
      "InterestAccrualDate",
      "AgreementDesc",
      "AgreementID",
      "AgreementDate",
      "AgreementCurrency",
      "TerminationType",
      "StartDate",
      "EndDate",
      "DeliveryType",
      "MarginRatio",
      "Side"
    ]
  },
  {
    "msgtype": "J",
    "name": "Allocation Instruction",
    "requiredFields": [
      "AllocID",
      "AllocTransType",
      "AllocType",
      "AllocNoOrdersType",
      "Side",
      "Quantity",
      "AvgPx",
      "TradeDate"
    ],
    "allFields": [
      "AllocID",
      "AllocTransType",
      "AllocType",
      "SecondaryAllocID",
      "RefAllocID",
      "AllocCancReplaceReason",
      "AllocIntermedReqType",
      "AllocLinkID",
      "AllocLinkType",
      "BookingRefID",
      "AllocNoOrdersType",
      "PreviouslyReported",
      "ReversalIndicator",
      "MatchType",
      "Side",
      "Symbol",
      "SymbolSfx",
      "SecurityID",
      "SecurityIDSource",
      "Product",
      "CFICode",
      "SecurityType",
      "SecuritySubType",
      "MaturityMonthYear",
      "MaturityDate",
      "PutOrCall",
      "CouponPaymentDate",
      "IssueDate",
      "RepoCollateralSecurityType",
      "RepurchaseTerm",
      "RepurchaseRate",
      "Factor",
      "CreditRating",
      "InstrRegistry",
      "CountryOfIssue",
      "StateOrProvinceOfIssue",
      "LocaleOfIssue",
      "RedemptionDate",
      "StrikePrice",
      "StrikeCurrency",
      "OptAttribute",
      "ContractMultiplier",
      "CouponRate",
      "SecurityExchange",
      "Issuer",
      "EncodedIssuerLen",
      "EncodedIssuer",
      "SecurityDesc",
      "EncodedSecurityDescLen",
      "EncodedSecurityDesc",
      "Pool",
      "ContractSettlMonth",
      "CPProgram",
      "CPRegType",
      "DatedDate",
      "InterestAccrualDate",
      "DeliveryForm",
      "PctAtRisk",
      "AgreementDesc",
      "AgreementID",
      "AgreementDate",
      "AgreementCurrency",
      "TerminationType",
      "StartDate",
      "EndDate",
      "DeliveryType",
      "MarginRatio",
      "Quantity",
      "QtyType",
      "LastMkt",
      "TradeOriginationDate",
      "TradingSessionID",
      "TradingSessionSubID",
      "PriceType",
      "AvgPx",
      "AvgParPx",
      "Spread",
      "BenchmarkCurveCurrency",
      "BenchmarkCurveName",
      "BenchmarkCurvePoint",
      "BenchmarkPrice",
      "BenchmarkPriceType",
      "BenchmarkSecurityID",
      "BenchmarkSecurityIDSource",
      "Currency",
      "AvgPxPrecision",
      "TradeDate",
      "TransactTime",
      "SettlType",
      "SettlDate",
      "BookingType",
      "GrossTradeAmt",
      "Concession",
      "TotalTakedown",
      "NetMoney",
      "PositionEffect",
      "AutoAcceptIndicator",
      "Text",
      "EncodedTextLen",
      "EncodedText",
      "NumDaysInterest",
      "AccruedInterestRate",
      "AccruedInterestAmt",
      "TotalAccruedInterestAmt",
      "InterestAtMaturity",
      "EndAccruedInterestAmt",
      "StartCash",
      "EndCash",
      "LegalConfirm",
      "YieldType",
      "Yield",
      "YieldCalcDate",
      "YieldRedemptionDate",
      "YieldRedemptionPrice",
      "YieldRedemptionPriceType",
      "TotNoAllocs",
      "LastFragment"
    ]
  },
  {
    "msgtype": "K",
    "name": "List Cancel Request",
    "requiredFields": [
      "ListID",
      "TransactTime"
    ],
    "allFields": [
      "ListID",
      "TransactTime",
      "TradeOriginationDate",
      "TradeDate",
      "Text",
      "EncodedTextLen",
      "EncodedText"
    ]
  },
  {
    "msgtype": "L",
    "name": "List Execute",
    "requiredFields": [
      "ListID",
      "TransactTime"
    ],
    "allFields": [
      "ListID",
      "ClientBidID",
      "BidID",
      "TransactTime",
      "Text",
      "EncodedTextLen",
      "EncodedText"
    ]
  },
  {
    "msgtype": "M",
    "name": "List Status Request",
    "requiredFields": [
      "ListID"
    ],
    "allFields": [
      "ListID",
      "Text",
      "EncodedTextLen",
      "EncodedText"
    ]
  },
  {
    "msgtype": "N",
    "name": "List Status",
    "requiredFields": [
      "ListID",
      "ListStatusType",
      "NoRpts",
      "ListOrderStatus",
      "RptSeq",
      "TotNoOrders"
    ],
    "allFields": [
      "ListID",
      "ListStatusType",
      "NoRpts",
      "ListOrderStatus",
      "RptSeq",
      "ListStatusText",
      "EncodedListStatusTextLen",
      "EncodedListStatusText",
      "TransactTime",
      "TotNoOrders",
      "LastFragment"
    ]
  },
  {
    "msgtype": "P",
    "name": "Allocation Instruction Ack",
    "requiredFields": [
      "AllocID",
      "TransactTime",
      "AllocStatus"
    ],
    "allFields": [
      "AllocID",
      "SecondaryAllocID",
      "TradeDate",
      "TransactTime",
      "AllocStatus",
      "AllocRejCode",
      "AllocType",
      "AllocIntermedReqType",
      "MatchStatus",
      "Product",
      "SecurityType",
      "Text",
      "EncodedTextLen",
      "EncodedText"
    ]
  },
  {
    "msgtype": "Q",
    "name": "Dont Know Trade",
    "requiredFields": [
      "OrderID",
      "ExecID",
      "DKReason",
      "Side"
    ],
    "allFields": [
      "OrderID",
      "SecondaryOrderID",
      "ExecID",
      "DKReason",
      "Symbol",
      "SymbolSfx",
      "SecurityID",
      "SecurityIDSource",
      "Product",
      "CFICode",
      "SecurityType",
      "SecuritySubType",
      "MaturityMonthYear",
      "MaturityDate",
      "PutOrCall",
      "CouponPaymentDate",
      "IssueDate",
      "RepoCollateralSecurityType",
      "RepurchaseTerm",
      "RepurchaseRate",
      "Factor",
      "CreditRating",
      "InstrRegistry",
      "CountryOfIssue",
      "StateOrProvinceOfIssue",
      "LocaleOfIssue",
      "RedemptionDate",
      "StrikePrice",
      "StrikeCurrency",
      "OptAttribute",
      "ContractMultiplier",
      "CouponRate",
      "SecurityExchange",
      "Issuer",
      "EncodedIssuerLen",
      "EncodedIssuer",
      "SecurityDesc",
      "EncodedSecurityDescLen",
      "EncodedSecurityDesc",
      "Pool",
      "ContractSettlMonth",
      "CPProgram",
      "CPRegType",
      "DatedDate",
      "InterestAccrualDate",
      "Side",
      "OrderQty",
      "CashOrderQty",
      "OrderPercent",
      "RoundingDirection",
      "RoundingModulus",
      "LastQty",
      "LastPx",
      "Text",
      "EncodedTextLen",
      "EncodedText"
    ]
  },
  {
    "msgtype": "R",
    "name": "Quote Request",
    "requiredFields": [
      "QuoteReqID"
    ],
    "allFields": [
      "QuoteReqID",
      "RFQReqID",
      "ClOrdID",
      "OrderCapacity",
      "Text",
      "EncodedTextLen",
      "EncodedText"
    ]
  },
  {
    "msgtype": "S",
    "name": "Quote",
    "requiredFields": [
      "QuoteID"
    ],
    "allFields": [
      "QuoteReqID",
      "QuoteID",
      "QuoteRespID",
      "QuoteType",
      "QuoteResponseLevel",
      "TradingSessionID",
      "TradingSessionSubID",
      "Symbol",
      "SymbolSfx",
      "SecurityID",
      "SecurityIDSource",
      "Product",
      "CFICode",
      "SecurityType",
      "SecuritySubType",
      "MaturityMonthYear",
      "MaturityDate",
      "PutOrCall",
      "CouponPaymentDate",
      "IssueDate",
      "RepoCollateralSecurityType",
      "RepurchaseTerm",
      "RepurchaseRate",
      "Factor",
      "CreditRating",
      "InstrRegistry",
      "CountryOfIssue",
      "StateOrProvinceOfIssue",
      "LocaleOfIssue",
      "RedemptionDate",
      "StrikePrice",
      "StrikeCurrency",
      "OptAttribute",
      "ContractMultiplier",
      "CouponRate",
      "SecurityExchange",
      "Issuer",
      "EncodedIssuerLen",
      "EncodedIssuer",
      "SecurityDesc",
      "EncodedSecurityDescLen",
      "EncodedSecurityDesc",
      "Pool",
      "ContractSettlMonth",
      "CPProgram",
      "CPRegType",
      "DatedDate",
      "InterestAccrualDate",
      "AgreementDesc",
      "AgreementID",
      "AgreementDate",
      "AgreementCurrency",
      "TerminationType",
      "StartDate",
      "EndDate",
      "DeliveryType",
      "MarginRatio",
      "Side",
      "OrderQty",
      "CashOrderQty",
      "OrderPercent",
      "RoundingDirection",
      "RoundingModulus",
      "SettlType",
      "SettlDate",
      "SettlDate2",
      "OrderQty2",
      "Currency",
      "Account",
      "AcctIDSource",
      "AccountType",
      "BidPx",
      "OfferPx",
      "MktBidPx",
      "MktOfferPx",
      "MinBidSize",
      "BidSize",
      "MinOfferSize",
      "OfferSize",
      "ValidUntilTime",
      "BidSpotRate",
      "OfferSpotRate",
      "BidForwardPoints",
      "OfferForwardPoints",
      "MidPx",
      "BidYield",
      "MidYield",
      "OfferYield",
      "TransactTime",
      "OrdType",
      "BidForwardPoints2",
      "OfferForwardPoints2",
      "SettlCurrBidFxRate",
      "SettlCurrOfferFxRate",
      "SettlCurrFxRateCalc",
      "CommType",
      "Commission",
      "CustOrderCapacity",
      "ExDestination",
      "OrderCapacity",
      "PriceType",
      "Spread",
      "BenchmarkCurveCurrency",
      "BenchmarkCurveName",
      "BenchmarkCurvePoint",
      "BenchmarkPrice",
      "BenchmarkPriceType",
      "BenchmarkSecurityID",
      "BenchmarkSecurityIDSource",
      "YieldType",
      "Yield",
      "YieldCalcDate",
      "YieldRedemptionDate",
      "YieldRedemptionPrice",
      "YieldRedemptionPriceType",
      "Text",
      "EncodedTextLen",
      "EncodedText"
    ]
  },
  {
    "msgtype": "T",
    "name": "Settlement Instructions",
    "requiredFields": [
      "SettlInstMsgID",
      "SettlInstMode",
      "TransactTime"
    ],
    "allFields": [
      "SettlInstMsgID",
      "SettlInstReqID",
      "SettlInstMode",
      "SettlInstReqRejCode",
      "Text",
      "EncodedTextLen",
      "EncodedText",
      "ClOrdID",
      "TransactTime"
    ]
  },
  {
    "msgtype": "V",
    "name": "Market Data Request",
    "requiredFields": [
      "MDReqID",
      "SubscriptionRequestType",
      "MarketDepth"
    ],
    "allFields": [
      "MDReqID",
      "SubscriptionRequestType",
      "MarketDepth",
      "MDUpdateType",
      "AggregatedBook",
      "OpenCloseSettlFlag",
      "Scope",
      "MDImplicitDelete",
      "ApplQueueAction",
      "ApplQueueMax"
    ]
  },
  {
    "msgtype": "W",
    "name": "Market Data Snapshot Full Refresh",
    "requiredFields": [],
    "allFields": [
      "MDReqID",
      "Symbol",
      "SymbolSfx",
      "SecurityID",
      "SecurityIDSource",
      "Product",
      "CFICode",
      "SecurityType",
      "SecuritySubType",
      "MaturityMonthYear",
      "MaturityDate",
      "PutOrCall",
      "CouponPaymentDate",
      "IssueDate",
      "RepoCollateralSecurityType",
      "RepurchaseTerm",
      "RepurchaseRate",
      "Factor",
      "CreditRating",
      "InstrRegistry",
      "CountryOfIssue",
      "StateOrProvinceOfIssue",
      "LocaleOfIssue",
      "RedemptionDate",
      "StrikePrice",
      "StrikeCurrency",
      "OptAttribute",
      "ContractMultiplier",
      "CouponRate",
      "SecurityExchange",
      "Issuer",
      "EncodedIssuerLen",
      "EncodedIssuer",
      "SecurityDesc",
      "EncodedSecurityDescLen",
      "EncodedSecurityDesc",
      "Pool",
      "ContractSettlMonth",
      "CPProgram",
      "CPRegType",
      "DatedDate",
      "InterestAccrualDate",
      "FinancialStatus",
      "CorporateAction",
      "NetChgPrevDay",
      "ApplQueueDepth",
      "ApplQueueResolution"
    ]
  },
  {
    "msgtype": "X",
    "name": "Market Data Incremental Refresh",
    "requiredFields": [],
    "allFields": [
      "MDReqID",
      "ApplQueueDepth",
      "ApplQueueResolution"
    ]
  },
  {
    "msgtype": "Y",
    "name": "Market Data Request Reject",
    "requiredFields": [
      "MDReqID"
    ],
    "allFields": [
      "MDReqID",
      "MDReqRejReason",
      "Text",
      "EncodedTextLen",
      "EncodedText"
    ]
  },
  {
    "msgtype": "Z",
    "name": "Quote Cancel",
    "requiredFields": [
      "QuoteID",
      "QuoteCancelType"
    ],
    "allFields": [
      "QuoteReqID",
      "QuoteID",
      "QuoteCancelType",
      "QuoteResponseLevel",
      "Account",
      "AcctIDSource",
      "AccountType",
      "TradingSessionID",
      "TradingSessionSubID"
    ]
  },
  {
    "msgtype": "a",
    "name": "Quote Status Request",
    "requiredFields": [],
    "allFields": [
      "QuoteStatusReqID",
      "QuoteID",
      "Symbol",
      "SymbolSfx",
      "SecurityID",
      "SecurityIDSource",
      "Product",
      "CFICode",
      "SecurityType",
      "SecuritySubType",
      "MaturityMonthYear",
      "MaturityDate",
      "PutOrCall",
      "CouponPaymentDate",
      "IssueDate",
      "RepoCollateralSecurityType",
      "RepurchaseTerm",
      "RepurchaseRate",
      "Factor",
      "CreditRating",
      "InstrRegistry",
      "CountryOfIssue",
      "StateOrProvinceOfIssue",
      "LocaleOfIssue",
      "RedemptionDate",
      "StrikePrice",
      "StrikeCurrency",
      "OptAttribute",
      "ContractMultiplier",
      "CouponRate",
      "SecurityExchange",
      "Issuer",
      "EncodedIssuerLen",
      "EncodedIssuer",
      "SecurityDesc",
      "EncodedSecurityDescLen",
      "EncodedSecurityDesc",
      "Pool",
      "ContractSettlMonth",
      "CPProgram",
      "CPRegType",
      "DatedDate",
      "InterestAccrualDate",
      "AgreementDesc",
      "AgreementID",
      "AgreementDate",
      "AgreementCurrency",
      "TerminationType",
      "StartDate",
      "EndDate",
      "DeliveryType",
      "MarginRatio",
      "Account",
      "AcctIDSource",
      "AccountType",
      "TradingSessionID",
      "TradingSessionSubID",
      "SubscriptionRequestType"
    ]
  },
  {
    "msgtype": "b",
    "name": "Mass Quote Acknowledgement",
    "requiredFields": [
      "QuoteStatus"
    ],
    "allFields": [
      "QuoteReqID",
      "QuoteID",
      "QuoteStatus",
      "QuoteRejectReason",
      "QuoteResponseLevel",
      "QuoteType",
      "Account",
      "AcctIDSource",
      "AccountType",
      "Text",
      "EncodedTextLen",
      "EncodedText"
    ]
  },
  {
    "msgtype": "c",
    "name": "Security Definition Request",
    "requiredFields": [
      "SecurityReqID",
      "SecurityRequestType"
    ],
    "allFields": [
      "SecurityReqID",
      "SecurityRequestType",
      "Symbol",
      "SymbolSfx",
      "SecurityID",
      "SecurityIDSource",
      "Product",
      "CFICode",
      "SecurityType",
      "SecuritySubType",
      "MaturityMonthYear",
      "MaturityDate",
      "PutOrCall",
      "CouponPaymentDate",
      "IssueDate",
      "RepoCollateralSecurityType",
      "RepurchaseTerm",
      "RepurchaseRate",
      "Factor",
      "CreditRating",
      "InstrRegistry",
      "CountryOfIssue",
      "StateOrProvinceOfIssue",
      "LocaleOfIssue",
      "RedemptionDate",
      "StrikePrice",
      "StrikeCurrency",
      "OptAttribute",
      "ContractMultiplier",
      "CouponRate",
      "SecurityExchange",
      "Issuer",
      "EncodedIssuerLen",
      "EncodedIssuer",
      "SecurityDesc",
      "EncodedSecurityDescLen",
      "EncodedSecurityDesc",
      "Pool",
      "ContractSettlMonth",
      "CPProgram",
      "CPRegType",
      "DatedDate",
      "InterestAccrualDate",
      "DeliveryForm",
      "PctAtRisk",
      "Currency",
      "Text",
      "EncodedTextLen",
      "EncodedText",
      "TradingSessionID",
      "TradingSessionSubID",
      "ExpirationCycle",
      "SubscriptionRequestType"
    ]
  },
  {
    "msgtype": "d",
    "name": "Security Definition",
    "requiredFields": [
      "SecurityReqID",
      "SecurityResponseID",
      "SecurityResponseType"
    ],
    "allFields": [
      "SecurityReqID",
      "SecurityResponseID",
      "SecurityResponseType",
      "Symbol",
      "SymbolSfx",
      "SecurityID",
      "SecurityIDSource",
      "Product",
      "CFICode",
      "SecurityType",
      "SecuritySubType",
      "MaturityMonthYear",
      "MaturityDate",
      "PutOrCall",
      "CouponPaymentDate",
      "IssueDate",
      "RepoCollateralSecurityType",
      "RepurchaseTerm",
      "RepurchaseRate",
      "Factor",
      "CreditRating",
      "InstrRegistry",
      "CountryOfIssue",
      "StateOrProvinceOfIssue",
      "LocaleOfIssue",
      "RedemptionDate",
      "StrikePrice",
      "StrikeCurrency",
      "OptAttribute",
      "ContractMultiplier",
      "CouponRate",
      "SecurityExchange",
      "Issuer",
      "EncodedIssuerLen",
      "EncodedIssuer",
      "SecurityDesc",
      "EncodedSecurityDescLen",
      "EncodedSecurityDesc",
      "Pool",
      "ContractSettlMonth",
      "CPProgram",
      "CPRegType",
      "DatedDate",
      "InterestAccrualDate",
      "DeliveryForm",
      "PctAtRisk",
      "Currency",
      "TradingSessionID",
      "TradingSessionSubID",
      "Text",
      "EncodedTextLen",
      "EncodedText",
      "ExpirationCycle",
      "RoundLot",
      "MinTradeVol"
    ]
  },
  {
    "msgtype": "e",
    "name": "Security Status Request",
    "requiredFields": [
      "SecurityStatusReqID",
      "SubscriptionRequestType"
    ],
    "allFields": [
      "SecurityStatusReqID",
      "Symbol",
      "SymbolSfx",
      "SecurityID",
      "SecurityIDSource",
      "Product",
      "CFICode",
      "SecurityType",
      "SecuritySubType",
      "MaturityMonthYear",
      "MaturityDate",
      "PutOrCall",
      "CouponPaymentDate",
      "IssueDate",
      "RepoCollateralSecurityType",
      "RepurchaseTerm",
      "RepurchaseRate",
      "Factor",
      "CreditRating",
      "InstrRegistry",
      "CountryOfIssue",
      "StateOrProvinceOfIssue",
      "LocaleOfIssue",
      "RedemptionDate",
      "StrikePrice",
      "StrikeCurrency",
      "OptAttribute",
      "ContractMultiplier",
      "CouponRate",
      "SecurityExchange",
      "Issuer",
      "EncodedIssuerLen",
      "EncodedIssuer",
      "SecurityDesc",
      "EncodedSecurityDescLen",
      "EncodedSecurityDesc",
      "Pool",
      "ContractSettlMonth",
      "CPProgram",
      "CPRegType",
      "DatedDate",
      "InterestAccrualDate",
      "DeliveryForm",
      "PctAtRisk",
      "Currency",
      "SubscriptionRequestType",
      "TradingSessionID",
      "TradingSessionSubID"
    ]
  },
  {
    "msgtype": "f",
    "name": "Security Status",
    "requiredFields": [],
    "allFields": [
      "SecurityStatusReqID",
      "Symbol",
      "SymbolSfx",
      "SecurityID",
      "SecurityIDSource",
      "Product",
      "CFICode",
      "SecurityType",
      "SecuritySubType",
      "MaturityMonthYear",
      "MaturityDate",
      "PutOrCall",
      "CouponPaymentDate",
      "IssueDate",
      "RepoCollateralSecurityType",
      "RepurchaseTerm",
      "RepurchaseRate",
      "Factor",
      "CreditRating",
      "InstrRegistry",
      "CountryOfIssue",
      "StateOrProvinceOfIssue",
      "LocaleOfIssue",
      "RedemptionDate",
      "StrikePrice",
      "StrikeCurrency",
      "OptAttribute",
      "ContractMultiplier",
      "CouponRate",
      "SecurityExchange",
      "Issuer",
      "EncodedIssuerLen",
      "EncodedIssuer",
      "SecurityDesc",
      "EncodedSecurityDescLen",
      "EncodedSecurityDesc",
      "Pool",
      "ContractSettlMonth",
      "CPProgram",
      "CPRegType",
      "DatedDate",
      "InterestAccrualDate",
      "DeliveryForm",
      "PctAtRisk",
      "Currency",
      "TradingSessionID",
      "TradingSessionSubID",
      "UnsolicitedIndicator",
      "SecurityTradingStatus",
      "FinancialStatus",
      "CorporateAction",
      "HaltReasonChar",
      "InViewOfCommon",
      "DueToRelated",
      "BuyVolume",
      "SellVolume",
      "HighPx",
      "LowPx",
      "LastPx",
      "TransactTime",
      "Adjustment",
      "Text",
      "EncodedTextLen",
      "EncodedText"
    ]
  },
  {
    "msgtype": "g",
    "name": "Trading Session Status Request",
    "requiredFields": [
      "TradSesReqID",
      "SubscriptionRequestType"
    ],
    "allFields": [
      "TradSesReqID",
      "TradingSessionID",
      "TradingSessionSubID",
      "TradSesMethod",
      "TradSesMode",
      "SubscriptionRequestType"
    ]
  },
  {
    "msgtype": "h",
    "name": "Trading Session Status",
    "requiredFields": [
      "TradingSessionID",
      "TradSesStatus"
    ],
    "allFields": [
      "TradSesReqID",
      "TradingSessionID",
      "TradingSessionSubID",
      "TradSesMethod",
      "TradSesMode",
      "UnsolicitedIndicator",
      "TradSesStatus",
      "TradSesStatusRejReason",
      "TradSesStartTime",
      "TradSesOpenTime",
      "TradSesPreCloseTime",
      "TradSesCloseTime",
      "TradSesEndTime",
      "TotalVolumeTraded",
      "Text",
      "EncodedTextLen",
      "EncodedText"
    ]
  },
  {
    "msgtype": "i",
    "name": "Mass Quote",
    "requiredFields": [
      "QuoteID"
    ],
    "allFields": [
      "QuoteReqID",
      "QuoteID",
      "QuoteType",
      "QuoteResponseLevel",
      "Account",
      "AcctIDSource",
      "AccountType",
      "DefBidSize",
      "DefOfferSize"
    ]
  },
  {
    "msgtype": "j",
    "name": "Business Message Reject",
    "requiredFields": [
      "RefMsgType",
      "BusinessRejectReason"
    ],
    "allFields": [
      "RefSeqNum",
      "RefMsgType",
      "BusinessRejectRefID",
      "BusinessRejectReason",
      "Text",
      "EncodedTextLen",
      "EncodedText"
    ]
  },
  {
    "msgtype": "k",
    "name": "Bid Request",
    "requiredFields": [
      "ClientBidID",
      "BidRequestTransType",
      "TotNoRelatedSym",
      "BidType",
      "BidTradeType",
      "BasisPxType"
    ],
    "allFields": [
      "BidID",
      "ClientBidID",
      "BidRequestTransType",
      "ListName",
      "TotNoRelatedSym",
      "BidType",
      "NumTickets",
      "Currency",
      "SideValue1",
      "SideValue2",
      "LiquidityIndType",
      "WtAverageLiquidity",
      "ExchangeForPhysical",
      "OutMainCntryUIndex",
      "CrossPercent",
      "ProgRptReqs",
      "ProgPeriodInterval",
      "IncTaxInd",
      "ForexReq",
      "NumBidders",
      "TradeDate",
      "BidTradeType",
      "BasisPxType",
      "StrikeTime",
      "Text",
      "EncodedTextLen",
      "EncodedText"
    ]
  },
  {
    "msgtype": "l",
    "name": "Bid Response",
    "requiredFields": [],
    "allFields": [
      "BidID",
      "ClientBidID"
    ]
  },
  {
    "msgtype": "m",
    "name": "List Strike Price",
    "requiredFields": [
      "ListID",
      "TotNoStrikes"
    ],
    "allFields": [
      "ListID",
      "TotNoStrikes",
      "LastFragment"
    ]
  },
  {
    "msgtype": "n",
    "name": "XMLnon FIX",
    "requiredFields": [],
    "allFields": []
  },
  {
    "msgtype": "o",
    "name": "Registration Instructions",
    "requiredFields": [
      "RegistID",
      "RegistTransType",
      "RegistRefID"
    ],
    "allFields": [
      "RegistID",
      "RegistTransType",
      "RegistRefID",
      "ClOrdID",
      "Account",
      "AcctIDSource",
      "RegistAcctType",
      "TaxAdvantageType",
      "OwnershipType"
    ]
  },
  {
    "msgtype": "p",
    "name": "Registration Instructions Response",
    "requiredFields": [
      "RegistID",
      "RegistTransType",
      "RegistRefID",
      "RegistStatus"
    ],
    "allFields": [
      "RegistID",
      "RegistTransType",
      "RegistRefID",
      "ClOrdID",
      "Account",
      "AcctIDSource",
      "RegistStatus",
      "RegistRejReasonCode",
      "RegistRejReasonText"
    ]
  },
  {
    "msgtype": "q",
    "name": "Order Mass Cancel Request",
    "requiredFields": [
      "ClOrdID",
      "MassCancelRequestType",
      "TransactTime"
    ],
    "allFields": [
      "ClOrdID",
      "SecondaryClOrdID",
      "MassCancelRequestType",
      "TradingSessionID",
      "TradingSessionSubID",
      "Symbol",
      "SymbolSfx",
      "SecurityID",
      "SecurityIDSource",
      "Product",
      "CFICode",
      "SecurityType",
      "SecuritySubType",
      "MaturityMonthYear",
      "MaturityDate",
      "PutOrCall",
      "CouponPaymentDate",
      "IssueDate",
      "RepoCollateralSecurityType",
      "RepurchaseTerm",
      "RepurchaseRate",
      "Factor",
      "CreditRating",
      "InstrRegistry",
      "CountryOfIssue",
      "StateOrProvinceOfIssue",
      "LocaleOfIssue",
      "RedemptionDate",
      "StrikePrice",
      "StrikeCurrency",
      "OptAttribute",
      "ContractMultiplier",
      "CouponRate",
      "SecurityExchange",
      "Issuer",
      "EncodedIssuerLen",
      "EncodedIssuer",
      "SecurityDesc",
      "EncodedSecurityDescLen",
      "EncodedSecurityDesc",
      "Pool",
      "ContractSettlMonth",
      "CPProgram",
      "CPRegType",
      "DatedDate",
      "InterestAccrualDate",
      "UnderlyingSymbol",
      "UnderlyingSymbolSfx",
      "UnderlyingSecurityID",
      "UnderlyingSecurityIDSource",
      "UnderlyingProduct",
      "UnderlyingCFICode",
      "UnderlyingSecurityType",
      "UnderlyingSecuritySubType",
      "UnderlyingMaturityMonthYear",
      "UnderlyingMaturityDate",
      "UnderlyingPutOrCall",
      "UnderlyingCouponPaymentDate",
      "UnderlyingIssueDate",
      "UnderlyingRepoCollateralSecurityType",
      "UnderlyingRepurchaseTerm",
      "UnderlyingRepurchaseRate",
      "UnderlyingFactor",
      "UnderlyingCreditRating",
      "UnderlyingInstrRegistry",
      "UnderlyingCountryOfIssue",
      "UnderlyingStateOrProvinceOfIssue",
      "UnderlyingLocaleOfIssue",
      "UnderlyingRedemptionDate",
      "UnderlyingStrikePrice",
      "UnderlyingStrikeCurrency",
      "UnderlyingOptAttribute",
      "UnderlyingContractMultiplier",
      "UnderlyingCouponRate",
      "UnderlyingSecurityExchange",
      "UnderlyingIssuer",
      "EncodedUnderlyingIssuerLen",
      "EncodedUnderlyingIssuer",
      "UnderlyingSecurityDesc",
      "EncodedUnderlyingSecurityDescLen",
      "EncodedUnderlyingSecurityDesc",
      "UnderlyingCPProgram",
      "UnderlyingCPRegType",
      "UnderlyingCurrency",
      "UnderlyingQty",
      "UnderlyingPx",
      "UnderlyingDirtyPrice",
      "UnderlyingEndPrice",
      "UnderlyingStartValue",
      "UnderlyingCurrentValue",
      "UnderlyingEndValue",
      "Side",
      "TransactTime",
      "Text",
      "EncodedTextLen",
      "EncodedText"
    ]
  },
  {
    "msgtype": "r",
    "name": "Order Mass Cancel Report",
    "requiredFields": [
      "OrderID",
      "MassCancelRequestType",
      "MassCancelResponse"
    ],
    "allFields": [
      "ClOrdID",
      "SecondaryClOrdID",
      "OrderID",
      "SecondaryOrderID",
      "MassCancelRequestType",
      "MassCancelResponse",
      "MassCancelRejectReason",
      "TotalAffectedOrders",
      "TradingSessionID",
      "TradingSessionSubID",
      "Symbol",
      "SymbolSfx",
      "SecurityID",
      "SecurityIDSource",
      "Product",
      "CFICode",
      "SecurityType",
      "SecuritySubType",
      "MaturityMonthYear",
      "MaturityDate",
      "PutOrCall",
      "CouponPaymentDate",
      "IssueDate",
      "RepoCollateralSecurityType",
      "RepurchaseTerm",
      "RepurchaseRate",
      "Factor",
      "CreditRating",
      "InstrRegistry",
      "CountryOfIssue",
      "StateOrProvinceOfIssue",
      "LocaleOfIssue",
      "RedemptionDate",
      "StrikePrice",
      "StrikeCurrency",
      "OptAttribute",
      "ContractMultiplier",
      "CouponRate",
      "SecurityExchange",
      "Issuer",
      "EncodedIssuerLen",
      "EncodedIssuer",
      "SecurityDesc",
      "EncodedSecurityDescLen",
      "EncodedSecurityDesc",
      "Pool",
      "ContractSettlMonth",
      "CPProgram",
      "CPRegType",
      "DatedDate",
      "InterestAccrualDate",
      "UnderlyingSymbol",
      "UnderlyingSymbolSfx",
      "UnderlyingSecurityID",
      "UnderlyingSecurityIDSource",
      "UnderlyingProduct",
      "UnderlyingCFICode",
      "UnderlyingSecurityType",
      "UnderlyingSecuritySubType",
      "UnderlyingMaturityMonthYear",
      "UnderlyingMaturityDate",
      "UnderlyingPutOrCall",
      "UnderlyingCouponPaymentDate",
      "UnderlyingIssueDate",
      "UnderlyingRepoCollateralSecurityType",
      "UnderlyingRepurchaseTerm",
      "UnderlyingRepurchaseRate",
      "UnderlyingFactor",
      "UnderlyingCreditRating",
      "UnderlyingInstrRegistry",
      "UnderlyingCountryOfIssue",
      "UnderlyingStateOrProvinceOfIssue",
      "UnderlyingLocaleOfIssue",
      "UnderlyingRedemptionDate",
      "UnderlyingStrikePrice",
      "UnderlyingStrikeCurrency",
      "UnderlyingOptAttribute",
      "UnderlyingContractMultiplier",
      "UnderlyingCouponRate",
      "UnderlyingSecurityExchange",
      "UnderlyingIssuer",
      "EncodedUnderlyingIssuerLen",
      "EncodedUnderlyingIssuer",
      "UnderlyingSecurityDesc",
      "EncodedUnderlyingSecurityDescLen",
      "EncodedUnderlyingSecurityDesc",
      "UnderlyingCPProgram",
      "UnderlyingCPRegType",
      "UnderlyingCurrency",
      "UnderlyingQty",
      "UnderlyingPx",
      "UnderlyingDirtyPrice",
      "UnderlyingEndPrice",
      "UnderlyingStartValue",
      "UnderlyingCurrentValue",
      "UnderlyingEndValue",
      "Side",
      "TransactTime",
      "Text",
      "EncodedTextLen",
      "EncodedText"
    ]
  },
  {
    "msgtype": "s",
    "name": "New Order Cross",
    "requiredFields": [
      "CrossID",
      "CrossType",
      "CrossPrioritization",
      "TransactTime",
      "OrdType"
    ],
    "allFields": [
      "CrossID",
      "CrossType",
      "CrossPrioritization",
      "Symbol",
      "SymbolSfx",
      "SecurityID",
      "SecurityIDSource",
      "Product",
      "CFICode",
      "SecurityType",
      "SecuritySubType",
      "MaturityMonthYear",
      "MaturityDate",
      "PutOrCall",
      "CouponPaymentDate",
      "IssueDate",
      "RepoCollateralSecurityType",
      "RepurchaseTerm",
      "RepurchaseRate",
      "Factor",
      "CreditRating",
      "InstrRegistry",
      "CountryOfIssue",
      "StateOrProvinceOfIssue",
      "LocaleOfIssue",
      "RedemptionDate",
      "StrikePrice",
      "StrikeCurrency",
      "OptAttribute",
      "ContractMultiplier",
      "CouponRate",
      "SecurityExchange",
      "Issuer",
      "EncodedIssuerLen",
      "EncodedIssuer",
      "SecurityDesc",
      "EncodedSecurityDescLen",
      "EncodedSecurityDesc",
      "Pool",
      "ContractSettlMonth",
      "CPProgram",
      "CPRegType",
      "DatedDate",
      "InterestAccrualDate",
      "SettlType",
      "SettlDate",
      "HandlInst",
      "ExecInst",
      "MinQty",
      "MaxFloor",
      "ExDestination",
      "ProcessCode",
      "PrevClosePx",
      "LocateReqd",
      "TransactTime",
      "OrdType",
      "PriceType",
      "Price",
      "StopPx",
      "Spread",
      "BenchmarkCurveCurrency",
      "BenchmarkCurveName",
      "BenchmarkCurvePoint",
      "BenchmarkPrice",
      "BenchmarkPriceType",
      "BenchmarkSecurityID",
      "BenchmarkSecurityIDSource",
      "YieldType",
      "Yield",
      "YieldCalcDate",
      "YieldRedemptionDate",
      "YieldRedemptionPrice",
      "YieldRedemptionPriceType",
      "Currency",
      "ComplianceID",
      "IOIID",
      "QuoteID",
      "TimeInForce",
      "EffectiveTime",
      "ExpireDate",
      "ExpireTime",
      "GTBookingInst",
      "MaxShow",
      "PegOffsetValue",
      "PegMoveType",
      "PegOffsetType",
      "PegLimitType",
      "PegRoundDirection",
      "PegScope",
      "DiscretionInst",
      "DiscretionOffsetValue",
      "DiscretionMoveType",
      "DiscretionOffsetType",
      "DiscretionLimitType",
      "DiscretionRoundDirection",
      "DiscretionScope",
      "TargetStrategy",
      "TargetStrategyParameters",
      "ParticipationRate",
      "CancellationRights",
      "MoneyLaunderingStatus",
      "RegistID",
      "Designation"
    ]
  },
  {
    "msgtype": "t",
    "name": "Cross Order Cancel Replace Request",
    "requiredFields": [
      "CrossID",
      "OrigCrossID",
      "CrossType",
      "CrossPrioritization",
      "TransactTime",
      "OrdType"
    ],
    "allFields": [
      "OrderID",
      "CrossID",
      "OrigCrossID",
      "CrossType",
      "CrossPrioritization",
      "Symbol",
      "SymbolSfx",
      "SecurityID",
      "SecurityIDSource",
      "Product",
      "CFICode",
      "SecurityType",
      "SecuritySubType",
      "MaturityMonthYear",
      "MaturityDate",
      "PutOrCall",
      "CouponPaymentDate",
      "IssueDate",
      "RepoCollateralSecurityType",
      "RepurchaseTerm",
      "RepurchaseRate",
      "Factor",
      "CreditRating",
      "InstrRegistry",
      "CountryOfIssue",
      "StateOrProvinceOfIssue",
      "LocaleOfIssue",
      "RedemptionDate",
      "StrikePrice",
      "StrikeCurrency",
      "OptAttribute",
      "ContractMultiplier",
      "CouponRate",
      "SecurityExchange",
      "Issuer",
      "EncodedIssuerLen",
      "EncodedIssuer",
      "SecurityDesc",
      "EncodedSecurityDescLen",
      "EncodedSecurityDesc",
      "Pool",
      "ContractSettlMonth",
      "CPProgram",
      "CPRegType",
      "DatedDate",
      "InterestAccrualDate",
      "SettlType",
      "SettlDate",
      "HandlInst",
      "ExecInst",
      "MinQty",
      "MaxFloor",
      "ExDestination",
      "ProcessCode",
      "PrevClosePx",
      "LocateReqd",
      "TransactTime",
      "OrdType",
      "PriceType",
      "Price",
      "StopPx",
      "Spread",
      "BenchmarkCurveCurrency",
      "BenchmarkCurveName",
      "BenchmarkCurvePoint",
      "BenchmarkPrice",
      "BenchmarkPriceType",
      "BenchmarkSecurityID",
      "BenchmarkSecurityIDSource",
      "YieldType",
      "Yield",
      "YieldCalcDate",
      "YieldRedemptionDate",
      "YieldRedemptionPrice",
      "YieldRedemptionPriceType",
      "Currency",
      "ComplianceID",
      "IOIID",
      "QuoteID",
      "TimeInForce",
      "EffectiveTime",
      "ExpireDate",
      "ExpireTime",
      "GTBookingInst",
      "MaxShow",
      "PegOffsetValue",
      "PegMoveType",
      "PegOffsetType",
      "PegLimitType",
      "PegRoundDirection",
      "PegScope",
      "DiscretionInst",
      "DiscretionOffsetValue",
      "DiscretionMoveType",
      "DiscretionOffsetType",
      "DiscretionLimitType",
      "DiscretionRoundDirection",
      "DiscretionScope",
      "TargetStrategy",
      "TargetStrategyParameters",
      "ParticipationRate",
      "CancellationRights",
      "MoneyLaunderingStatus",
      "RegistID",
      "Designation"
    ]
  },
  {
    "msgtype": "u",
    "name": "Cross Order Cancel Request",
    "requiredFields": [
      "CrossID",
      "OrigCrossID",
      "CrossType",
      "CrossPrioritization",
      "TransactTime"
    ],
    "allFields": [
      "OrderID",
      "CrossID",
      "OrigCrossID",
      "CrossType",
      "CrossPrioritization",
      "Symbol",
      "SymbolSfx",
      "SecurityID",
      "SecurityIDSource",
      "Product",
      "CFICode",
      "SecurityType",
      "SecuritySubType",
      "MaturityMonthYear",
      "MaturityDate",
      "PutOrCall",
      "CouponPaymentDate",
      "IssueDate",
      "RepoCollateralSecurityType",
      "RepurchaseTerm",
      "RepurchaseRate",
      "Factor",
      "CreditRating",
      "InstrRegistry",
      "CountryOfIssue",
      "StateOrProvinceOfIssue",
      "LocaleOfIssue",
      "RedemptionDate",
      "StrikePrice",
      "StrikeCurrency",
      "OptAttribute",
      "ContractMultiplier",
      "CouponRate",
      "SecurityExchange",
      "Issuer",
      "EncodedIssuerLen",
      "EncodedIssuer",
      "SecurityDesc",
      "EncodedSecurityDescLen",
      "EncodedSecurityDesc",
      "Pool",
      "ContractSettlMonth",
      "CPProgram",
      "CPRegType",
      "DatedDate",
      "InterestAccrualDate",
      "TransactTime"
    ]
  },
  {
    "msgtype": "v",
    "name": "Security Type Request",
    "requiredFields": [
      "SecurityReqID"
    ],
    "allFields": [
      "SecurityReqID",
      "Text",
      "EncodedTextLen",
      "EncodedText",
      "TradingSessionID",
      "TradingSessionSubID",
      "Product",
      "SecurityType",
      "SecuritySubType"
    ]
  },
  {
    "msgtype": "w",
    "name": "Security Types",
    "requiredFields": [
      "SecurityReqID",
      "SecurityResponseID",
      "SecurityResponseType"
    ],
    "allFields": [
      "SecurityReqID",
      "SecurityResponseID",
      "SecurityResponseType",
      "TotNoSecurityTypes",
      "LastFragment",
      "Text",
      "EncodedTextLen",
      "EncodedText",
      "TradingSessionID",
      "TradingSessionSubID",
      "SubscriptionRequestType"
    ]
  },
  {
    "msgtype": "x",
    "name": "Security List Request",
    "requiredFields": [
      "SecurityReqID",
      "SecurityListRequestType"
    ],
    "allFields": [
      "SecurityReqID",
      "SecurityListRequestType",
      "Symbol",
      "SymbolSfx",
      "SecurityID",
      "SecurityIDSource",
      "Product",
      "CFICode",
      "SecurityType",
      "SecuritySubType",
      "MaturityMonthYear",
      "MaturityDate",
      "PutOrCall",
      "CouponPaymentDate",
      "IssueDate",
      "RepoCollateralSecurityType",
      "RepurchaseTerm",
      "RepurchaseRate",
      "Factor",
      "CreditRating",
      "InstrRegistry",
      "CountryOfIssue",
      "StateOrProvinceOfIssue",
      "LocaleOfIssue",
      "RedemptionDate",
      "StrikePrice",
      "StrikeCurrency",
      "OptAttribute",
      "ContractMultiplier",
      "CouponRate",
      "SecurityExchange",
      "Issuer",
      "EncodedIssuerLen",
      "EncodedIssuer",
      "SecurityDesc",
      "EncodedSecurityDescLen",
      "EncodedSecurityDesc",
      "Pool",
      "ContractSettlMonth",
      "CPProgram",
      "CPRegType",
      "DatedDate",
      "InterestAccrualDate",
      "DeliveryForm",
      "PctAtRisk",
      "AgreementDesc",
      "AgreementID",
      "AgreementDate",
      "AgreementCurrency",
      "TerminationType",
      "StartDate",
      "EndDate",
      "DeliveryType",
      "MarginRatio",
      "Currency",
      "Text",
      "EncodedTextLen",
      "EncodedText",
      "TradingSessionID",
      "TradingSessionSubID",
      "SubscriptionRequestType"
    ]
  },
  {
    "msgtype": "y",
    "name": "Security List",
    "requiredFields": [
      "SecurityReqID",
      "SecurityResponseID",
      "SecurityRequestResult"
    ],
    "allFields": [
      "SecurityReqID",
      "SecurityResponseID",
      "SecurityRequestResult",
      "TotNoRelatedSym",
      "LastFragment"
    ]
  },
  {
    "msgtype": "z",
    "name": "Derivative Security List Request",
    "requiredFields": [
      "SecurityReqID",
      "SecurityListRequestType"
    ],
    "allFields": [
      "SecurityReqID",
      "SecurityListRequestType",
      "UnderlyingSymbol",
      "UnderlyingSymbolSfx",
      "UnderlyingSecurityID",
      "UnderlyingSecurityIDSource",
      "UnderlyingProduct",
      "UnderlyingCFICode",
      "UnderlyingSecurityType",
      "UnderlyingSecuritySubType",
      "UnderlyingMaturityMonthYear",
      "UnderlyingMaturityDate",
      "UnderlyingPutOrCall",
      "UnderlyingCouponPaymentDate",
      "UnderlyingIssueDate",
      "UnderlyingRepoCollateralSecurityType",
      "UnderlyingRepurchaseTerm",
      "UnderlyingRepurchaseRate",
      "UnderlyingFactor",
      "UnderlyingCreditRating",
      "UnderlyingInstrRegistry",
      "UnderlyingCountryOfIssue",
      "UnderlyingStateOrProvinceOfIssue",
      "UnderlyingLocaleOfIssue",
      "UnderlyingRedemptionDate",
      "UnderlyingStrikePrice",
      "UnderlyingStrikeCurrency",
      "UnderlyingOptAttribute",
      "UnderlyingContractMultiplier",
      "UnderlyingCouponRate",
      "UnderlyingSecurityExchange",
      "UnderlyingIssuer",
      "EncodedUnderlyingIssuerLen",
      "EncodedUnderlyingIssuer",
      "UnderlyingSecurityDesc",
      "EncodedUnderlyingSecurityDescLen",
      "EncodedUnderlyingSecurityDesc",
      "UnderlyingCPProgram",
      "UnderlyingCPRegType",
      "UnderlyingCurrency",
      "UnderlyingQty",
      "UnderlyingPx",
      "UnderlyingDirtyPrice",
      "UnderlyingEndPrice",
      "UnderlyingStartValue",
      "UnderlyingCurrentValue",
      "UnderlyingEndValue",
      "SecuritySubType",
      "Currency",
      "Text",
      "EncodedTextLen",
      "EncodedText",
      "TradingSessionID",
      "TradingSessionSubID",
      "SubscriptionRequestType"
    ]
  },
  {
    "msgtype": "AA",
    "name": "Derivative Security List",
    "requiredFields": [
      "SecurityReqID",
      "SecurityResponseID",
      "SecurityRequestResult"
    ],
    "allFields": [
      "SecurityReqID",
      "SecurityResponseID",
      "SecurityRequestResult",
      "UnderlyingSymbol",
      "UnderlyingSymbolSfx",
      "UnderlyingSecurityID",
      "UnderlyingSecurityIDSource",
      "UnderlyingProduct",
      "UnderlyingCFICode",
      "UnderlyingSecurityType",
      "UnderlyingSecuritySubType",
      "UnderlyingMaturityMonthYear",
      "UnderlyingMaturityDate",
      "UnderlyingPutOrCall",
      "UnderlyingCouponPaymentDate",
      "UnderlyingIssueDate",
      "UnderlyingRepoCollateralSecurityType",
      "UnderlyingRepurchaseTerm",
      "UnderlyingRepurchaseRate",
      "UnderlyingFactor",
      "UnderlyingCreditRating",
      "UnderlyingInstrRegistry",
      "UnderlyingCountryOfIssue",
      "UnderlyingStateOrProvinceOfIssue",
      "UnderlyingLocaleOfIssue",
      "UnderlyingRedemptionDate",
      "UnderlyingStrikePrice",
      "UnderlyingStrikeCurrency",
      "UnderlyingOptAttribute",
      "UnderlyingContractMultiplier",
      "UnderlyingCouponRate",
      "UnderlyingSecurityExchange",
      "UnderlyingIssuer",
      "EncodedUnderlyingIssuerLen",
      "EncodedUnderlyingIssuer",
      "UnderlyingSecurityDesc",
      "EncodedUnderlyingSecurityDescLen",
      "EncodedUnderlyingSecurityDesc",
      "UnderlyingCPProgram",
      "UnderlyingCPRegType",
      "UnderlyingCurrency",
      "UnderlyingQty",
      "UnderlyingPx",
      "UnderlyingDirtyPrice",
      "UnderlyingEndPrice",
      "UnderlyingStartValue",
      "UnderlyingCurrentValue",
      "UnderlyingEndValue",
      "TotNoRelatedSym",
      "LastFragment"
    ]
  },
  {
    "msgtype": "AB",
    "name": "New Order Multileg",
    "requiredFields": [
      "ClOrdID",
      "Side",
      "TransactTime",
      "OrdType"
    ],
    "allFields": [
      "ClOrdID",
      "SecondaryClOrdID",
      "ClOrdLinkID",
      "TradeOriginationDate",
      "TradeDate",
      "Account",
      "AcctIDSource",
      "AccountType",
      "DayBookingInst",
      "BookingUnit",
      "PreallocMethod",
      "AllocID",
      "SettlType",
      "SettlDate",
      "CashMargin",
      "ClearingFeeIndicator",
      "HandlInst",
      "ExecInst",
      "MinQty",
      "MaxFloor",
      "ExDestination",
      "ProcessCode",
      "Side",
      "Symbol",
      "SymbolSfx",
      "SecurityID",
      "SecurityIDSource",
      "Product",
      "CFICode",
      "SecurityType",
      "SecuritySubType",
      "MaturityMonthYear",
      "MaturityDate",
      "PutOrCall",
      "CouponPaymentDate",
      "IssueDate",
      "RepoCollateralSecurityType",
      "RepurchaseTerm",
      "RepurchaseRate",
      "Factor",
      "CreditRating",
      "InstrRegistry",
      "CountryOfIssue",
      "StateOrProvinceOfIssue",
      "LocaleOfIssue",
      "RedemptionDate",
      "StrikePrice",
      "StrikeCurrency",
      "OptAttribute",
      "ContractMultiplier",
      "CouponRate",
      "SecurityExchange",
      "Issuer",
      "EncodedIssuerLen",
      "EncodedIssuer",
      "SecurityDesc",
      "EncodedSecurityDescLen",
      "EncodedSecurityDesc",
      "Pool",
      "ContractSettlMonth",
      "CPProgram",
      "CPRegType",
      "DatedDate",
      "InterestAccrualDate",
      "PrevClosePx",
      "LocateReqd",
      "TransactTime",
      "QtyType",
      "OrderQty",
      "CashOrderQty",
      "OrderPercent",
      "RoundingDirection",
      "RoundingModulus",
      "OrdType",
      "PriceType",
      "Price",
      "StopPx",
      "Currency",
      "ComplianceID",
      "SolicitedFlag",
      "IOIID",
      "QuoteID",
      "TimeInForce",
      "EffectiveTime",
      "ExpireDate",
      "ExpireTime",
      "GTBookingInst",
      "Commission",
      "CommType",
      "CommCurrency",
      "FundRenewWaiv",
      "OrderCapacity",
      "OrderRestrictions",
      "CustOrderCapacity",
      "ForexReq",
      "SettlCurrency",
      "BookingType",
      "Text",
      "EncodedTextLen",
      "EncodedText",
      "PositionEffect",
      "CoveredOrUncovered",
      "MaxShow",
      "PegOffsetValue",
      "PegMoveType",
      "PegOffsetType",
      "PegLimitType",
      "PegRoundDirection",
      "PegScope",
      "DiscretionInst",
      "DiscretionOffsetValue",
      "DiscretionMoveType",
      "DiscretionOffsetType",
      "DiscretionLimitType",
      "DiscretionRoundDirection",
      "DiscretionScope",
      "TargetStrategy",
      "TargetStrategyParameters",
      "ParticipationRate",
      "CancellationRights",
      "MoneyLaunderingStatus",
      "RegistID",
      "Designation",
      "MultiLegRptTypeReq"
    ]
  },
  {
    "msgtype": "AC",
    "name": "Multileg Order Cancel Replace",
    "requiredFields": [
      "OrigClOrdID",
      "ClOrdID",
      "Side",
      "TransactTime",
      "OrdType"
    ],
    "allFields": [
      "OrderID",
      "OrigClOrdID",
      "ClOrdID",
      "SecondaryClOrdID",
      "ClOrdLinkID",
      "OrigOrdModTime",
      "TradeOriginationDate",
      "TradeDate",
      "Account",
      "AcctIDSource",
      "AccountType",
      "DayBookingInst",
      "BookingUnit",
      "PreallocMethod",
      "AllocID",
      "SettlType",
      "SettlDate",
      "CashMargin",
      "ClearingFeeIndicator",
      "HandlInst",
      "ExecInst",
      "MinQty",
      "MaxFloor",
      "ExDestination",
      "ProcessCode",
      "Side",
      "Symbol",
      "SymbolSfx",
      "SecurityID",
      "SecurityIDSource",
      "Product",
      "CFICode",
      "SecurityType",
      "SecuritySubType",
      "MaturityMonthYear",
      "MaturityDate",
      "PutOrCall",
      "CouponPaymentDate",
      "IssueDate",
      "RepoCollateralSecurityType",
      "RepurchaseTerm",
      "RepurchaseRate",
      "Factor",
      "CreditRating",
      "InstrRegistry",
      "CountryOfIssue",
      "StateOrProvinceOfIssue",
      "LocaleOfIssue",
      "RedemptionDate",
      "StrikePrice",
      "StrikeCurrency",
      "OptAttribute",
      "ContractMultiplier",
      "CouponRate",
      "SecurityExchange",
      "Issuer",
      "EncodedIssuerLen",
      "EncodedIssuer",
      "SecurityDesc",
      "EncodedSecurityDescLen",
      "EncodedSecurityDesc",
      "Pool",
      "ContractSettlMonth",
      "CPProgram",
      "CPRegType",
      "DatedDate",
      "InterestAccrualDate",
      "PrevClosePx",
      "LocateReqd",
      "TransactTime",
      "QtyType",
      "OrderQty",
      "CashOrderQty",
      "OrderPercent",
      "RoundingDirection",
      "RoundingModulus",
      "OrdType",
      "PriceType",
      "Price",
      "StopPx",
      "Currency",
      "ComplianceID",
      "SolicitedFlag",
      "IOIID",
      "QuoteID",
      "TimeInForce",
      "EffectiveTime",
      "ExpireDate",
      "ExpireTime",
      "GTBookingInst",
      "Commission",
      "CommType",
      "CommCurrency",
      "FundRenewWaiv",
      "OrderCapacity",
      "OrderRestrictions",
      "CustOrderCapacity",
      "ForexReq",
      "SettlCurrency",
      "BookingType",
      "Text",
      "EncodedTextLen",
      "EncodedText",
      "PositionEffect",
      "CoveredOrUncovered",
      "MaxShow",
      "PegOffsetValue",
      "PegMoveType",
      "PegOffsetType",
      "PegLimitType",
      "PegRoundDirection",
      "PegScope",
      "DiscretionInst",
      "DiscretionOffsetValue",
      "DiscretionMoveType",
      "DiscretionOffsetType",
      "DiscretionLimitType",
      "DiscretionRoundDirection",
      "DiscretionScope",
      "TargetStrategy",
      "TargetStrategyParameters",
      "ParticipationRate",
      "CancellationRights",
      "MoneyLaunderingStatus",
      "RegistID",
      "Designation",
      "MultiLegRptTypeReq"
    ]
  },
  {
    "msgtype": "AD",
    "name": "Trade Capture Report Request",
    "requiredFields": [
      "TradeRequestID",
      "TradeRequestType"
    ],
    "allFields": [
      "TradeRequestID",
      "TradeRequestType",
      "SubscriptionRequestType",
      "TradeReportID",
      "SecondaryTradeReportID",
      "ExecID",
      "ExecType",
      "OrderID",
      "ClOrdID",
      "MatchStatus",
      "TrdType",
      "TrdSubType",
      "TransferReason",
      "SecondaryTrdType",
      "TradeLinkID",
      "TrdMatchID",
      "Symbol",
      "SymbolSfx",
      "SecurityID",
      "SecurityIDSource",
      "Product",
      "CFICode",
      "SecurityType",
      "SecuritySubType",
      "MaturityMonthYear",
      "MaturityDate",
      "PutOrCall",
      "CouponPaymentDate",
      "IssueDate",
      "RepoCollateralSecurityType",
      "RepurchaseTerm",
      "RepurchaseRate",
      "Factor",
      "CreditRating",
      "InstrRegistry",
      "CountryOfIssue",
      "StateOrProvinceOfIssue",
      "LocaleOfIssue",
      "RedemptionDate",
      "StrikePrice",
      "StrikeCurrency",
      "OptAttribute",
      "ContractMultiplier",
      "CouponRate",
      "SecurityExchange",
      "Issuer",
      "EncodedIssuerLen",
      "EncodedIssuer",
      "SecurityDesc",
      "EncodedSecurityDescLen",
      "EncodedSecurityDesc",
      "Pool",
      "ContractSettlMonth",
      "CPProgram",
      "CPRegType",
      "DatedDate",
      "InterestAccrualDate",
      "DeliveryForm",
      "PctAtRisk",
      "AgreementDesc",
      "AgreementID",
      "AgreementDate",
      "AgreementCurrency",
      "TerminationType",
      "StartDate",
      "EndDate",
      "DeliveryType",
      "MarginRatio",
      "ClearingBusinessDate",
      "TradingSessionID",
      "TradingSessionSubID",
      "TimeBracket",
      "Side",
      "MultiLegReportingType",
      "TradeInputSource",
      "TradeInputDevice",
      "ResponseTransportType",
      "ResponseDestination",
      "Text",
      "EncodedTextLen",
      "EncodedText"
    ]
  },
  {
    "msgtype": "AE",
    "name": "Trade Capture Report",
    "requiredFields": [
      "TradeReportID",
      "PreviouslyReported",
      "LastQty",
      "LastPx",
      "TradeDate",
      "TransactTime"
    ],
    "allFields": [
      "TradeReportID",
      "TradeReportTransType",
      "TradeReportType",
      "TradeRequestID",
      "TrdType",
      "TrdSubType",
      "SecondaryTrdType",
      "TransferReason",
      "ExecType",
      "TotNumTradeReports",
      "LastRptRequested",
      "UnsolicitedIndicator",
      "SubscriptionRequestType",
      "TradeReportRefID",
      "SecondaryTradeReportRefID",
      "SecondaryTradeReportID",
      "TradeLinkID",
      "TrdMatchID",
      "ExecID",
      "OrdStatus",
      "SecondaryExecID",
      "ExecRestatementReason",
      "PreviouslyReported",
      "PriceType",
      "Symbol",
      "SymbolSfx",
      "SecurityID",
      "SecurityIDSource",
      "Product",
      "CFICode",
      "SecurityType",
      "SecuritySubType",
      "MaturityMonthYear",
      "MaturityDate",
      "PutOrCall",
      "CouponPaymentDate",
      "IssueDate",
      "RepoCollateralSecurityType",
      "RepurchaseTerm",
      "RepurchaseRate",
      "Factor",
      "CreditRating",
      "InstrRegistry",
      "CountryOfIssue",
      "StateOrProvinceOfIssue",
      "LocaleOfIssue",
      "RedemptionDate",
      "StrikePrice",
      "StrikeCurrency",
      "OptAttribute",
      "ContractMultiplier",
      "CouponRate",
      "SecurityExchange",
      "Issuer",
      "EncodedIssuerLen",
      "EncodedIssuer",
      "SecurityDesc",
      "EncodedSecurityDescLen",
      "EncodedSecurityDesc",
      "Pool",
      "ContractSettlMonth",
      "CPProgram",
      "CPRegType",
      "DatedDate",
      "InterestAccrualDate",
      "AgreementDesc",
      "AgreementID",
      "AgreementDate",
      "AgreementCurrency",
      "TerminationType",
      "StartDate",
      "EndDate",
      "DeliveryType",
      "MarginRatio",
      "OrderQty",
      "CashOrderQty",
      "OrderPercent",
      "RoundingDirection",
      "RoundingModulus",
      "QtyType",
      "YieldType",
      "Yield",
      "YieldCalcDate",
      "YieldRedemptionDate",
      "YieldRedemptionPrice",
      "YieldRedemptionPriceType",
      "UnderlyingTradingSessionID",
      "UnderlyingTradingSessionSubID",
      "LastQty",
      "LastPx",
      "LastParPx",
      "LastSpotRate",
      "LastForwardPoints",
      "LastMkt",
      "TradeDate",
      "ClearingBusinessDate",
      "AvgPx",
      "Spread",
      "BenchmarkCurveCurrency",
      "BenchmarkCurveName",
      "BenchmarkCurvePoint",
      "BenchmarkPrice",
      "BenchmarkPriceType",
      "BenchmarkSecurityID",
      "BenchmarkSecurityIDSource",
      "AvgPxIndicator",
      "MultiLegReportingType",
      "TradeLegRefID",
      "TransactTime",
      "SettlType",
      "SettlDate",
      "MatchStatus",
      "MatchType",
      "CopyMsgIndicator",
      "PublishTrdIndicator",
      "ShortSaleReason"
    ]
  },
  {
    "msgtype": "AF",
    "name": "Order Mass Status Request",
    "requiredFields": [
      "MassStatusReqID",
      "MassStatusReqType"
    ],
    "allFields": [
      "MassStatusReqID",
      "MassStatusReqType",
      "Account",
      "AcctIDSource",
      "TradingSessionID",
      "TradingSessionSubID",
      "Symbol",
      "SymbolSfx",
      "SecurityID",
      "SecurityIDSource",
      "Product",
      "CFICode",
      "SecurityType",
      "SecuritySubType",
      "MaturityMonthYear",
      "MaturityDate",
      "PutOrCall",
      "CouponPaymentDate",
      "IssueDate",
      "RepoCollateralSecurityType",
      "RepurchaseTerm",
      "RepurchaseRate",
      "Factor",
      "CreditRating",
      "InstrRegistry",
      "CountryOfIssue",
      "StateOrProvinceOfIssue",
      "LocaleOfIssue",
      "RedemptionDate",
      "StrikePrice",
      "StrikeCurrency",
      "OptAttribute",
      "ContractMultiplier",
      "CouponRate",
      "SecurityExchange",
      "Issuer",
      "EncodedIssuerLen",
      "EncodedIssuer",
      "SecurityDesc",
      "EncodedSecurityDescLen",
      "EncodedSecurityDesc",
      "Pool",
      "ContractSettlMonth",
      "CPProgram",
      "CPRegType",
      "DatedDate",
      "InterestAccrualDate",
      "UnderlyingSymbol",
      "UnderlyingSymbolSfx",
      "UnderlyingSecurityID",
      "UnderlyingSecurityIDSource",
      "UnderlyingProduct",
      "UnderlyingCFICode",
      "UnderlyingSecurityType",
      "UnderlyingSecuritySubType",
      "UnderlyingMaturityMonthYear",
      "UnderlyingMaturityDate",
      "UnderlyingPutOrCall",
      "UnderlyingCouponPaymentDate",
      "UnderlyingIssueDate",
      "UnderlyingRepoCollateralSecurityType",
      "UnderlyingRepurchaseTerm",
      "UnderlyingRepurchaseRate",
      "UnderlyingFactor",
      "UnderlyingCreditRating",
      "UnderlyingInstrRegistry",
      "UnderlyingCountryOfIssue",
      "UnderlyingStateOrProvinceOfIssue",
      "UnderlyingLocaleOfIssue",
      "UnderlyingRedemptionDate",
      "UnderlyingStrikePrice",
      "UnderlyingStrikeCurrency",
      "UnderlyingOptAttribute",
      "UnderlyingContractMultiplier",
      "UnderlyingCouponRate",
      "UnderlyingSecurityExchange",
      "UnderlyingIssuer",
      "EncodedUnderlyingIssuerLen",
      "EncodedUnderlyingIssuer",
      "UnderlyingSecurityDesc",
      "EncodedUnderlyingSecurityDescLen",
      "EncodedUnderlyingSecurityDesc",
      "UnderlyingCPProgram",
      "UnderlyingCPRegType",
      "UnderlyingCurrency",
      "UnderlyingQty",
      "UnderlyingPx",
      "UnderlyingDirtyPrice",
      "UnderlyingEndPrice",
      "UnderlyingStartValue",
      "UnderlyingCurrentValue",
      "UnderlyingEndValue",
      "Side"
    ]
  },
  {
    "msgtype": "AG",
    "name": "Quote Request Reject",
    "requiredFields": [
      "QuoteReqID",
      "QuoteRequestRejectReason"
    ],
    "allFields": [
      "QuoteReqID",
      "RFQReqID",
      "QuoteRequestRejectReason",
      "Text",
      "EncodedTextLen",
      "EncodedText"
    ]
  },
  {
    "msgtype": "AH",
    "name": "RFQRequest",
    "requiredFields": [
      "RFQReqID"
    ],
    "allFields": [
      "RFQReqID",
      "SubscriptionRequestType"
    ]
  },
  {
    "msgtype": "AI",
    "name": "Quote Status Report",
    "requiredFields": [
      "QuoteID"
    ],
    "allFields": [
      "QuoteStatusReqID",
      "QuoteReqID",
      "QuoteID",
      "QuoteRespID",
      "QuoteType",
      "TradingSessionID",
      "TradingSessionSubID",
      "Symbol",
      "SymbolSfx",
      "SecurityID",
      "SecurityIDSource",
      "Product",
      "CFICode",
      "SecurityType",
      "SecuritySubType",
      "MaturityMonthYear",
      "MaturityDate",
      "PutOrCall",
      "CouponPaymentDate",
      "IssueDate",
      "RepoCollateralSecurityType",
      "RepurchaseTerm",
      "RepurchaseRate",
      "Factor",
      "CreditRating",
      "InstrRegistry",
      "CountryOfIssue",
      "StateOrProvinceOfIssue",
      "LocaleOfIssue",
      "RedemptionDate",
      "StrikePrice",
      "StrikeCurrency",
      "OptAttribute",
      "ContractMultiplier",
      "CouponRate",
      "SecurityExchange",
      "Issuer",
      "EncodedIssuerLen",
      "EncodedIssuer",
      "SecurityDesc",
      "EncodedSecurityDescLen",
      "EncodedSecurityDesc",
      "Pool",
      "ContractSettlMonth",
      "CPProgram",
      "CPRegType",
      "DatedDate",
      "InterestAccrualDate",
      "AgreementDesc",
      "AgreementID",
      "AgreementDate",
      "AgreementCurrency",
      "TerminationType",
      "StartDate",
      "EndDate",
      "DeliveryType",
      "MarginRatio",
      "Side",
      "OrderQty",
      "CashOrderQty",
      "OrderPercent",
      "RoundingDirection",
      "RoundingModulus",
      "SettlType",
      "SettlDate",
      "SettlDate2",
      "OrderQty2",
      "Currency",
      "Account",
      "AcctIDSource",
      "AccountType",
      "ExpireTime",
      "Price",
      "PriceType",
      "Spread",
      "BenchmarkCurveCurrency",
      "BenchmarkCurveName",
      "BenchmarkCurvePoint",
      "BenchmarkPrice",
      "BenchmarkPriceType",
      "BenchmarkSecurityID",
      "BenchmarkSecurityIDSource",
      "YieldType",
      "Yield",
      "YieldCalcDate",
      "YieldRedemptionDate",
      "YieldRedemptionPrice",
      "YieldRedemptionPriceType",
      "BidPx",
      "OfferPx",
      "MktBidPx",
      "MktOfferPx",
      "MinBidSize",
      "BidSize",
      "MinOfferSize",
      "OfferSize",
      "ValidUntilTime",
      "BidSpotRate",
      "OfferSpotRate",
      "BidForwardPoints",
      "OfferForwardPoints",
      "MidPx",
      "BidYield",
      "MidYield",
      "OfferYield",
      "TransactTime",
      "OrdType",
      "BidForwardPoints2",
      "OfferForwardPoints2",
      "SettlCurrBidFxRate",
      "SettlCurrOfferFxRate",
      "SettlCurrFxRateCalc",
      "CommType",
      "Commission",
      "CustOrderCapacity",
      "ExDestination",
      "QuoteStatus",
      "Text",
      "EncodedTextLen",
      "EncodedText"
    ]
  },
  {
    "msgtype": "AJ",
    "name": "Quote Response",
    "requiredFields": [
      "QuoteRespID",
      "QuoteRespType"
    ],
    "allFields": [
      "QuoteRespID",
      "QuoteID",
      "QuoteRespType",
      "ClOrdID",
      "OrderCapacity",
      "IOIID",
      "QuoteType",
      "TradingSessionID",
      "TradingSessionSubID",
      "Symbol",
      "SymbolSfx",
      "SecurityID",
      "SecurityIDSource",
      "Product",
      "CFICode",
      "SecurityType",
      "SecuritySubType",
      "MaturityMonthYear",
      "MaturityDate",
      "PutOrCall",
      "CouponPaymentDate",
      "IssueDate",
      "RepoCollateralSecurityType",
      "RepurchaseTerm",
      "RepurchaseRate",
      "Factor",
      "CreditRating",
      "InstrRegistry",
      "CountryOfIssue",
      "StateOrProvinceOfIssue",
      "LocaleOfIssue",
      "RedemptionDate",
      "StrikePrice",
      "StrikeCurrency",
      "OptAttribute",
      "ContractMultiplier",
      "CouponRate",
      "SecurityExchange",
      "Issuer",
      "EncodedIssuerLen",
      "EncodedIssuer",
      "SecurityDesc",
      "EncodedSecurityDescLen",
      "EncodedSecurityDesc",
      "Pool",
      "ContractSettlMonth",
      "CPProgram",
      "CPRegType",
      "DatedDate",
      "InterestAccrualDate",
      "AgreementDesc",
      "AgreementID",
      "AgreementDate",
      "AgreementCurrency",
      "TerminationType",
      "StartDate",
      "EndDate",
      "DeliveryType",
      "MarginRatio",
      "Side",
      "OrderQty",
      "CashOrderQty",
      "OrderPercent",
      "RoundingDirection",
      "RoundingModulus",
      "SettlType",
      "SettlDate",
      "SettlDate2",
      "OrderQty2",
      "Currency",
      "Account",
      "AcctIDSource",
      "AccountType",
      "BidPx",
      "OfferPx",
      "MktBidPx",
      "MktOfferPx",
      "MinBidSize",
      "BidSize",
      "MinOfferSize",
      "OfferSize",
      "ValidUntilTime",
      "BidSpotRate",
      "OfferSpotRate",
      "BidForwardPoints",
      "OfferForwardPoints",
      "MidPx",
      "BidYield",
      "MidYield",
      "OfferYield",
      "TransactTime",
      "OrdType",
      "BidForwardPoints2",
      "OfferForwardPoints2",
      "SettlCurrBidFxRate",
      "SettlCurrOfferFxRate",
      "SettlCurrFxRateCalc",
      "Commission",
      "CommType",
      "CustOrderCapacity",
      "ExDestination",
      "Text",
      "EncodedTextLen",
      "EncodedText",
      "Price",
      "PriceType",
      "Spread",
      "BenchmarkCurveCurrency",
      "BenchmarkCurveName",
      "BenchmarkCurvePoint",
      "BenchmarkPrice",
      "BenchmarkPriceType",
      "BenchmarkSecurityID",
      "BenchmarkSecurityIDSource",
      "YieldType",
      "Yield",
      "YieldCalcDate",
      "YieldRedemptionDate",
      "YieldRedemptionPrice",
      "YieldRedemptionPriceType"
    ]
  },
  {
    "msgtype": "AK",
    "name": "Confirmation",
    "requiredFields": [
      "ConfirmID",
      "ConfirmTransType",
      "ConfirmType",
      "ConfirmStatus",
      "TransactTime",
      "TradeDate",
      "AllocQty",
      "Side",
      "AllocAccount",
      "AvgPx",
      "GrossTradeAmt",
      "NetMoney"
    ],
    "allFields": [
      "ConfirmID",
      "ConfirmRefID",
      "ConfirmReqID",
      "ConfirmTransType",
      "ConfirmType",
      "CopyMsgIndicator",
      "LegalConfirm",
      "ConfirmStatus",
      "AllocID",
      "SecondaryAllocID",
      "IndividualAllocID",
      "TransactTime",
      "TradeDate",
      "Symbol",
      "SymbolSfx",
      "SecurityID",
      "SecurityIDSource",
      "Product",
      "CFICode",
      "SecurityType",
      "SecuritySubType",
      "MaturityMonthYear",
      "MaturityDate",
      "PutOrCall",
      "CouponPaymentDate",
      "IssueDate",
      "RepoCollateralSecurityType",
      "RepurchaseTerm",
      "RepurchaseRate",
      "Factor",
      "CreditRating",
      "InstrRegistry",
      "CountryOfIssue",
      "StateOrProvinceOfIssue",
      "LocaleOfIssue",
      "RedemptionDate",
      "StrikePrice",
      "StrikeCurrency",
      "OptAttribute",
      "ContractMultiplier",
      "CouponRate",
      "SecurityExchange",
      "Issuer",
      "EncodedIssuerLen",
      "EncodedIssuer",
      "SecurityDesc",
      "EncodedSecurityDescLen",
      "EncodedSecurityDesc",
      "Pool",
      "ContractSettlMonth",
      "CPProgram",
      "CPRegType",
      "DatedDate",
      "InterestAccrualDate",
      "DeliveryForm",
      "PctAtRisk",
      "AgreementDesc",
      "AgreementID",
      "AgreementDate",
      "AgreementCurrency",
      "TerminationType",
      "StartDate",
      "EndDate",
      "DeliveryType",
      "MarginRatio",
      "YieldType",
      "Yield",
      "YieldCalcDate",
      "YieldRedemptionDate",
      "YieldRedemptionPrice",
      "YieldRedemptionPriceType",
      "AllocQty",
      "QtyType",
      "Side",
      "Currency",
      "LastMkt",
      "AllocAccount",
      "AllocAcctIDSource",
      "AllocAccountType",
      "AvgPx",
      "AvgPxPrecision",
      "PriceType",
      "AvgParPx",
      "Spread",
      "BenchmarkCurveCurrency",
      "BenchmarkCurveName",
      "BenchmarkCurvePoint",
      "BenchmarkPrice",
      "BenchmarkPriceType",
      "BenchmarkSecurityID",
      "BenchmarkSecurityIDSource",
      "ReportedPx",
      "Text",
      "EncodedTextLen",
      "EncodedText",
      "ProcessCode",
      "GrossTradeAmt",
      "NumDaysInterest",
      "ExDate",
      "AccruedInterestRate",
      "AccruedInterestAmt",
      "InterestAtMaturity",
      "EndAccruedInterestAmt",
      "StartCash",
      "EndCash",
      "Concession",
      "TotalTakedown",
      "NetMoney",
      "MaturityNetMoney",
      "SettlCurrAmt",
      "SettlCurrency",
      "SettlCurrFxRate",
      "SettlCurrFxRateCalc",
      "SettlType",
      "SettlDate",
      "SettlDeliveryType",
      "StandInstDbType",
      "StandInstDbName",
      "StandInstDbID",
      "Commission",
      "CommType",
      "CommCurrency",
      "FundRenewWaiv",
      "SharedCommission"
    ]
  },
  {
    "msgtype": "AL",
    "name": "Position Maintenance Request",
    "requiredFields": [
      "PosReqID",
      "PosTransType",
      "PosMaintAction",
      "ClearingBusinessDate",
      "Account",
      "AccountType",
      "TransactTime"
    ],
    "allFields": [
      "PosReqID",
      "PosTransType",
      "PosMaintAction",
      "OrigPosReqRefID",
      "PosMaintRptRefID",
      "ClearingBusinessDate",
      "SettlSessID",
      "SettlSessSubID",
      "Account",
      "AcctIDSource",
      "AccountType",
      "Symbol",
      "SymbolSfx",
      "SecurityID",
      "SecurityIDSource",
      "Product",
      "CFICode",
      "SecurityType",
      "SecuritySubType",
      "MaturityMonthYear",
      "MaturityDate",
      "PutOrCall",
      "CouponPaymentDate",
      "IssueDate",
      "RepoCollateralSecurityType",
      "RepurchaseTerm",
      "RepurchaseRate",
      "Factor",
      "CreditRating",
      "InstrRegistry",
      "CountryOfIssue",
      "StateOrProvinceOfIssue",
      "LocaleOfIssue",
      "RedemptionDate",
      "StrikePrice",
      "StrikeCurrency",
      "OptAttribute",
      "ContractMultiplier",
      "CouponRate",
      "SecurityExchange",
      "Issuer",
      "EncodedIssuerLen",
      "EncodedIssuer",
      "SecurityDesc",
      "EncodedSecurityDescLen",
      "EncodedSecurityDesc",
      "Pool",
      "ContractSettlMonth",
      "CPProgram",
      "CPRegType",
      "DatedDate",
      "InterestAccrualDate",
      "Currency",
      "TransactTime",
      "AdjustmentType",
      "ContraryInstructionIndicator",
      "PriorSpreadIndicator",
      "ThresholdAmount",
      "Text",
      "EncodedTextLen",
      "EncodedText"
    ]
  },
  {
    "msgtype": "AM",
    "name": "Position Maintenance Report",
    "requiredFields": [
      "PosMaintRptID",
      "PosTransType",
      "PosMaintAction",
      "OrigPosReqRefID",
      "PosMaintStatus",
      "ClearingBusinessDate",
      "Account",
      "AccountType",
      "TransactTime"
    ],
    "allFields": [
      "PosMaintRptID",
      "PosTransType",
      "PosReqID",
      "PosMaintAction",
      "OrigPosReqRefID",
      "PosMaintStatus",
      "PosMaintResult",
      "ClearingBusinessDate",
      "SettlSessID",
      "SettlSessSubID",
      "Account",
      "AcctIDSource",
      "AccountType",
      "Symbol",
      "SymbolSfx",
      "SecurityID",
      "SecurityIDSource",
      "Product",
      "CFICode",
      "SecurityType",
      "SecuritySubType",
      "MaturityMonthYear",
      "MaturityDate",
      "PutOrCall",
      "CouponPaymentDate",
      "IssueDate",
      "RepoCollateralSecurityType",
      "RepurchaseTerm",
      "RepurchaseRate",
      "Factor",
      "CreditRating",
      "InstrRegistry",
      "CountryOfIssue",
      "StateOrProvinceOfIssue",
      "LocaleOfIssue",
      "RedemptionDate",
      "StrikePrice",
      "StrikeCurrency",
      "OptAttribute",
      "ContractMultiplier",
      "CouponRate",
      "SecurityExchange",
      "Issuer",
      "EncodedIssuerLen",
      "EncodedIssuer",
      "SecurityDesc",
      "EncodedSecurityDescLen",
      "EncodedSecurityDesc",
      "Pool",
      "ContractSettlMonth",
      "CPProgram",
      "CPRegType",
      "DatedDate",
      "InterestAccrualDate",
      "Currency",
      "TransactTime",
      "AdjustmentType",
      "ThresholdAmount",
      "Text",
      "EncodedTextLen",
      "EncodedText"
    ]
  },
  {
    "msgtype": "AN",
    "name": "Request For Positions",
    "requiredFields": [
      "PosReqID",
      "PosReqType",
      "Account",
      "AccountType",
      "ClearingBusinessDate",
      "TransactTime"
    ],
    "allFields": [
      "PosReqID",
      "PosReqType",
      "MatchStatus",
      "SubscriptionRequestType",
      "Account",
      "AcctIDSource",
      "AccountType",
      "Symbol",
      "SymbolSfx",
      "SecurityID",
      "SecurityIDSource",
      "Product",
      "CFICode",
      "SecurityType",
      "SecuritySubType",
      "MaturityMonthYear",
      "MaturityDate",
      "PutOrCall",
      "CouponPaymentDate",
      "IssueDate",
      "RepoCollateralSecurityType",
      "RepurchaseTerm",
      "RepurchaseRate",
      "Factor",
      "CreditRating",
      "InstrRegistry",
      "CountryOfIssue",
      "StateOrProvinceOfIssue",
      "LocaleOfIssue",
      "RedemptionDate",
      "StrikePrice",
      "StrikeCurrency",
      "OptAttribute",
      "ContractMultiplier",
      "CouponRate",
      "SecurityExchange",
      "Issuer",
      "EncodedIssuerLen",
      "EncodedIssuer",
      "SecurityDesc",
      "EncodedSecurityDescLen",
      "EncodedSecurityDesc",
      "Pool",
      "ContractSettlMonth",
      "CPProgram",
      "CPRegType",
      "DatedDate",
      "InterestAccrualDate",
      "Currency",
      "ClearingBusinessDate",
      "SettlSessID",
      "SettlSessSubID",
      "TransactTime",
      "ResponseTransportType",
      "ResponseDestination",
      "Text",
      "EncodedTextLen",
      "EncodedText"
    ]
  },
  {
    "msgtype": "AO",
    "name": "Request For Positions Ack",
    "requiredFields": [
      "PosMaintRptID",
      "PosReqResult",
      "PosReqStatus",
      "Account",
      "AccountType"
    ],
    "allFields": [
      "PosMaintRptID",
      "PosReqID",
      "TotalNumPosReports",
      "UnsolicitedIndicator",
      "PosReqResult",
      "PosReqStatus",
      "Account",
      "AcctIDSource",
      "AccountType",
      "Symbol",
      "SymbolSfx",
      "SecurityID",
      "SecurityIDSource",
      "Product",
      "CFICode",
      "SecurityType",
      "SecuritySubType",
      "MaturityMonthYear",
      "MaturityDate",
      "PutOrCall",
      "CouponPaymentDate",
      "IssueDate",
      "RepoCollateralSecurityType",
      "RepurchaseTerm",
      "RepurchaseRate",
      "Factor",
      "CreditRating",
      "InstrRegistry",
      "CountryOfIssue",
      "StateOrProvinceOfIssue",
      "LocaleOfIssue",
      "RedemptionDate",
      "StrikePrice",
      "StrikeCurrency",
      "OptAttribute",
      "ContractMultiplier",
      "CouponRate",
      "SecurityExchange",
      "Issuer",
      "EncodedIssuerLen",
      "EncodedIssuer",
      "SecurityDesc",
      "EncodedSecurityDescLen",
      "EncodedSecurityDesc",
      "Pool",
      "ContractSettlMonth",
      "CPProgram",
      "CPRegType",
      "DatedDate",
      "InterestAccrualDate",
      "Currency",
      "ResponseTransportType",
      "ResponseDestination",
      "Text",
      "EncodedTextLen",
      "EncodedText"
    ]
  },
  {
    "msgtype": "AP",
    "name": "Position Report",
    "requiredFields": [
      "PosMaintRptID",
      "PosReqResult",
      "ClearingBusinessDate",
      "Account",
      "AccountType",
      "SettlPrice",
      "SettlPriceType",
      "PriorSettlPrice"
    ],
    "allFields": [
      "PosMaintRptID",
      "PosReqID",
      "PosReqType",
      "SubscriptionRequestType",
      "TotalNumPosReports",
      "UnsolicitedIndicator",
      "PosReqResult",
      "ClearingBusinessDate",
      "SettlSessID",
      "SettlSessSubID",
      "Account",
      "AcctIDSource",
      "AccountType",
      "Symbol",
      "SymbolSfx",
      "SecurityID",
      "SecurityIDSource",
      "Product",
      "CFICode",
      "SecurityType",
      "SecuritySubType",
      "MaturityMonthYear",
      "MaturityDate",
      "PutOrCall",
      "CouponPaymentDate",
      "IssueDate",
      "RepoCollateralSecurityType",
      "RepurchaseTerm",
      "RepurchaseRate",
      "Factor",
      "CreditRating",
      "InstrRegistry",
      "CountryOfIssue",
      "StateOrProvinceOfIssue",
      "LocaleOfIssue",
      "RedemptionDate",
      "StrikePrice",
      "StrikeCurrency",
      "OptAttribute",
      "ContractMultiplier",
      "CouponRate",
      "SecurityExchange",
      "Issuer",
      "EncodedIssuerLen",
      "EncodedIssuer",
      "SecurityDesc",
      "EncodedSecurityDescLen",
      "EncodedSecurityDesc",
      "Pool",
      "ContractSettlMonth",
      "CPProgram",
      "CPRegType",
      "DatedDate",
      "InterestAccrualDate",
      "Currency",
      "SettlPrice",
      "SettlPriceType",
      "PriorSettlPrice",
      "RegistStatus",
      "DeliveryDate",
      "Text",
      "EncodedTextLen",
      "EncodedText"
    ]
  },
  {
    "msgtype": "AQ",
    "name": "Trade Capture Report Request Ack",
    "requiredFields": [
      "TradeRequestID",
      "TradeRequestType",
      "TradeRequestResult",
      "TradeRequestStatus"
    ],
    "allFields": [
      "TradeRequestID",
      "TradeRequestType",
      "SubscriptionRequestType",
      "TotNumTradeReports",
      "TradeRequestResult",
      "TradeRequestStatus",
      "Symbol",
      "SymbolSfx",
      "SecurityID",
      "SecurityIDSource",
      "Product",
      "CFICode",
      "SecurityType",
      "SecuritySubType",
      "MaturityMonthYear",
      "MaturityDate",
      "PutOrCall",
      "CouponPaymentDate",
      "IssueDate",
      "RepoCollateralSecurityType",
      "RepurchaseTerm",
      "RepurchaseRate",
      "Factor",
      "CreditRating",
      "InstrRegistry",
      "CountryOfIssue",
      "StateOrProvinceOfIssue",
      "LocaleOfIssue",
      "RedemptionDate",
      "StrikePrice",
      "StrikeCurrency",
      "OptAttribute",
      "ContractMultiplier",
      "CouponRate",
      "SecurityExchange",
      "Issuer",
      "EncodedIssuerLen",
      "EncodedIssuer",
      "SecurityDesc",
      "EncodedSecurityDescLen",
      "EncodedSecurityDesc",
      "Pool",
      "ContractSettlMonth",
      "CPProgram",
      "CPRegType",
      "DatedDate",
      "InterestAccrualDate",
      "MultiLegReportingType",
      "ResponseTransportType",
      "ResponseDestination",
      "Text",
      "EncodedTextLen",
      "EncodedText"
    ]
  },
  {
    "msgtype": "AR",
    "name": "Trade Capture Report Ack",
    "requiredFields": [
      "TradeReportID",
      "ExecType"
    ],
    "allFields": [
      "TradeReportID",
      "TradeReportTransType",
      "TradeReportType",
      "TrdType",
      "TrdSubType",
      "SecondaryTrdType",
      "TransferReason",
      "ExecType",
      "TradeReportRefID",
      "SecondaryTradeReportRefID",
      "TrdRptStatus",
      "TradeReportRejectReason",
      "SecondaryTradeReportID",
      "SubscriptionRequestType",
      "TradeLinkID",
      "TrdMatchID",
      "ExecID",
      "SecondaryExecID",
      "Symbol",
      "SymbolSfx",
      "SecurityID",
      "SecurityIDSource",
      "Product",
      "CFICode",
      "SecurityType",
      "SecuritySubType",
      "MaturityMonthYear",
      "MaturityDate",
      "PutOrCall",
      "CouponPaymentDate",
      "IssueDate",
      "RepoCollateralSecurityType",
      "RepurchaseTerm",
      "RepurchaseRate",
      "Factor",
      "CreditRating",
      "InstrRegistry",
      "CountryOfIssue",
      "StateOrProvinceOfIssue",
      "LocaleOfIssue",
      "RedemptionDate",
      "StrikePrice",
      "StrikeCurrency",
      "OptAttribute",
      "ContractMultiplier",
      "CouponRate",
      "SecurityExchange",
      "Issuer",
      "EncodedIssuerLen",
      "EncodedIssuer",
      "SecurityDesc",
      "EncodedSecurityDescLen",
      "EncodedSecurityDesc",
      "Pool",
      "ContractSettlMonth",
      "CPProgram",
      "CPRegType",
      "DatedDate",
      "InterestAccrualDate",
      "TransactTime",
      "ResponseTransportType",
      "ResponseDestination",
      "Text",
      "EncodedTextLen",
      "EncodedText",
      "ClearingFeeIndicator",
      "OrderCapacity",
      "OrderRestrictions",
      "CustOrderCapacity",
      "Account",
      "AcctIDSource",
      "AccountType",
      "PositionEffect",
      "PreallocMethod"
    ]
  },
  {
    "msgtype": "AS",
    "name": "Allocation Report",
    "requiredFields": [
      "AllocReportID",
      "AllocTransType",
      "AllocReportType",
      "AllocStatus",
      "AllocNoOrdersType",
      "Side",
      "Quantity",
      "AvgPx",
      "TradeDate"
    ],
    "allFields": [
      "AllocReportID",
      "AllocID",
      "AllocTransType",
      "AllocReportRefID",
      "AllocCancReplaceReason",
      "SecondaryAllocID",
      "AllocReportType",
      "AllocStatus",
      "AllocRejCode",
      "RefAllocID",
      "AllocIntermedReqType",
      "AllocLinkID",
      "AllocLinkType",
      "BookingRefID",
      "AllocNoOrdersType",
      "PreviouslyReported",
      "ReversalIndicator",
      "MatchType",
      "Side",
      "Symbol",
      "SymbolSfx",
      "SecurityID",
      "SecurityIDSource",
      "Product",
      "CFICode",
      "SecurityType",
      "SecuritySubType",
      "MaturityMonthYear",
      "MaturityDate",
      "PutOrCall",
      "CouponPaymentDate",
      "IssueDate",
      "RepoCollateralSecurityType",
      "RepurchaseTerm",
      "RepurchaseRate",
      "Factor",
      "CreditRating",
      "InstrRegistry",
      "CountryOfIssue",
      "StateOrProvinceOfIssue",
      "LocaleOfIssue",
      "RedemptionDate",
      "StrikePrice",
      "StrikeCurrency",
      "OptAttribute",
      "ContractMultiplier",
      "CouponRate",
      "SecurityExchange",
      "Issuer",
      "EncodedIssuerLen",
      "EncodedIssuer",
      "SecurityDesc",
      "EncodedSecurityDescLen",
      "EncodedSecurityDesc",
      "Pool",
      "ContractSettlMonth",
      "CPProgram",
      "CPRegType",
      "DatedDate",
      "InterestAccrualDate",
      "DeliveryForm",
      "PctAtRisk",
      "AgreementDesc",
      "AgreementID",
      "AgreementDate",
      "AgreementCurrency",
      "TerminationType",
      "StartDate",
      "EndDate",
      "DeliveryType",
      "MarginRatio",
      "Quantity",
      "QtyType",
      "LastMkt",
      "TradeOriginationDate",
      "TradingSessionID",
      "TradingSessionSubID",
      "PriceType",
      "AvgPx",
      "AvgParPx",
      "Spread",
      "BenchmarkCurveCurrency",
      "BenchmarkCurveName",
      "BenchmarkCurvePoint",
      "BenchmarkPrice",
      "BenchmarkPriceType",
      "BenchmarkSecurityID",
      "BenchmarkSecurityIDSource",
      "Currency",
      "AvgPxPrecision",
      "TradeDate",
      "TransactTime",
      "SettlType",
      "SettlDate",
      "BookingType",
      "GrossTradeAmt",
      "Concession",
      "TotalTakedown",
      "NetMoney",
      "PositionEffect",
      "AutoAcceptIndicator",
      "Text",
      "EncodedTextLen",
      "EncodedText",
      "NumDaysInterest",
      "AccruedInterestRate",
      "AccruedInterestAmt",
      "TotalAccruedInterestAmt",
      "InterestAtMaturity",
      "EndAccruedInterestAmt",
      "StartCash",
      "EndCash",
      "LegalConfirm",
      "YieldType",
      "Yield",
      "YieldCalcDate",
      "YieldRedemptionDate",
      "YieldRedemptionPrice",
      "YieldRedemptionPriceType",
      "TotNoAllocs",
      "LastFragment"
    ]
  },
  {
    "msgtype": "AT",
    "name": "Allocation Report Ack",
    "requiredFields": [
      "AllocReportID",
      "AllocID",
      "TransactTime",
      "AllocStatus"
    ],
    "allFields": [
      "AllocReportID",
      "AllocID",
      "SecondaryAllocID",
      "TradeDate",
      "TransactTime",
      "AllocStatus",
      "AllocRejCode",
      "AllocReportType",
      "AllocIntermedReqType",
      "MatchStatus",
      "Product",
      "SecurityType",
      "Text",
      "EncodedTextLen",
      "EncodedText"
    ]
  },
  {
    "msgtype": "AU",
    "name": "Confirmation Ack",
    "requiredFields": [
      "ConfirmID",
      "TradeDate",
      "TransactTime",
      "AffirmStatus"
    ],
    "allFields": [
      "ConfirmID",
      "TradeDate",
      "TransactTime",
      "AffirmStatus",
      "ConfirmRejReason",
      "MatchStatus",
      "Text",
      "EncodedTextLen",
      "EncodedText"
    ]
  },
  {
    "msgtype": "AV",
    "name": "Settlement Instruction Request",
    "requiredFields": [
      "SettlInstReqID",
      "TransactTime"
    ],
    "allFields": [
      "SettlInstReqID",
      "TransactTime",
      "AllocAccount",
      "AllocAcctIDSource",
      "Side",
      "Product",
      "SecurityType",
      "CFICode",
      "EffectiveTime",
      "ExpireTime",
      "LastUpdateTime",
      "StandInstDbType",
      "StandInstDbName",
      "StandInstDbID"
    ]
  },
  {
    "msgtype": "AW",
    "name": "Assignment Report",
    "requiredFields": [
      "AsgnRptID",
      "AccountType",
      "SettlPrice",
      "SettlPriceType",
      "UnderlyingSettlPrice",
      "AssignmentMethod",
      "OpenInterest",
      "ExerciseMethod",
      "SettlSessID",
      "SettlSessSubID",
      "ClearingBusinessDate"
    ],
    "allFields": [
      "AsgnRptID",
      "TotNumAssignmentReports",
      "LastRptRequested",
      "Account",
      "AccountType",
      "Symbol",
      "SymbolSfx",
      "SecurityID",
      "SecurityIDSource",
      "Product",
      "CFICode",
      "SecurityType",
      "SecuritySubType",
      "MaturityMonthYear",
      "MaturityDate",
      "PutOrCall",
      "CouponPaymentDate",
      "IssueDate",
      "RepoCollateralSecurityType",
      "RepurchaseTerm",
      "RepurchaseRate",
      "Factor",
      "CreditRating",
      "InstrRegistry",
      "CountryOfIssue",
      "StateOrProvinceOfIssue",
      "LocaleOfIssue",
      "RedemptionDate",
      "StrikePrice",
      "StrikeCurrency",
      "OptAttribute",
      "ContractMultiplier",
      "CouponRate",
      "SecurityExchange",
      "Issuer",
      "EncodedIssuerLen",
      "EncodedIssuer",
      "SecurityDesc",
      "EncodedSecurityDescLen",
      "EncodedSecurityDesc",
      "Pool",
      "ContractSettlMonth",
      "CPProgram",
      "CPRegType",
      "DatedDate",
      "InterestAccrualDate",
      "Currency",
      "ThresholdAmount",
      "SettlPrice",
      "SettlPriceType",
      "UnderlyingSettlPrice",
      "ExpireDate",
      "AssignmentMethod",
      "AssignmentUnit",
      "OpenInterest",
      "ExerciseMethod",
      "SettlSessID",
      "SettlSessSubID",
      "ClearingBusinessDate",
      "Text",
      "EncodedTextLen",
      "EncodedText"
    ]
  },
  {
    "msgtype": "AX",
    "name": "Collateral Request",
    "requiredFields": [
      "CollReqID",
      "CollAsgnReason",
      "TransactTime"
    ],
    "allFields": [
      "CollReqID",
      "CollAsgnReason",
      "TransactTime",
      "ExpireTime",
      "Account",
      "AccountType",
      "ClOrdID",
      "OrderID",
      "SecondaryOrderID",
      "SecondaryClOrdID",
      "Symbol",
      "SymbolSfx",
      "SecurityID",
      "SecurityIDSource",
      "Product",
      "CFICode",
      "SecurityType",
      "SecuritySubType",
      "MaturityMonthYear",
      "MaturityDate",
      "PutOrCall",
      "CouponPaymentDate",
      "IssueDate",
      "RepoCollateralSecurityType",
      "RepurchaseTerm",
      "RepurchaseRate",
      "Factor",
      "CreditRating",
      "InstrRegistry",
      "CountryOfIssue",
      "StateOrProvinceOfIssue",
      "LocaleOfIssue",
      "RedemptionDate",
      "StrikePrice",
      "StrikeCurrency",
      "OptAttribute",
      "ContractMultiplier",
      "CouponRate",
      "SecurityExchange",
      "Issuer",
      "EncodedIssuerLen",
      "EncodedIssuer",
      "SecurityDesc",
      "EncodedSecurityDescLen",
      "EncodedSecurityDesc",
      "Pool",
      "ContractSettlMonth",
      "CPProgram",
      "CPRegType",
      "DatedDate",
      "InterestAccrualDate",
      "AgreementDesc",
      "AgreementID",
      "AgreementDate",
      "AgreementCurrency",
      "TerminationType",
      "StartDate",
      "EndDate",
      "DeliveryType",
      "MarginRatio",
      "SettlDate",
      "Quantity",
      "QtyType",
      "Currency",
      "MarginExcess",
      "TotalNetValue",
      "CashOutstanding",
      "Side",
      "Price",
      "PriceType",
      "AccruedInterestAmt",
      "EndAccruedInterestAmt",
      "StartCash",
      "EndCash",
      "Spread",
      "BenchmarkCurveCurrency",
      "BenchmarkCurveName",
      "BenchmarkCurvePoint",
      "BenchmarkPrice",
      "BenchmarkPriceType",
      "BenchmarkSecurityID",
      "BenchmarkSecurityIDSource",
      "TradingSessionID",
      "TradingSessionSubID",
      "SettlSessID",
      "SettlSessSubID",
      "ClearingBusinessDate",
      "Text",
      "EncodedTextLen",
      "EncodedText"
    ]
  },
  {
    "msgtype": "AY",
    "name": "Collateral Assignment",
    "requiredFields": [
      "CollAsgnID",
      "CollAsgnReason",
      "CollAsgnTransType",
      "TransactTime"
    ],
    "allFields": [
      "CollAsgnID",
      "CollReqID",
      "CollAsgnReason",
      "CollAsgnTransType",
      "CollAsgnRefID",
      "TransactTime",
      "ExpireTime",
      "Account",
      "AccountType",
      "ClOrdID",
      "OrderID",
      "SecondaryOrderID",
      "SecondaryClOrdID",
      "Symbol",
      "SymbolSfx",
      "SecurityID",
      "SecurityIDSource",
      "Product",
      "CFICode",
      "SecurityType",
      "SecuritySubType",
      "MaturityMonthYear",
      "MaturityDate",
      "PutOrCall",
      "CouponPaymentDate",
      "IssueDate",
      "RepoCollateralSecurityType",
      "RepurchaseTerm",
      "RepurchaseRate",
      "Factor",
      "CreditRating",
      "InstrRegistry",
      "CountryOfIssue",
      "StateOrProvinceOfIssue",
      "LocaleOfIssue",
      "RedemptionDate",
      "StrikePrice",
      "StrikeCurrency",
      "OptAttribute",
      "ContractMultiplier",
      "CouponRate",
      "SecurityExchange",
      "Issuer",
      "EncodedIssuerLen",
      "EncodedIssuer",
      "SecurityDesc",
      "EncodedSecurityDescLen",
      "EncodedSecurityDesc",
      "Pool",
      "ContractSettlMonth",
      "CPProgram",
      "CPRegType",
      "DatedDate",
      "InterestAccrualDate",
      "AgreementDesc",
      "AgreementID",
      "AgreementDate",
      "AgreementCurrency",
      "TerminationType",
      "StartDate",
      "EndDate",
      "DeliveryType",
      "MarginRatio",
      "SettlDate",
      "Quantity",
      "QtyType",
      "Currency",
      "MarginExcess",
      "TotalNetValue",
      "CashOutstanding",
      "Side",
      "Price",
      "PriceType",
      "AccruedInterestAmt",
      "EndAccruedInterestAmt",
      "StartCash",
      "EndCash",
      "Spread",
      "BenchmarkCurveCurrency",
      "BenchmarkCurveName",
      "BenchmarkCurvePoint",
      "BenchmarkPrice",
      "BenchmarkPriceType",
      "BenchmarkSecurityID",
      "BenchmarkSecurityIDSource",
      "SettlDeliveryType",
      "StandInstDbType",
      "StandInstDbName",
      "StandInstDbID",
      "TradingSessionID",
      "TradingSessionSubID",
      "SettlSessID",
      "SettlSessSubID",
      "ClearingBusinessDate",
      "Text",
      "EncodedTextLen",
      "EncodedText"
    ]
  },
  {
    "msgtype": "AZ",
    "name": "Collateral Response",
    "requiredFields": [
      "CollRespID",
      "CollAsgnID",
      "CollAsgnReason",
      "CollAsgnRespType",
      "TransactTime"
    ],
    "allFields": [
      "CollRespID",
      "CollAsgnID",
      "CollReqID",
      "CollAsgnReason",
      "CollAsgnTransType",
      "CollAsgnRespType",
      "CollAsgnRejectReason",
      "TransactTime",
      "Account",
      "AccountType",
      "ClOrdID",
      "OrderID",
      "SecondaryOrderID",
      "SecondaryClOrdID",
      "Symbol",
      "SymbolSfx",
      "SecurityID",
      "SecurityIDSource",
      "Product",
      "CFICode",
      "SecurityType",
      "SecuritySubType",
      "MaturityMonthYear",
      "MaturityDate",
      "PutOrCall",
      "CouponPaymentDate",
      "IssueDate",
      "RepoCollateralSecurityType",
      "RepurchaseTerm",
      "RepurchaseRate",
      "Factor",
      "CreditRating",
      "InstrRegistry",
      "CountryOfIssue",
      "StateOrProvinceOfIssue",
      "LocaleOfIssue",
      "RedemptionDate",
      "StrikePrice",
      "StrikeCurrency",
      "OptAttribute",
      "ContractMultiplier",
      "CouponRate",
      "SecurityExchange",
      "Issuer",
      "EncodedIssuerLen",
      "EncodedIssuer",
      "SecurityDesc",
      "EncodedSecurityDescLen",
      "EncodedSecurityDesc",
      "Pool",
      "ContractSettlMonth",
      "CPProgram",
      "CPRegType",
      "DatedDate",
      "InterestAccrualDate",
      "AgreementDesc",
      "AgreementID",
      "AgreementDate",
      "AgreementCurrency",
      "TerminationType",
      "StartDate",
      "EndDate",
      "DeliveryType",
      "MarginRatio",
      "SettlDate",
      "Quantity",
      "QtyType",
      "Currency",
      "MarginExcess",
      "TotalNetValue",
      "CashOutstanding",
      "Side",
      "Price",
      "PriceType",
      "AccruedInterestAmt",
      "EndAccruedInterestAmt",
      "StartCash",
      "EndCash",
      "Spread",
      "BenchmarkCurveCurrency",
      "BenchmarkCurveName",
      "BenchmarkCurvePoint",
      "BenchmarkPrice",
      "BenchmarkPriceType",
      "BenchmarkSecurityID",
      "BenchmarkSecurityIDSource",
      "Text",
      "EncodedTextLen",
      "EncodedText"
    ]
  },
  {
    "msgtype": "BA",
    "name": "Collateral Report",
    "requiredFields": [
      "CollRptID",
      "CollStatus"
    ],
    "allFields": [
      "CollRptID",
      "CollInquiryID",
      "CollStatus",
      "TotNumReports",
      "LastRptRequested",
      "Account",
      "AccountType",
      "ClOrdID",
      "OrderID",
      "SecondaryOrderID",
      "SecondaryClOrdID",
      "Symbol",
      "SymbolSfx",
      "SecurityID",
      "SecurityIDSource",
      "Product",
      "CFICode",
      "SecurityType",
      "SecuritySubType",
      "MaturityMonthYear",
      "MaturityDate",
      "PutOrCall",
      "CouponPaymentDate",
      "IssueDate",
      "RepoCollateralSecurityType",
      "RepurchaseTerm",
      "RepurchaseRate",
      "Factor",
      "CreditRating",
      "InstrRegistry",
      "CountryOfIssue",
      "StateOrProvinceOfIssue",
      "LocaleOfIssue",
      "RedemptionDate",
      "StrikePrice",
      "StrikeCurrency",
      "OptAttribute",
      "ContractMultiplier",
      "CouponRate",
      "SecurityExchange",
      "Issuer",
      "EncodedIssuerLen",
      "EncodedIssuer",
      "SecurityDesc",
      "EncodedSecurityDescLen",
      "EncodedSecurityDesc",
      "Pool",
      "ContractSettlMonth",
      "CPProgram",
      "CPRegType",
      "DatedDate",
      "InterestAccrualDate",
      "AgreementDesc",
      "AgreementID",
      "AgreementDate",
      "AgreementCurrency",
      "TerminationType",
      "StartDate",
      "EndDate",
      "DeliveryType",
      "MarginRatio",
      "SettlDate",
      "Quantity",
      "QtyType",
      "Currency",
      "MarginExcess",
      "TotalNetValue",
      "CashOutstanding",
      "Side",
      "Price",
      "PriceType",
      "AccruedInterestAmt",
      "EndAccruedInterestAmt",
      "StartCash",
      "EndCash",
      "Spread",
      "BenchmarkCurveCurrency",
      "BenchmarkCurveName",
      "BenchmarkCurvePoint",
      "BenchmarkPrice",
      "BenchmarkPriceType",
      "BenchmarkSecurityID",
      "BenchmarkSecurityIDSource",
      "SettlDeliveryType",
      "StandInstDbType",
      "StandInstDbName",
      "StandInstDbID",
      "TradingSessionID",
      "TradingSessionSubID",
      "SettlSessID",
      "SettlSessSubID",
      "ClearingBusinessDate",
      "Text",
      "EncodedTextLen",
      "EncodedText"
    ]
  },
  {
    "msgtype": "BB",
    "name": "Collateral Inquiry",
    "requiredFields": [],
    "allFields": [
      "CollInquiryID",
      "SubscriptionRequestType",
      "ResponseTransportType",
      "ResponseDestination",
      "Account",
      "AccountType",
      "ClOrdID",
      "OrderID",
      "SecondaryOrderID",
      "SecondaryClOrdID",
      "Symbol",
      "SymbolSfx",
      "SecurityID",
      "SecurityIDSource",
      "Product",
      "CFICode",
      "SecurityType",
      "SecuritySubType",
      "MaturityMonthYear",
      "MaturityDate",
      "PutOrCall",
      "CouponPaymentDate",
      "IssueDate",
      "RepoCollateralSecurityType",
      "RepurchaseTerm",
      "RepurchaseRate",
      "Factor",
      "CreditRating",
      "InstrRegistry",
      "CountryOfIssue",
      "StateOrProvinceOfIssue",
      "LocaleOfIssue",
      "RedemptionDate",
      "StrikePrice",
      "StrikeCurrency",
      "OptAttribute",
      "ContractMultiplier",
      "CouponRate",
      "SecurityExchange",
      "Issuer",
      "EncodedIssuerLen",
      "EncodedIssuer",
      "SecurityDesc",
      "EncodedSecurityDescLen",
      "EncodedSecurityDesc",
      "Pool",
      "ContractSettlMonth",
      "CPProgram",
      "CPRegType",
      "DatedDate",
      "InterestAccrualDate",
      "AgreementDesc",
      "AgreementID",
      "AgreementDate",
      "AgreementCurrency",
      "TerminationType",
      "StartDate",
      "EndDate",
      "DeliveryType",
      "MarginRatio",
      "SettlDate",
      "Quantity",
      "QtyType",
      "Currency",
      "MarginExcess",
      "TotalNetValue",
      "CashOutstanding",
      "Side",
      "Price",
      "PriceType",
      "AccruedInterestAmt",
      "EndAccruedInterestAmt",
      "StartCash",
      "EndCash",
      "Spread",
      "BenchmarkCurveCurrency",
      "BenchmarkCurveName",
      "BenchmarkCurvePoint",
      "BenchmarkPrice",
      "BenchmarkPriceType",
      "BenchmarkSecurityID",
      "BenchmarkSecurityIDSource",
      "SettlDeliveryType",
      "StandInstDbType",
      "StandInstDbName",
      "StandInstDbID",
      "TradingSessionID",
      "TradingSessionSubID",
      "SettlSessID",
      "SettlSessSubID",
      "ClearingBusinessDate",
      "Text",
      "EncodedTextLen",
      "EncodedText"
    ]
  },
  {
    "msgtype": "BC",
    "name": "Network Counterparty System Status Request",
    "requiredFields": [
      "NetworkRequestType",
      "NetworkRequestID"
    ],
    "allFields": [
      "NetworkRequestType",
      "NetworkRequestID"
    ]
  },
  {
    "msgtype": "BD",
    "name": "Network Counterparty System Status Response",
    "requiredFields": [
      "NetworkStatusResponseType",
      "NetworkResponseID"
    ],
    "allFields": [
      "NetworkStatusResponseType",
      "NetworkRequestID",
      "NetworkResponseID",
      "LastNetworkResponseID"
    ]
  },
  {
    "msgtype": "BE",
    "name": "User Request",
    "requiredFields": [
      "UserRequestID",
      "UserRequestType",
      "Username"
    ],
    "allFields": [
      "UserRequestID",
      "UserRequestType",
      "Username",
      "Password",
      "NewPassword",
      "RawDataLength",
      "RawData"
    ]
  },
  {
    "msgtype": "BF",
    "name": "User Response",
    "requiredFields": [
      "UserRequestID",
      "Username"
    ],
    "allFields": [
      "UserRequestID",
      "Username",
      "UserStatus",
      "UserStatusText"
    ]
  },
  {
    "msgtype": "BG",
    "name": "Collateral Inquiry Ack",
    "requiredFields": [
      "CollInquiryID",
      "CollInquiryStatus"
    ],
    "allFields": [
      "CollInquiryID",
      "CollInquiryStatus",
      "CollInquiryResult",
      "TotNumReports",
      "Account",
      "AccountType",
      "ClOrdID",
      "OrderID",
      "SecondaryOrderID",
      "SecondaryClOrdID",
      "Symbol",
      "SymbolSfx",
      "SecurityID",
      "SecurityIDSource",
      "Product",
      "CFICode",
      "SecurityType",
      "SecuritySubType",
      "MaturityMonthYear",
      "MaturityDate",
      "PutOrCall",
      "CouponPaymentDate",
      "IssueDate",
      "RepoCollateralSecurityType",
      "RepurchaseTerm",
      "RepurchaseRate",
      "Factor",
      "CreditRating",
      "InstrRegistry",
      "CountryOfIssue",
      "StateOrProvinceOfIssue",
      "LocaleOfIssue",
      "RedemptionDate",
      "StrikePrice",
      "StrikeCurrency",
      "OptAttribute",
      "ContractMultiplier",
      "CouponRate",
      "SecurityExchange",
      "Issuer",
      "EncodedIssuerLen",
      "EncodedIssuer",
      "SecurityDesc",
      "EncodedSecurityDescLen",
      "EncodedSecurityDesc",
      "Pool",
      "ContractSettlMonth",
      "CPProgram",
      "CPRegType",
      "DatedDate",
      "InterestAccrualDate",
      "AgreementDesc",
      "AgreementID",
      "AgreementDate",
      "AgreementCurrency",
      "TerminationType",
      "StartDate",
      "EndDate",
      "DeliveryType",
      "MarginRatio",
      "SettlDate",
      "Quantity",
      "QtyType",
      "Currency",
      "TradingSessionID",
      "TradingSessionSubID",
      "SettlSessID",
      "SettlSessSubID",
      "ClearingBusinessDate",
      "ResponseTransportType",
      "ResponseDestination",
      "Text",
      "EncodedTextLen",
      "EncodedText"
    ]
  },
  {
    "msgtype": "BH",
    "name": "Confirmation Request",
    "requiredFields": [
      "ConfirmReqID",
      "ConfirmType",
      "TransactTime"
    ],
    "allFields": [
      "ConfirmReqID",
      "ConfirmType",
      "AllocID",
      "SecondaryAllocID",
      "IndividualAllocID",
      "TransactTime",
      "AllocAccount",
      "AllocAcctIDSource",
      "AllocAccountType",
      "Text",
      "EncodedTextLen",
      "EncodedText"
    ]
  }
]

export const MESSAGES_TT42: MessageDef[] = [
  {
    "msgtype": "0",
    "name": "Heartbeat",
    "requiredFields": [],
    "allFields": [
      "TestReqID"
    ]
  },
  {
    "msgtype": "1",
    "name": "Test Request",
    "requiredFields": [
      "TestReqID"
    ],
    "allFields": [
      "TestReqID"
    ]
  },
  {
    "msgtype": "2",
    "name": "Resend Request",
    "requiredFields": [
      "BeginSeqNo",
      "EndSeqNo"
    ],
    "allFields": [
      "BeginSeqNo",
      "EndSeqNo"
    ]
  },
  {
    "msgtype": "3",
    "name": "Reject",
    "requiredFields": [
      "RefSeqNum"
    ],
    "allFields": [
      "RefSeqNum",
      "RefTagID",
      "RefMsgType",
      "SessionRejectReason",
      "Text",
      "StartSequenceNumber"
    ]
  },
  {
    "msgtype": "4",
    "name": "Sequence Reset",
    "requiredFields": [
      "NewSeqNo"
    ],
    "allFields": [
      "GapFillFlag",
      "NewSeqNo"
    ]
  },
  {
    "msgtype": "5",
    "name": "Logout",
    "requiredFields": [],
    "allFields": [
      "Text",
      "ForceLogout",
      "NextExpectedMsgSeqNum"
    ]
  },
  {
    "msgtype": "8",
    "name": "Execution Report",
    "requiredFields": [
      "OrderID",
      "ExecType",
      "OrdStatus",
      "LeavesQty",
      "CumQty",
      "AvgPx"
    ],
    "allFields": [
      "OrderID",
      "SecondaryOrderID",
      "SecondaryClOrdID",
      "SecondaryExecID",
      "ClOrdID",
      "OrigClOrdID",
      "TTClOrdID",
      "ExecID",
      "ExecTransType",
      "ExecRefID",
      "ExecType",
      "ExecInst",
      "OrdStatus",
      "OrdRejReason",
      "ExecRestatementReason",
      "Account",
      "Symbol",
      "SecurityID",
      "IDSource",
      "Product",
      "CFICode",
      "SecurityType",
      "SecuritySubType",
      "MaturityMonthYear",
      "MaturityDate",
      "MaturityDay",
      "ContractYearMonth",
      "DeliveryTerm",
      "DeliveryDate",
      "PutOrCall",
      "StrikePrice",
      "OptAttribute",
      "SecurityExchange",
      "ExDestination",
      "SecurityDesc",
      "Currency",
      "ExerciseStyle",
      "Timezone",
      "Side",
      "OrderQty",
      "OrdType",
      "Price",
      "StopPx",
      "TimeInForce",
      "ExpireDate",
      "ClearingAccount",
      "LastShares",
      "LastPx",
      "LeavesQty",
      "CumQty",
      "AvgPx",
      "TradeDate",
      "TransactTime",
      "MinQty",
      "LiquidityIndicator",
      "OpenClose",
      "DisplayQty",
      "RefreshQty",
      "Text",
      "MultiLegReportingType",
      "ManualOrderIndicator",
      "ExchCred",
      "OrderCapacity",
      "CustOrderCapacity",
      "ContingencyType",
      "TTID",
      "TrdType",
      "TrdMatchID",
      "CrossID",
      "CrossType",
      "TradeReportID",
      "AOTCPreventionActionType",
      "TotalNumOrders",
      "BrokerID",
      "CompanyID",
      "LastParPx",
      "HandlInst",
      "StagedOrderMsg",
      "StagedOrderOwner",
      "StagedOrderStatus",
      "ExternalSource",
      "AggressorIndicator",
      "EffectiveTime",
      "ExpireTime",
      "TextTTModifyingUser",
      "TargetStrategyName",
      "TargetStrategyType",
      "BracketOrderType",
      "BracketStopLimitOffset",
      "ChildTIF",
      "DiscVal",
      "DiscValType",
      "ETimeAct",
      "Interval",
      "IsTrlTrg",
      "LeftoverAction",
      "LeftoverTicks",
      "LimitPriceType",
      "LimitTicksAway",
      "OcoStopTriggerPrice",
      "ProfitTarget",
      "StopLimitOffset",
      "StopOrderType",
      "StopTarget",
      "TriggerPriceType",
      "TriggerTicksAway",
      "TriggerType",
      "WithATickType",
      "WithATick",
      "AllocID",
      "RefID",
      "ClearingAccountOverride",
      "DropCopyOrder",
      "OrderOrigination",
      "TrdRegPublicationReason",
      "TradingVenueRegulatoryTradeID",
      "LastLiquidityIndicator",
      "OrderIDGUID",
      "TextTT",
      "TextA",
      "TextB",
      "TextC",
      "TimeReceivedFromExchange",
      "EchoDC_01",
      "EchoDC_02",
      "EchoDC_03",
      "EchoDC_04",
      "EchoDC_05",
      "EchoDC_06",
      "EchoDC_07",
      "EchoDC_08",
      "EchoDC_09",
      "EchoDC_10",
      "EchoDC_11",
      "EchoDC_12",
      "EchoDC_13",
      "EchoDC_14",
      "EchoDC_15",
      "EchoDC_16",
      "EchoDC_17",
      "EchoDC_18",
      "EchoDC_19",
      "EchoDC_20",
      "SelfMatchPreventionID",
      "SelfMatchPreventionIDICE",
      "SelfMatchPreventionInstruction",
      "SMPInstruction",
      "OrderSource",
      "UniqueExecID",
      "SpreadLegRatioQty",
      "LastMkt",
      "AccountRiskGroup",
      "MlegHeadExecId",
      "OrdStatusReqID",
      "TTCustomerName",
      "AccountID",
      "UserID",
      "InvestmentDecision",
      "DirectElectronicAccess",
      "TradingCapacity",
      "LiquidityProvision",
      "OriginalSecondaryExecID",
      "MiFIDID",
      "ExecutionDecision",
      "ClientIDCode",
      "TTSyntheticType",
      "VendorDefinedField1",
      "VendorDefinedField2",
      "VendorDefinedField3",
      "VendorDefinedField4",
      "VendorDefinedField5",
      "CustOrderHandlingInst",
      "Organization",
      "MockOrderFlag",
      "MaxShow",
      "ReviewUserID",
      "ReviewStatus",
      "UniqueLegID",
      "OrderRestriction",
      "LeftoverMktOrderLimitTicks",
      "TTStopNoImplies",
      "SecondConditionIsOn",
      "SecondTriggerTicksAway",
      "SecondTriggerQtyType",
      "SecondTriggerQtyCompare",
      "SecondTriggerQty",
      "LeftoverTime",
      "SecondTriggerPriceType",
      "NoImplies",
      "CustomSliceSched",
      "ComplianceText",
      "LastTradingDate",
      "TradingStrategy",
      "ReverseSpreadOC",
      "MaxPart",
      "MaxDisp",
      "TwapStyle",
      "WouldIfPrc",
      "LimitPrc",
      "IntentToCross",
      "TTSMPID",
      "TTSMPInstruction",
      "NVDR",
      "TTF",
      "TFUserType",
      "DynamicEndTime",
      "UnderlyingSymbol",
      "UnderlyingSecurityID",
      "UnderlyingSecurityIDSource",
      "UnderlyingSecurityType",
      "UnderlyingPx",
      "UnderlyingQty",
      "UnderlyingMaturityDate",
      "UnderlyingIssuer",
      "UnderlyingCurrency",
      "UnderlyingMemo",
      "UnderlyingStrikePrice",
      "UnderlyingSpotRate",
      "UnderlyingSecuritySubType",
      "MemoFieldICE",
      "SettlDate",
      "IfTouchedPrice",
      "IWouldPrice",
      "IsFirm",
      "FixingDate",
      "FixingSource",
      "ReportingParty",
      "TradeID",
      "HedgeOrderType",
      "DeltaRounding",
      "Vol",
      "SettlType",
      "QuoteId",
      "LastSpotRate",
      "LastForwardPoints",
      "RejectSource",
      "TotalNumSecurities",
      "InsertTime",
      "BrokerRoute"
    ]
  },
  {
    "msgtype": "9",
    "name": "Order Cancel Reject",
    "requiredFields": [
      "OrderID",
      "OrdStatus",
      "CxlRejResponseTo"
    ],
    "allFields": [
      "OrderID",
      "SecondaryOrderID",
      "ClOrdID",
      "TTClOrdID",
      "OrigClOrdID",
      "OrdStatus",
      "Account",
      "TransactTime",
      "CxlRejResponseTo",
      "CxlRejReason",
      "Text",
      "TTID",
      "AOTCPreventionActionType",
      "BrokerID",
      "CompanyID",
      "HandlInst",
      "StagedOrderMsg",
      "StagedOrderOwner",
      "StagedOrderStatus",
      "ExternalSource",
      "OrderIDGUID",
      "ClearingAccountOverride",
      "TextTT",
      "TextA",
      "TextB",
      "TextC",
      "TimeReceivedFromExchange",
      "EchoDC_01",
      "EchoDC_02",
      "EchoDC_03",
      "EchoDC_04",
      "EchoDC_05",
      "EchoDC_06",
      "EchoDC_07",
      "EchoDC_08",
      "EchoDC_09",
      "EchoDC_10",
      "EchoDC_11",
      "EchoDC_12",
      "EchoDC_13",
      "EchoDC_14",
      "EchoDC_15",
      "EchoDC_16",
      "EchoDC_17",
      "EchoDC_18",
      "EchoDC_19",
      "EchoDC_20",
      "OrderCapacity",
      "OrderOrigination",
      "OrderSource",
      "AccountID",
      "UserID",
      "Symbol",
      "SecurityID",
      "IDSource",
      "Product",
      "CFICode",
      "SecurityType",
      "SecuritySubType",
      "MaturityMonthYear",
      "MaturityDate",
      "MaturityDay",
      "ContractYearMonth",
      "DeliveryTerm",
      "DeliveryDate",
      "PutOrCall",
      "StrikePrice",
      "OptAttribute",
      "SecurityExchange",
      "ExDestination",
      "SecurityDesc",
      "Currency",
      "ExerciseStyle",
      "Timezone",
      "LastMkt",
      "AllocID",
      "CustOrderHandlingInst",
      "TTSyntheticType",
      "TTCustomerName",
      "Organization",
      "MockOrderFlag",
      "ExchCred",
      "MaxShow",
      "UniqueLegID",
      "TTStopNoImplies",
      "SecondConditionIsOn",
      "SecondTriggerTicksAway",
      "SecondTriggerQtyType",
      "SecondTriggerQtyCompare",
      "SecondTriggerQty",
      "LeftoverTime",
      "SecondTriggerPriceType",
      "NoImplies",
      "CustomSliceSched",
      "ComplianceText",
      "TTSMPID",
      "TTSMPInstruction",
      "TFUserType",
      "NVDR",
      "TTF",
      "DynamicEndTime",
      "HedgeOrderType",
      "DeltaRounding",
      "Vol",
      "SelfMatchPreventionID",
      "RejectSource",
      "InsertTime",
      "BrokerRoute"
    ]
  },
  {
    "msgtype": "AB",
    "name": "New Order Multileg",
    "requiredFields": [
      "ClOrdID",
      "Account",
      "OrderQty",
      "Side",
      "OrdType"
    ],
    "allFields": [
      "ClOrdID",
      "TransactTime",
      "Symbol",
      "SecurityID",
      "IDSource",
      "Product",
      "CFICode",
      "SecurityType",
      "SecuritySubType",
      "MaturityMonthYear",
      "MaturityDate",
      "MaturityDay",
      "ContractYearMonth",
      "DeliveryTerm",
      "DeliveryDate",
      "PutOrCall",
      "StrikePrice",
      "OptAttribute",
      "SecurityExchange",
      "ExDestination",
      "SecurityDesc",
      "Currency",
      "ExerciseStyle",
      "Timezone",
      "Account",
      "SecondaryAccount",
      "Price",
      "StopPx",
      "OrderQty",
      "MinQty",
      "DisplayQty",
      "Side",
      "OrdType",
      "OpenClose",
      "TimeInForce",
      "ExpireDate",
      "ExecInst",
      "ManualOrderIndicator",
      "ClearingAccountOverride",
      "TextTT",
      "TextA",
      "TextB",
      "TextC",
      "EchoDC_01",
      "EchoDC_02",
      "EchoDC_03",
      "EchoDC_04",
      "EchoDC_05",
      "EchoDC_06",
      "EchoDC_07",
      "EchoDC_08",
      "EchoDC_09",
      "EchoDC_10",
      "EchoDC_11",
      "EchoDC_12",
      "EchoDC_13",
      "EchoDC_14",
      "EchoDC_15",
      "EchoDC_16",
      "EchoDC_17",
      "EchoDC_18",
      "EchoDC_19",
      "EchoDC_20",
      "TargetStrategyName",
      "TargetStrategyType",
      "ContingencyType",
      "HandlInst",
      "StagedOrderMsg",
      "CompanyID",
      "Text",
      "DropCopyOrder",
      "OrderOrigination",
      "OrderCapacity",
      "CustOrderCapacity",
      "SelfMatchPreventionID",
      "SMPInstruction",
      "OrderSource",
      "OrderID",
      "TTCustomerName",
      "BrokerID",
      "LastMkt",
      "ExpireTime",
      "EffectiveTime",
      "CustOrderHandlingInst",
      "TTSyntheticType",
      "Organization",
      "MockOrderFlag",
      "UserID",
      "OrderRestriction",
      "WaitingOption",
      "ChildTIF",
      "LeftoverMktOrderLimitTicks",
      "TTStopNoImplies",
      "SecondConditionIsOn",
      "SecondTriggerTicksAway",
      "SecondTriggerQtyType",
      "SecondTriggerQtyCompare",
      "SecondTriggerQty",
      "LeftoverTime",
      "SecondTriggerPriceType",
      "NoImplies",
      "CustomSliceSched",
      "ComplianceText",
      "TradingStrategy",
      "ReverseSpreadOC",
      "ParentVendorOrderID",
      "ParentVendorUserID",
      "ParentVendorAccountID",
      "ParentVendorBrokerID",
      "ParentVendorProfileID",
      "MaxPart",
      "MaxDisp",
      "TwapStyle",
      "WouldIfPrc",
      "LimitPrc",
      "IntentToCross",
      "TFUserType",
      "DynamicEndTime",
      "ParentVendorAlgoID",
      "ParentVendorAlgoType",
      "PriceFormula",
      "ReloadOffset",
      "OverrideTickNumerator",
      "FormulaBasedOn",
      "ReloadDelay",
      "DisclosedQty",
      "Reload",
      "OverrideTickSize",
      "OverrideTickDenominator",
      "IsShared",
      "SubStrategy",
      "LegRiskAversion",
      "HedgeDiscretionTicks",
      "TTSMPID",
      "TTSMPInstruction",
      "IfTouchedPrice",
      "IWouldPrice",
      "HedgeOrderType",
      "DeltaRounding",
      "Vol",
      "QuoteId",
      "BrokerRoute"
    ]
  },
  {
    "msgtype": "D",
    "name": "New Order Single",
    "requiredFields": [
      "ClOrdID",
      "Account",
      "OrderQty",
      "Side",
      "OrdType"
    ],
    "allFields": [
      "ClOrdID",
      "Symbol",
      "SecurityID",
      "IDSource",
      "Product",
      "CFICode",
      "SecurityType",
      "SecuritySubType",
      "MaturityMonthYear",
      "MaturityDate",
      "MaturityDay",
      "ContractYearMonth",
      "DeliveryTerm",
      "DeliveryDate",
      "PutOrCall",
      "StrikePrice",
      "OptAttribute",
      "SecurityExchange",
      "ExDestination",
      "SecurityDesc",
      "Currency",
      "ExerciseStyle",
      "Timezone",
      "Account",
      "SecondaryAccount",
      "Price",
      "StopPx",
      "OrderQty",
      "MinQty",
      "DisplayQty",
      "Side",
      "OrdType",
      "OpenClose",
      "TimeInForce",
      "ExpireDate",
      "ExecInst",
      "ContingencyType",
      "TransactTime",
      "ManualOrderIndicator",
      "HandlInst",
      "StagedOrderMsg",
      "CompanyID",
      "EffectiveTime",
      "ExpireTime",
      "TextA",
      "TextB",
      "TargetStrategyName",
      "TargetStrategyType",
      "BracketOrderType",
      "BracketStopLimitOffset",
      "ChildTIF",
      "DiscVal",
      "DiscValType",
      "ETimeAct",
      "Interval",
      "IsTrlTrg",
      "LeftoverAction",
      "LeftoverTicks",
      "LimitPriceType",
      "LimitTicksAway",
      "OcoStopTriggerPrice",
      "ProfitTarget",
      "StopLimitOffset",
      "StopOrderType",
      "StopTarget",
      "TriggerPriceType",
      "TriggerTicksAway",
      "TriggerType",
      "WithATickType",
      "WithATick",
      "TriggerQtyType",
      "TriggerQtyCompare",
      "TriggerQty",
      "TriggerLTPReset",
      "TTStopLimitPriceType",
      "TTStopWithATickType",
      "TTStopWithATick",
      "Payup",
      "TTStopTriggerPriceType",
      "TTStopIsTrlTrg",
      "TTStopTriggerTicksAway",
      "TTStopTriggerQtyType",
      "TTStopTriggerQTyCompare",
      "TTStopTriggerQty",
      "TTStopTriggerLTPReset",
      "TTStopTriggeredOrderType",
      "TTStopTriggeredOrderPrice",
      "TTStopLimitTicksAway",
      "TTStopPayup",
      "Text",
      "ClearingAccountOverride",
      "DropCopyOrder",
      "OrderOrigination",
      "OrderCapacity",
      "CustOrderCapacity",
      "TextTT",
      "TextC",
      "EchoDC_01",
      "EchoDC_02",
      "EchoDC_03",
      "EchoDC_04",
      "EchoDC_05",
      "EchoDC_06",
      "EchoDC_07",
      "EchoDC_08",
      "EchoDC_09",
      "EchoDC_10",
      "EchoDC_11",
      "EchoDC_12",
      "EchoDC_13",
      "EchoDC_14",
      "EchoDC_15",
      "EchoDC_16",
      "EchoDC_17",
      "EchoDC_18",
      "EchoDC_19",
      "EchoDC_20",
      "SelfMatchPreventionID",
      "SMPInstruction",
      "Duration",
      "DurationBaseUnit",
      "DurationSTime",
      "DurationETime",
      "LeftoverTimeAction",
      "AutoResubExpiredGTD",
      "ParentTIF",
      "TTStopSecondConditionIsOn",
      "TTStopSecondTriggerPriceType",
      "TTStopSecondConditionIsTrlTrg",
      "TTStopSecondTriggerTicksAway",
      "TTStopSecondTriggerQtyType",
      "TTStopSecondTriggerQtyCompare",
      "TTStopSecondTriggerQty",
      "Variance",
      "OrderSource",
      "OrderID",
      "TTCustomerName",
      "BrokerID",
      "LastMkt",
      "ETAGoToMktTicks",
      "WaitingOption",
      "TTStopChildTIFOverride",
      "CustOrderHandlingInst",
      "TTSyntheticType",
      "Organization",
      "MockOrderFlag",
      "OrderRestriction",
      "UserID",
      "TTStopNoImplies",
      "SecondConditionIsOn",
      "SecondTriggerTicksAway",
      "SecondTriggerQtyType",
      "SecondTriggerQtyCompare",
      "SecondTriggerQty",
      "LeftoverTime",
      "SecondTriggerPriceType",
      "NoImplies",
      "CustomSliceSched",
      "LeftoverMktOrderLimitTicks",
      "ComplianceText",
      "TradingStrategy",
      "ReverseSpreadOC",
      "ParentVendorOrderID",
      "ParentVendorUserID",
      "ParentVendorAccountID",
      "ParentVendorBrokerID",
      "ParentVendorProfileID",
      "MaxPart",
      "MaxDisp",
      "TwapStyle",
      "WouldIfPrc",
      "LimitPrc",
      "IntentToCross",
      "TFUserType",
      "DynamicEndTime",
      "ParentVendorAlgoID",
      "ParentVendorAlgoType",
      "TTSMPID",
      "TTSMPInstruction",
      "IfTouchedPrice",
      "IWouldPrice",
      "HedgeOrderType",
      "DeltaRounding",
      "Vol",
      "QuoteId",
      "BrokerRoute"
    ]
  },
  {
    "msgtype": "AC",
    "name": "Multileg Order Cancel Replace",
    "requiredFields": [
      "ClOrdID",
      "Account",
      "OrderQty",
      "Side",
      "OrdType"
    ],
    "allFields": [
      "OrderID",
      "OrderIDGUID",
      "OrigClOrdID",
      "ClOrdID",
      "Account",
      "Price",
      "StopPx",
      "Symbol",
      "SecurityID",
      "IDSource",
      "Product",
      "CFICode",
      "SecurityType",
      "SecuritySubType",
      "MaturityMonthYear",
      "MaturityDate",
      "MaturityDay",
      "ContractYearMonth",
      "DeliveryTerm",
      "DeliveryDate",
      "PutOrCall",
      "StrikePrice",
      "OptAttribute",
      "SecurityExchange",
      "ExDestination",
      "SecurityDesc",
      "Currency",
      "ExerciseStyle",
      "Timezone",
      "OrderQty",
      "MinQty",
      "DisplayQty",
      "Side",
      "OrdType",
      "OpenClose",
      "TimeInForce",
      "ExpireDate",
      "ExecInst",
      "TransactTime",
      "ManualOrderIndicator",
      "ClearingAccountOverride",
      "TextA",
      "TextB",
      "HandlInst",
      "StagedOrderMsg",
      "Text",
      "DropCopyOrder",
      "OrderCapacity",
      "CustOrderCapacity",
      "OrderOrigination",
      "TextTT",
      "TextC",
      "EchoDC_01",
      "EchoDC_02",
      "EchoDC_03",
      "EchoDC_04",
      "EchoDC_05",
      "EchoDC_06",
      "EchoDC_07",
      "EchoDC_08",
      "EchoDC_09",
      "EchoDC_10",
      "EchoDC_11",
      "EchoDC_12",
      "EchoDC_13",
      "EchoDC_14",
      "EchoDC_15",
      "EchoDC_16",
      "EchoDC_17",
      "EchoDC_18",
      "EchoDC_19",
      "EchoDC_20",
      "SelfMatchPreventionID",
      "SMPInstruction",
      "OrderSource",
      "CompanyID",
      "TTCustomerName",
      "LastMkt",
      "ExpireTime",
      "CustOrderHandlingInst",
      "TTSyntheticType",
      "Organization",
      "MockOrderFlag",
      "OrderRestriction",
      "WaitingOption",
      "ChildTIF",
      "LeftoverMktOrderLimitTicks",
      "UserID",
      "TTStopNoImplies",
      "SecondConditionIsOn",
      "SecondTriggerTicksAway",
      "SecondTriggerQtyType",
      "SecondTriggerQtyCompare",
      "SecondTriggerQty",
      "LeftoverTime",
      "SecondTriggerPriceType",
      "NoImplies",
      "CustomSliceSched",
      "ComplianceText",
      "TradingStrategy",
      "ReverseSpreadOC",
      "ParentVendorOrderID",
      "ParentVendorUserID",
      "ParentVendorAccountID",
      "ParentVendorBrokerID",
      "ParentVendorProfileID",
      "MaxPart",
      "MaxDisp",
      "TwapStyle",
      "WouldIfPrc",
      "LimitPrc",
      "IntentToCross",
      "DynamicEndTime",
      "ParentVendorAlgoID",
      "ParentVendorAlgoType",
      "BrokerID",
      "HedgeOrderType",
      "DeltaRounding",
      "Vol",
      "BrokerRoute"
    ]
  },
  {
    "msgtype": "G",
    "name": "Order Cancel Replace Request",
    "requiredFields": [
      "ClOrdID",
      "Account",
      "OrderQty",
      "Side",
      "OrdType"
    ],
    "allFields": [
      "OrderID",
      "OrderIDGUID",
      "OrigClOrdID",
      "ClOrdID",
      "Account",
      "Price",
      "StopPx",
      "Symbol",
      "SecurityID",
      "IDSource",
      "Product",
      "CFICode",
      "SecurityType",
      "SecuritySubType",
      "MaturityMonthYear",
      "MaturityDate",
      "MaturityDay",
      "ContractYearMonth",
      "DeliveryTerm",
      "DeliveryDate",
      "PutOrCall",
      "StrikePrice",
      "OptAttribute",
      "SecurityExchange",
      "ExDestination",
      "SecurityDesc",
      "Currency",
      "ExerciseStyle",
      "Timezone",
      "OrderQty",
      "MinQty",
      "DisplayQty",
      "Side",
      "OrdType",
      "OpenClose",
      "TimeInForce",
      "ExpireDate",
      "ExecInst",
      "TransactTime",
      "ManualOrderIndicator",
      "TextA",
      "TextB",
      "HandlInst",
      "StagedOrderMsg",
      "Text",
      "BracketOrderType",
      "BracketStopLimitOffset",
      "ChildTIF",
      "DiscVal",
      "DiscValType",
      "ETimeAct",
      "Interval",
      "IsTrlTrg",
      "LeftoverAction",
      "LeftoverTicks",
      "LimitPriceType",
      "LimitTicksAway",
      "OcoStopTriggerPrice",
      "ProfitTarget",
      "StopLimitOffset",
      "StopOrderType",
      "StopTarget",
      "TriggerPriceType",
      "TriggerTicksAway",
      "TriggerType",
      "WithATickType",
      "WithATick",
      "TriggerQtyType",
      "TriggerQtyCompare",
      "TriggerQty",
      "TriggerLTPReset",
      "TTStopLimitPriceType",
      "TTStopWithATickType",
      "TTStopWithATick",
      "Payup",
      "TTStopTriggerPriceType",
      "TTStopIsTrlTrg",
      "TTStopTriggerTicksAway",
      "TTStopTriggerQtyType",
      "TTStopTriggerQTyCompare",
      "TTStopTriggerQty",
      "TTStopTriggerLTPReset",
      "TTStopTriggeredOrderType",
      "TTStopTriggeredOrderPrice",
      "TTStopLimitTicksAway",
      "TTStopPayup",
      "ClearingAccountOverride",
      "DropCopyOrder",
      "OrderCapacity",
      "CustOrderCapacity",
      "OrderOrigination",
      "TextTT",
      "TextC",
      "EchoDC_01",
      "EchoDC_02",
      "EchoDC_03",
      "EchoDC_04",
      "EchoDC_05",
      "EchoDC_06",
      "EchoDC_07",
      "EchoDC_08",
      "EchoDC_09",
      "EchoDC_10",
      "EchoDC_11",
      "EchoDC_12",
      "EchoDC_13",
      "EchoDC_14",
      "EchoDC_15",
      "EchoDC_16",
      "EchoDC_17",
      "EchoDC_18",
      "EchoDC_19",
      "EchoDC_20",
      "SelfMatchPreventionID",
      "SMPInstruction",
      "Duration",
      "DurationBaseUnit",
      "DurationSTime",
      "DurationETime",
      "CompanyID",
      "LeftoverTimeAction",
      "AutoResubExpiredGTD",
      "ParentTIF",
      "TTStopSecondConditionIsOn",
      "TTStopSecondTriggerPriceType",
      "TTStopSecondConditionIsTrlTrg",
      "TTStopSecondTriggerTicksAway",
      "TTStopSecondTriggerQtyType",
      "TTStopSecondTriggerQtyCompare",
      "TTStopSecondTriggerQty",
      "Variance",
      "OrderSource",
      "TTCustomerName",
      "LastMkt",
      "ExpireTime",
      "CustOrderHandlingInst",
      "TTSyntheticType",
      "Organization",
      "MockOrderFlag",
      "UserID",
      "OrderRestriction",
      "WaitingOption",
      "LeftoverMktOrderLimitTicks",
      "TTStopNoImplies",
      "SecondConditionIsOn",
      "SecondTriggerTicksAway",
      "SecondTriggerQtyType",
      "SecondTriggerQtyCompare",
      "SecondTriggerQty",
      "LeftoverTime",
      "SecondTriggerPriceType",
      "NoImplies",
      "CustomSliceSched",
      "ComplianceText",
      "TradingStrategy",
      "ReverseSpreadOC",
      "ParentVendorOrderID",
      "ParentVendorUserID",
      "ParentVendorAccountID",
      "ParentVendorBrokerID",
      "ParentVendorProfileID",
      "MaxPart",
      "MaxDisp",
      "TwapStyle",
      "WouldIfPrc",
      "LimitPrc",
      "IntentToCross",
      "DynamicEndTime",
      "ParentVendorAlgoID",
      "ParentVendorAlgoType",
      "BrokerID",
      "IfTouchedPrice",
      "IWouldPrice",
      "HedgeOrderType",
      "DeltaRounding",
      "Vol",
      "BrokerRoute"
    ]
  },
  {
    "msgtype": "F",
    "name": "Order Cancel Request",
    "requiredFields": [
      "ClOrdID"
    ],
    "allFields": [
      "ClOrdID",
      "OrderID",
      "OrderIDGUID",
      "OrigClOrdID",
      "ManualOrderIndicator",
      "Symbol",
      "SecurityID",
      "IDSource",
      "Product",
      "CFICode",
      "SecurityType",
      "SecuritySubType",
      "MaturityMonthYear",
      "MaturityDate",
      "MaturityDay",
      "ContractYearMonth",
      "DeliveryTerm",
      "DeliveryDate",
      "PutOrCall",
      "StrikePrice",
      "OptAttribute",
      "SecurityExchange",
      "ExDestination",
      "SecurityDesc",
      "Currency",
      "ExerciseStyle",
      "Timezone",
      "Text",
      "ClearingAccountOverride",
      "TransactTime",
      "DropCopyOrder",
      "TextTT",
      "OrderOrigination",
      "TextC",
      "EchoDC_01",
      "EchoDC_02",
      "EchoDC_03",
      "EchoDC_04",
      "EchoDC_05",
      "EchoDC_06",
      "EchoDC_07",
      "EchoDC_08",
      "EchoDC_09",
      "EchoDC_10",
      "EchoDC_11",
      "EchoDC_12",
      "EchoDC_13",
      "EchoDC_14",
      "EchoDC_15",
      "EchoDC_16",
      "EchoDC_17",
      "EchoDC_18",
      "EchoDC_19",
      "EchoDC_20",
      "CompanyID",
      "OrderSource",
      "LastMkt",
      "StagedOrderMsg",
      "TTSyntheticType",
      "CustOrderHandlingInst",
      "Organization",
      "MockOrderFlag",
      "UserID",
      "Account",
      "OrderRestriction",
      "TTStopNoImplies",
      "SecondConditionIsOn",
      "SecondTriggerTicksAway",
      "SecondTriggerQtyType",
      "SecondTriggerQtyCompare",
      "SecondTriggerQty",
      "LeftoverTime",
      "SecondTriggerPriceType",
      "NoImplies",
      "CustomSliceSched",
      "ComplianceText",
      "ParentVendorOrderID",
      "ParentVendorUserID",
      "ParentVendorAccountID",
      "ParentVendorBrokerID",
      "ParentVendorProfileID",
      "DynamicEndTime",
      "ParentVendorAlgoID",
      "ParentVendorAlgoType",
      "BrokerID",
      "HedgeOrderType",
      "DeltaRounding",
      "Vol",
      "BrokerRoute",
      "Side"
    ]
  },
  {
    "msgtype": "c",
    "name": "Security Definition Request",
    "requiredFields": [
      "SecurityReqID"
    ],
    "allFields": [
      "SecurityReqID",
      "SecurityRequestType",
      "RequestTickTable",
      "Symbol",
      "SecurityID",
      "IDSource",
      "Product",
      "CFICode",
      "SecurityType",
      "SecuritySubType",
      "MaturityMonthYear",
      "MaturityDate",
      "MaturityDay",
      "ContractYearMonth",
      "DeliveryTerm",
      "DeliveryDate",
      "PutOrCall",
      "StrikePrice",
      "OptAttribute",
      "SecurityExchange",
      "ExDestination",
      "SecurityDesc",
      "Currency",
      "ExerciseStyle",
      "Timezone",
      "Account",
      "ParentVendorUserID",
      "ParentVendorAccountID",
      "ParentVendorBrokerID",
      "ParentVendorProfileID",
      "Text"
    ]
  },
  {
    "msgtype": "d",
    "name": "Security Definition",
    "requiredFields": [
      "SecurityReqID",
      "SecurityResponseID",
      "SecurityResponseType",
      "TotalNumSecurities"
    ],
    "allFields": [
      "SecurityReqID",
      "SecurityResponseID",
      "SecurityResponseType",
      "TotalNumSecurities",
      "Symbol",
      "SecurityID",
      "IDSource",
      "Product",
      "CFICode",
      "SecurityType",
      "SecuritySubType",
      "MaturityMonthYear",
      "MaturityDate",
      "MaturityDay",
      "ContractYearMonth",
      "DeliveryTerm",
      "DeliveryDate",
      "PutOrCall",
      "StrikePrice",
      "OptAttribute",
      "SecurityExchange",
      "ExDestination",
      "SecurityDesc",
      "Currency",
      "ExerciseStyle",
      "Timezone",
      "DisplayFactor",
      "Text",
      "MinLotSize",
      "NumberOfBlocks",
      "TradesInFlow",
      "ExchTickSize",
      "ExchPointValue",
      "PriceDisplayType",
      "RoundLot",
      "UnderlyingSymbol",
      "UnderlyingSecurityID",
      "UnderlyingSecurityIDSource",
      "UnderlyingSecurityType",
      "UnderlyingPx",
      "UnderlyingQty",
      "UnderlyingMaturityDate",
      "UnderlyingIssuer",
      "UnderlyingCurrency",
      "UnderlyingMemo",
      "UnderlyingStrikePrice",
      "UnderlyingSpotRate",
      "UnderlyingSecuritySubType",
      "DisplayFactorQty",
      "ProductComplex",
      "DefSecuritySubTypeID"
    ]
  },
  {
    "msgtype": "e",
    "name": "Security Status Request",
    "requiredFields": [
      "SecurityStatusReqID",
      "SubscriptionRequestType"
    ],
    "allFields": [
      "SecurityStatusReqID",
      "SubscriptionRequestType",
      "Symbol",
      "SecurityID",
      "IDSource",
      "Product",
      "CFICode",
      "SecurityType",
      "SecuritySubType",
      "MaturityMonthYear",
      "MaturityDate",
      "MaturityDay",
      "ContractYearMonth",
      "DeliveryTerm",
      "DeliveryDate",
      "PutOrCall",
      "StrikePrice",
      "OptAttribute",
      "SecurityExchange",
      "ExDestination",
      "SecurityDesc",
      "Currency",
      "ExerciseStyle",
      "Timezone"
    ]
  },
  {
    "msgtype": "f",
    "name": "Security Status",
    "requiredFields": [
      "SecurityStatusReqID",
      "SecurityTradingStatus"
    ],
    "allFields": [
      "SecurityStatusReqID",
      "Symbol",
      "SecurityID",
      "IDSource",
      "Product",
      "CFICode",
      "SecurityType",
      "SecuritySubType",
      "MaturityMonthYear",
      "MaturityDate",
      "MaturityDay",
      "ContractYearMonth",
      "DeliveryTerm",
      "DeliveryDate",
      "PutOrCall",
      "StrikePrice",
      "OptAttribute",
      "SecurityExchange",
      "ExDestination",
      "SecurityDesc",
      "Currency",
      "ExerciseStyle",
      "Timezone",
      "SecurityTradingStatus",
      "Text"
    ]
  },
  {
    "msgtype": "V",
    "name": "Market Data Request",
    "requiredFields": [
      "MDReqID",
      "SubscriptionRequestType"
    ],
    "allFields": [
      "MDReqID",
      "SubscriptionRequestType",
      "MarketDepth",
      "MDUpdateType",
      "AggregatedBook",
      "IncludeNumberOfOrders",
      "IncludeQuotes"
    ]
  },
  {
    "msgtype": "Y",
    "name": "Market Data Request Reject",
    "requiredFields": [
      "MDReqID",
      "Text"
    ],
    "allFields": [
      "MDReqID",
      "SecurityID",
      "Text"
    ]
  },
  {
    "msgtype": "W",
    "name": "Market Data Snapshot",
    "requiredFields": [
      "MDReqID"
    ],
    "allFields": [
      "MDReqID",
      "Symbol",
      "SecurityID",
      "IDSource",
      "Product",
      "CFICode",
      "SecurityType",
      "SecuritySubType",
      "MaturityMonthYear",
      "MaturityDate",
      "MaturityDay",
      "ContractYearMonth",
      "DeliveryTerm",
      "DeliveryDate",
      "PutOrCall",
      "StrikePrice",
      "OptAttribute",
      "SecurityExchange",
      "ExDestination",
      "SecurityDesc",
      "Currency",
      "ExerciseStyle",
      "Timezone",
      "PriceFeedStatus",
      "ExchangeSendingTime",
      "ExchangeTransactTime"
    ]
  },
  {
    "msgtype": "X",
    "name": "Market Data Incremental Refresh",
    "requiredFields": [
      "MDReqID"
    ],
    "allFields": [
      "MDReqID",
      "PriceFeedStatus",
      "ExchangeSendingTime",
      "ExchangeTransactTime",
      "ExchangeSeqNum"
    ]
  },
  {
    "msgtype": "R",
    "name": "Quote Request",
    "requiredFields": [],
    "allFields": [
      "QuoteReqID",
      "SRFQTransType",
      "ValidUntilTime",
      "UserID",
      "Account",
      "NegotiationID",
      "ParentVendorUserID",
      "ParentVendorAccountID",
      "ParentVendorBrokerID",
      "ParentVendorProfileID"
    ]
  },
  {
    "msgtype": "b",
    "name": "Quote Request Response",
    "requiredFields": [],
    "allFields": [
      "QuoteReqID",
      "Account",
      "ExecID",
      "QuoteAckStatus",
      "AccountID",
      "UserID",
      "OrderSource",
      "ManualOrderIndicator",
      "OrderID",
      "OrderOrigination",
      "OrderQty",
      "SecondaryOrderID",
      "SecurityDesc",
      "Side",
      "Text",
      "TransactTime",
      "CustOrderCapacity"
    ]
  },
  {
    "msgtype": "S",
    "name": "Quote",
    "requiredFields": [],
    "allFields": [
      "Account",
      "AccountID",
      "CompanyID",
      "BrokerID",
      "UserID",
      "TTID",
      "ManualOrderIndicator",
      "BidPx",
      "OfferPx",
      "BidSize",
      "OfferSize",
      "ExpireTime",
      "QuoteRefPrice",
      "UnderlyingDeltaPercentage",
      "TargetPartyExchangeTraderID",
      "NegotiationID",
      "QuotingStatus",
      "SecondaryNegotiationID",
      "MktQuoteID",
      "Seq",
      "QuoteReqID",
      "SecondaryQuoteID",
      "TransactTime",
      "LastMkt",
      "Text",
      "Symbol",
      "SecurityID",
      "IDSource",
      "Product",
      "CFICode",
      "SecurityType",
      "SecuritySubType",
      "MaturityMonthYear",
      "MaturityDate",
      "MaturityDay",
      "ContractYearMonth",
      "DeliveryTerm",
      "DeliveryDate",
      "PutOrCall",
      "StrikePrice",
      "OptAttribute",
      "SecurityExchange",
      "ExDestination",
      "SecurityDesc",
      "Currency",
      "ExerciseStyle",
      "Timezone"
    ]
  },
  {
    "msgtype": "AI",
    "name": "Quote Status Report",
    "requiredFields": [],
    "allFields": [
      "QuoteReqID",
      "Account",
      "ExecID",
      "AccountID",
      "CompanyID",
      "BrokerID",
      "UserID",
      "TTID",
      "OrderSource",
      "ManualOrderIndicator",
      "OrderOrigination",
      "OrderQty",
      "Side",
      "Text",
      "TransactTime",
      "CustOrderCapacity",
      "QuoteType",
      "QuoteSubType",
      "QuoteRefPrice",
      "UnderlyingDeltaPercentage",
      "ValidUntilTime",
      "EffectiveTime",
      "LastUpdateTime",
      "BidPx",
      "OfferPx",
      "LastPx",
      "LastShares",
      "LeavesQty",
      "SRFQTransType",
      "NegotiationID",
      "SecondaryNegotiationID",
      "QuoteStatus",
      "Seq",
      "QuoteCondition",
      "LastMkt",
      "Symbol",
      "SecurityID",
      "IDSource",
      "Product",
      "CFICode",
      "SecurityType",
      "SecuritySubType",
      "MaturityMonthYear",
      "MaturityDate",
      "MaturityDay",
      "ContractYearMonth",
      "DeliveryTerm",
      "DeliveryDate",
      "PutOrCall",
      "StrikePrice",
      "OptAttribute",
      "SecurityExchange",
      "ExDestination",
      "SecurityDesc",
      "Currency",
      "ExerciseStyle",
      "Timezone"
    ]
  },
  {
    "msgtype": "AJ",
    "name": "Quote Response",
    "requiredFields": [],
    "allFields": [
      "TradeReportID",
      "NegotiationID",
      "MktQuoteID",
      "TradingSessionSubID",
      "TransBkdTime",
      "ValidUntilTime",
      "OrderCapacity",
      "Account",
      "UserID",
      "CompanyID",
      "BrokerID",
      "TTCustomerName",
      "BidPx",
      "OfferPx",
      "BidSize",
      "OfferSize",
      "LastPx",
      "LastShares",
      "Symbol",
      "SecurityID",
      "IDSource",
      "Product",
      "CFICode",
      "SecurityType",
      "SecuritySubType",
      "MaturityMonthYear",
      "MaturityDate",
      "MaturityDay",
      "ContractYearMonth",
      "DeliveryTerm",
      "DeliveryDate",
      "PutOrCall",
      "StrikePrice",
      "OptAttribute",
      "SecurityExchange",
      "ExDestination",
      "SecurityDesc",
      "Currency",
      "ExerciseStyle",
      "Timezone",
      "HandlInst"
    ]
  },
  {
    "msgtype": "A",
    "name": "Logon",
    "requiredFields": [
      "HeartBtInt"
    ],
    "allFields": [
      "EncryptMethod",
      "HeartBtInt",
      "RawData",
      "ResetSeqNumFlag",
      "NextExpectedMsgSeqNum",
      "ByPassSessionRecovery",
      "Password",
      "StartDate",
      "EndDate",
      "SecurityExchange",
      "ExDestination",
      "CustomMode",
      "Duration"
    ]
  },
  {
    "msgtype": "j",
    "name": "Business Message Reject",
    "requiredFields": [
      "RefMsgType",
      "BusinessRejectReason"
    ],
    "allFields": [
      "RefSeqNum",
      "RefMsgType",
      "BusinessRejectRefID",
      "BusinessRejectReason",
      "Text"
    ]
  },
  {
    "msgtype": "H",
    "name": "Order Status Request",
    "requiredFields": [],
    "allFields": [
      "Account",
      "ClOrdID",
      "OrderID",
      "CompanyID",
      "ClearingAccountOverride",
      "OrdStatusReqID"
    ]
  },
  {
    "msgtype": "AD",
    "name": "Trade Capture Report Request",
    "requiredFields": [
      "SubscriptionRequestType"
    ],
    "allFields": [
      "TradeRequestID",
      "TradeRequestType",
      "SubscriptionRequestType",
      "LastUpdateTime",
      "MultiLegReportingType"
    ]
  },
  {
    "msgtype": "AQ",
    "name": "Trade Capture Report Request Ack",
    "requiredFields": [],
    "allFields": [
      "TradeRequestID",
      "TradeRequestType",
      "TradeRequestResult",
      "TradeRequestStatus",
      "Text"
    ]
  },
  {
    "msgtype": "AE",
    "name": "Trade Capture Report",
    "requiredFields": [],
    "allFields": [
      "TradeReportID",
      "ExecID",
      "SecondaryExecID",
      "ExecType",
      "TradeReportTransType",
      "TradeReportType",
      "TradeHandlingInstr",
      "TrdType",
      "TrdSubType",
      "Price",
      "LastPx",
      "LastShares",
      "LeavesQty",
      "MultiLegReportingType",
      "TradeLinkID",
      "TransactTime",
      "TradeReportRefID",
      "SecondaryTradeReportID",
      "TradeID",
      "OrigTradeID",
      "TrdMatchID",
      "FutureReferencePrice",
      "TradeDate",
      "OrigTradeDate",
      "PreviouslyReported",
      "TransBkdTime",
      "Text",
      "Symbol",
      "SecurityID",
      "IDSource",
      "Product",
      "CFICode",
      "SecurityType",
      "SecuritySubType",
      "MaturityMonthYear",
      "MaturityDate",
      "MaturityDay",
      "ContractYearMonth",
      "DeliveryTerm",
      "DeliveryDate",
      "PutOrCall",
      "StrikePrice",
      "OptAttribute",
      "SecurityExchange",
      "ExDestination",
      "SecurityDesc",
      "Currency",
      "ExerciseStyle",
      "Timezone",
      "AvgPx",
      "TradingVenueRegulatoryTradeID",
      "LastMkt",
      "RoutingAccount",
      "CompanyID",
      "BrokerID",
      "TTCustomerName",
      "Seq",
      "LegFillSeq",
      "UserID",
      "TTID",
      "TradePublishIndicator",
      "OrderCapacity",
      "UnderlyingSymbol",
      "UnderlyingSecurityID",
      "UnderlyingSecurityIDSource",
      "UnderlyingSecurityType",
      "UnderlyingPx",
      "UnderlyingQty",
      "UnderlyingMaturityDate",
      "UnderlyingIssuer",
      "UnderlyingCurrency",
      "UnderlyingMemo",
      "UnderlyingStrikePrice",
      "UnderlyingSpotRate",
      "UnderlyingSecuritySubType",
      "RelatedTradeID",
      "RelatedTradeQty",
      "SettlDate",
      "HedgeType",
      "EchoDC_01",
      "EchoDC_02",
      "EchoDC_03",
      "EchoDC_04",
      "EchoDC_05",
      "EchoDC_06",
      "EchoDC_07",
      "EchoDC_08",
      "EchoDC_09",
      "EchoDC_10",
      "EchoDC_11",
      "EchoDC_12",
      "EchoDC_13",
      "EchoDC_14",
      "EchoDC_15",
      "EchoDC_16",
      "EchoDC_17",
      "EchoDC_18",
      "EchoDC_19",
      "EchoDC_20",
      "TextC",
      "TextTT",
      "TradingSessionSubID",
      "TFUserType",
      "NegotiationID",
      "SecondaryNegotiationID",
      "ExpireTime",
      "IfTouchedPrice",
      "IWouldPrice",
      "LimitPrc",
      "ManualOrderIndicator",
      "UniqueExecID",
      "TrdRptStatus",
      "InsertTime",
      "OneOffSharedKey"
    ]
  },
  {
    "msgtype": "AR",
    "name": "Trade Capture Report Ack",
    "requiredFields": [],
    "allFields": [
      "TradeReportID",
      "TradeReportRefID",
      "SecondaryTradeReportID",
      "ExecType",
      "ExecID",
      "TradeLinkID",
      "TradeReportTransType",
      "TradeReportType",
      "TrdRptStatus",
      "TrdSubType",
      "TradeReportRejectReason",
      "Text",
      "TransactTime",
      "PreviouslyReported",
      "TransBkdTime",
      "Symbol",
      "SecurityID",
      "IDSource",
      "Product",
      "CFICode",
      "SecurityType",
      "SecuritySubType",
      "MaturityMonthYear",
      "MaturityDate",
      "MaturityDay",
      "ContractYearMonth",
      "DeliveryTerm",
      "DeliveryDate",
      "PutOrCall",
      "StrikePrice",
      "OptAttribute",
      "SecurityExchange",
      "ExDestination",
      "SecurityDesc",
      "Currency",
      "ExerciseStyle",
      "Timezone",
      "LastPx",
      "LastShares",
      "TTCustomerName",
      "Seq",
      "CompanyID",
      "BrokerID",
      "UserID",
      "TTID",
      "TradePublishIndicator",
      "OrderCapacity",
      "TrdType",
      "EchoDC_01",
      "EchoDC_02",
      "EchoDC_03",
      "EchoDC_04",
      "EchoDC_05",
      "EchoDC_06",
      "EchoDC_07",
      "EchoDC_08",
      "EchoDC_09",
      "EchoDC_10",
      "EchoDC_11",
      "EchoDC_12",
      "EchoDC_13",
      "EchoDC_14",
      "EchoDC_15",
      "EchoDC_16",
      "EchoDC_17",
      "EchoDC_18",
      "EchoDC_19",
      "EchoDC_20",
      "TextC",
      "TextTT",
      "TradingSessionSubID",
      "TFUserType",
      "NegotiationID",
      "SecondaryNegotiationID",
      "ManualOrderIndicator",
      "RoutingAccount",
      "InsertTime"
    ]
  },
  {
    "msgtype": "B",
    "name": "News",
    "requiredFields": [
      "Headline",
      "LinesOfText",
      "Text"
    ],
    "allFields": [
      "Headline",
      "LinesOfText",
      "Text",
      "NewsReportID"
    ]
  },
  {
    "msgtype": "U2",
    "name": "Out Of Band Recovery Request",
    "requiredFields": [],
    "allFields": [
      "StartDate",
      "EndDate",
      "SecurityExchange",
      "ExDestination",
      "CustomMode",
      "Duration"
    ]
  },
  {
    "msgtype": "Q",
    "name": "Dont Know Trade",
    "requiredFields": [
      "OrderID",
      "ExecID",
      "DKReason"
    ],
    "allFields": [
      "OrderID",
      "ExecID",
      "DKReason",
      "Symbol",
      "SecurityID",
      "IDSource",
      "Product",
      "CFICode",
      "SecurityType",
      "SecuritySubType",
      "MaturityMonthYear",
      "MaturityDate",
      "MaturityDay",
      "ContractYearMonth",
      "DeliveryTerm",
      "DeliveryDate",
      "PutOrCall",
      "StrikePrice",
      "OptAttribute",
      "SecurityExchange",
      "ExDestination",
      "SecurityDesc",
      "Currency",
      "ExerciseStyle",
      "Timezone",
      "Side",
      "OrderQty",
      "LastShares",
      "LastPx",
      "Text"
    ]
  },
  {
    "msgtype": "J",
    "name": "Allocation Instruction",
    "requiredFields": [
      "AllocID",
      "AllocType",
      "AllocNoOrdersType",
      "Side",
      "Quantity",
      "AvgPx",
      "TradeDate"
    ],
    "allFields": [
      "AllocID",
      "AllocTransType",
      "AllocType",
      "AllocLinkID",
      "AllocNoOrdersType",
      "Side",
      "Symbol",
      "SecurityID",
      "IDSource",
      "Product",
      "CFICode",
      "SecurityType",
      "SecuritySubType",
      "MaturityMonthYear",
      "MaturityDate",
      "MaturityDay",
      "ContractYearMonth",
      "DeliveryTerm",
      "DeliveryDate",
      "PutOrCall",
      "StrikePrice",
      "OptAttribute",
      "SecurityExchange",
      "ExDestination",
      "SecurityDesc",
      "Currency",
      "ExerciseStyle",
      "Timezone",
      "Quantity",
      "LastMkt",
      "PriceType",
      "AvgPx",
      "AvgParPx",
      "TradeDate",
      "TransactTime",
      "SettlDate",
      "GrossTradeAmt",
      "NetMoney",
      "OpenClose",
      "Text",
      "Account",
      "AllocStrategy",
      "VendorDefinedField1",
      "VendorDefinedField2",
      "VendorDefinedField3",
      "VendorDefinedField4",
      "VendorDefinedField5",
      "AllocVolumeType"
    ]
  },
  {
    "msgtype": "P",
    "name": "Allocation Instruction Ack",
    "requiredFields": [
      "AllocID",
      "TransactTime",
      "AllocStatus"
    ],
    "allFields": [
      "AllocID",
      "TransactTime",
      "AllocStatus",
      "Text",
      "Account",
      "VendorDefinedField1",
      "VendorDefinedField2",
      "VendorDefinedField3",
      "VendorDefinedField4",
      "VendorDefinedField5"
    ]
  },
  {
    "msgtype": "AS",
    "name": "Allocation Report",
    "requiredFields": [
      "AllocReportID",
      "AllocTransType",
      "AllocReportType",
      "AllocStatus",
      "AllocNoOrdersType",
      "Side",
      "Quantity",
      "AvgPx",
      "TradeDate"
    ],
    "allFields": [
      "AllocReportID",
      "AllocTransType",
      "AllocReportType",
      "AllocStatus",
      "AllocNoOrdersType",
      "Side",
      "Quantity",
      "AvgPx",
      "TradeDate",
      "Text",
      "Account",
      "VendorDefinedField1",
      "VendorDefinedField2",
      "VendorDefinedField3",
      "VendorDefinedField4",
      "VendorDefinedField5",
      "AllocVolumeType",
      "TransactTime"
    ]
  },
  {
    "msgtype": "E",
    "name": "New Order List",
    "requiredFields": [
      "ListID"
    ],
    "allFields": [
      "ListID",
      "ListExecInst"
    ]
  }
]

export const MESSAGES_TT44: MessageDef[] = [
  {
    "msgtype": "0",
    "name": "Heartbeat",
    "requiredFields": [],
    "allFields": [
      "TestReqID"
    ]
  },
  {
    "msgtype": "1",
    "name": "Test Request",
    "requiredFields": [
      "TestReqID"
    ],
    "allFields": [
      "TestReqID"
    ]
  },
  {
    "msgtype": "2",
    "name": "Resend Request",
    "requiredFields": [
      "BeginSeqNo",
      "EndSeqNo"
    ],
    "allFields": [
      "BeginSeqNo",
      "EndSeqNo"
    ]
  },
  {
    "msgtype": "3",
    "name": "Reject",
    "requiredFields": [
      "RefSeqNum"
    ],
    "allFields": [
      "RefSeqNum",
      "RefTagID",
      "RefMsgType",
      "SessionRejectReason",
      "Text",
      "StartSequenceNumber"
    ]
  },
  {
    "msgtype": "4",
    "name": "Sequence Reset",
    "requiredFields": [
      "NewSeqNo"
    ],
    "allFields": [
      "GapFillFlag",
      "NewSeqNo"
    ]
  },
  {
    "msgtype": "5",
    "name": "Logout",
    "requiredFields": [],
    "allFields": [
      "Text",
      "ForceLogout",
      "NextExpectedMsgSeqNum"
    ]
  },
  {
    "msgtype": "8",
    "name": "Execution Report",
    "requiredFields": [
      "OrderID",
      "ExecType",
      "OrdStatus",
      "LeavesQty",
      "CumQty",
      "AvgPx"
    ],
    "allFields": [
      "OrderID",
      "SecondaryOrderID",
      "SecondaryClOrdID",
      "SecondaryExecID",
      "ClOrdID",
      "OrigClOrdID",
      "TTClOrdID",
      "ExecID",
      "ExecTransType",
      "ExecRefID",
      "ExecType",
      "ExecInst",
      "OrdStatus",
      "OrdRejReason",
      "ExecRestatementReason",
      "Account",
      "Symbol",
      "SecurityID",
      "IDSource",
      "Product",
      "CFICode",
      "SecurityType",
      "SecuritySubType",
      "MaturityMonthYear",
      "MaturityDate",
      "MaturityDay",
      "ContractYearMonth",
      "DeliveryTerm",
      "DeliveryDate",
      "PutOrCall",
      "StrikePrice",
      "OptAttribute",
      "SecurityExchange",
      "ExDestination",
      "SecurityDesc",
      "Currency",
      "ExerciseStyle",
      "Timezone",
      "Side",
      "OrderQty",
      "OrdType",
      "Price",
      "StopPx",
      "TimeInForce",
      "ExpireDate",
      "ClearingAccount",
      "LastShares",
      "LastPx",
      "LeavesQty",
      "CumQty",
      "AvgPx",
      "TradeDate",
      "TransactTime",
      "MinQty",
      "LiquidityIndicator",
      "OpenClose",
      "DisplayQty",
      "RefreshQty",
      "Text",
      "MultiLegReportingType",
      "ManualOrderIndicator",
      "ExchCred",
      "OrderCapacity",
      "CustOrderCapacity",
      "ContingencyType",
      "TTID",
      "TrdType",
      "TrdMatchID",
      "CrossID",
      "CrossType",
      "TradeReportID",
      "AOTCPreventionActionType",
      "TotalNumOrders",
      "BrokerID",
      "CompanyID",
      "LastParPx",
      "HandlInst",
      "StagedOrderMsg",
      "StagedOrderOwner",
      "StagedOrderStatus",
      "ExternalSource",
      "AggressorIndicator",
      "EffectiveTime",
      "ExpireTime",
      "TextTTModifyingUser",
      "TargetStrategyName",
      "TargetStrategyType",
      "BracketOrderType",
      "BracketStopLimitOffset",
      "ChildTIF",
      "DiscVal",
      "DiscValType",
      "ETimeAct",
      "Interval",
      "IsTrlTrg",
      "LeftoverAction",
      "LeftoverTicks",
      "LimitPriceType",
      "LimitTicksAway",
      "OcoStopTriggerPrice",
      "ProfitTarget",
      "StopLimitOffset",
      "StopOrderType",
      "StopTarget",
      "TriggerPriceType",
      "TriggerTicksAway",
      "TriggerType",
      "WithATickType",
      "WithATick",
      "AllocID",
      "RefID",
      "ClearingAccountOverride",
      "DropCopyOrder",
      "OrderOrigination",
      "TrdRegPublicationReason",
      "TradingVenueRegulatoryTradeID",
      "LastLiquidityIndicator",
      "OrderIDGUID",
      "TextTT",
      "TextA",
      "TextB",
      "TextC",
      "TimeReceivedFromExchange",
      "EchoDC_01",
      "EchoDC_02",
      "EchoDC_03",
      "EchoDC_04",
      "EchoDC_05",
      "EchoDC_06",
      "EchoDC_07",
      "EchoDC_08",
      "EchoDC_09",
      "EchoDC_10",
      "EchoDC_11",
      "EchoDC_12",
      "EchoDC_13",
      "EchoDC_14",
      "EchoDC_15",
      "EchoDC_16",
      "EchoDC_17",
      "EchoDC_18",
      "EchoDC_19",
      "EchoDC_20",
      "SelfMatchPreventionID",
      "SelfMatchPreventionIDICE",
      "SelfMatchPreventionInstruction",
      "SMPInstruction",
      "OrderSource",
      "UniqueExecID",
      "SpreadLegRatioQty",
      "LastMkt",
      "AccountRiskGroup",
      "MlegHeadExecId",
      "OrdStatusReqID",
      "TTCustomerName",
      "AccountID",
      "UserID",
      "InvestmentDecision",
      "DirectElectronicAccess",
      "TradingCapacity",
      "LiquidityProvision",
      "OriginalSecondaryExecID",
      "MiFIDID",
      "ExecutionDecision",
      "ClientIDCode",
      "TTSyntheticType",
      "VendorDefinedField1",
      "VendorDefinedField2",
      "VendorDefinedField3",
      "VendorDefinedField4",
      "VendorDefinedField5",
      "CustOrderHandlingInst",
      "Organization",
      "MockOrderFlag",
      "MaxShow",
      "ReviewUserID",
      "ReviewStatus",
      "UniqueLegID",
      "OrderRestriction",
      "LeftoverMktOrderLimitTicks",
      "TTStopNoImplies",
      "SecondConditionIsOn",
      "SecondTriggerTicksAway",
      "SecondTriggerQtyType",
      "SecondTriggerQtyCompare",
      "SecondTriggerQty",
      "LeftoverTime",
      "SecondTriggerPriceType",
      "NoImplies",
      "CustomSliceSched",
      "ComplianceText",
      "LastTradingDate",
      "TradingStrategy",
      "ReverseSpreadOC",
      "MaxPart",
      "MaxDisp",
      "TwapStyle",
      "WouldIfPrc",
      "LimitPrc",
      "IntentToCross",
      "TTSMPID",
      "TTSMPInstruction",
      "NVDR",
      "TTF",
      "TFUserType",
      "DynamicEndTime",
      "UnderlyingSymbol",
      "UnderlyingSecurityID",
      "UnderlyingSecurityIDSource",
      "UnderlyingSecurityType",
      "UnderlyingPx",
      "UnderlyingQty",
      "UnderlyingMaturityDate",
      "UnderlyingIssuer",
      "UnderlyingCurrency",
      "UnderlyingMemo",
      "UnderlyingStrikePrice",
      "UnderlyingSpotRate",
      "UnderlyingSecuritySubType",
      "MemoFieldICE",
      "SettlDate",
      "IfTouchedPrice",
      "IWouldPrice",
      "IsFirm",
      "FixingDate",
      "FixingSource",
      "ReportingParty",
      "TradeID",
      "HedgeOrderType",
      "DeltaRounding",
      "Vol",
      "SettlType",
      "QuoteId",
      "LastSpotRate",
      "LastForwardPoints",
      "RejectSource",
      "TotalNumSecurities",
      "InsertTime",
      "BrokerRoute"
    ]
  },
  {
    "msgtype": "9",
    "name": "Order Cancel Reject",
    "requiredFields": [
      "OrderID",
      "OrdStatus",
      "CxlRejResponseTo"
    ],
    "allFields": [
      "OrderID",
      "SecondaryOrderID",
      "ClOrdID",
      "TTClOrdID",
      "OrigClOrdID",
      "OrdStatus",
      "Account",
      "TransactTime",
      "CxlRejResponseTo",
      "CxlRejReason",
      "Text",
      "TTID",
      "AOTCPreventionActionType",
      "BrokerID",
      "CompanyID",
      "HandlInst",
      "StagedOrderMsg",
      "StagedOrderOwner",
      "StagedOrderStatus",
      "ExternalSource",
      "OrderIDGUID",
      "ClearingAccountOverride",
      "TextTT",
      "TextA",
      "TextB",
      "TextC",
      "TimeReceivedFromExchange",
      "EchoDC_01",
      "EchoDC_02",
      "EchoDC_03",
      "EchoDC_04",
      "EchoDC_05",
      "EchoDC_06",
      "EchoDC_07",
      "EchoDC_08",
      "EchoDC_09",
      "EchoDC_10",
      "EchoDC_11",
      "EchoDC_12",
      "EchoDC_13",
      "EchoDC_14",
      "EchoDC_15",
      "EchoDC_16",
      "EchoDC_17",
      "EchoDC_18",
      "EchoDC_19",
      "EchoDC_20",
      "OrderCapacity",
      "OrderOrigination",
      "OrderSource",
      "AccountID",
      "UserID",
      "Symbol",
      "SecurityID",
      "IDSource",
      "Product",
      "CFICode",
      "SecurityType",
      "SecuritySubType",
      "MaturityMonthYear",
      "MaturityDate",
      "MaturityDay",
      "ContractYearMonth",
      "DeliveryTerm",
      "DeliveryDate",
      "PutOrCall",
      "StrikePrice",
      "OptAttribute",
      "SecurityExchange",
      "ExDestination",
      "SecurityDesc",
      "Currency",
      "ExerciseStyle",
      "Timezone",
      "LastMkt",
      "AllocID",
      "CustOrderHandlingInst",
      "TTSyntheticType",
      "TTCustomerName",
      "Organization",
      "MockOrderFlag",
      "ExchCred",
      "MaxShow",
      "UniqueLegID",
      "TTStopNoImplies",
      "SecondConditionIsOn",
      "SecondTriggerTicksAway",
      "SecondTriggerQtyType",
      "SecondTriggerQtyCompare",
      "SecondTriggerQty",
      "LeftoverTime",
      "SecondTriggerPriceType",
      "NoImplies",
      "CustomSliceSched",
      "ComplianceText",
      "TTSMPID",
      "TTSMPInstruction",
      "TFUserType",
      "NVDR",
      "TTF",
      "DynamicEndTime",
      "HedgeOrderType",
      "DeltaRounding",
      "Vol",
      "SelfMatchPreventionID",
      "RejectSource",
      "InsertTime",
      "BrokerRoute"
    ]
  },
  {
    "msgtype": "AB",
    "name": "New Order Multileg",
    "requiredFields": [
      "ClOrdID",
      "Account",
      "OrderQty",
      "Side",
      "OrdType"
    ],
    "allFields": [
      "ClOrdID",
      "TransactTime",
      "Symbol",
      "SecurityID",
      "IDSource",
      "Product",
      "CFICode",
      "SecurityType",
      "SecuritySubType",
      "MaturityMonthYear",
      "MaturityDate",
      "MaturityDay",
      "ContractYearMonth",
      "DeliveryTerm",
      "DeliveryDate",
      "PutOrCall",
      "StrikePrice",
      "OptAttribute",
      "SecurityExchange",
      "ExDestination",
      "SecurityDesc",
      "Currency",
      "ExerciseStyle",
      "Timezone",
      "Account",
      "SecondaryAccount",
      "Price",
      "StopPx",
      "OrderQty",
      "MinQty",
      "DisplayQty",
      "Side",
      "OrdType",
      "OpenClose",
      "TimeInForce",
      "ExpireDate",
      "ExecInst",
      "ManualOrderIndicator",
      "ClearingAccountOverride",
      "TextTT",
      "TextA",
      "TextB",
      "TextC",
      "EchoDC_01",
      "EchoDC_02",
      "EchoDC_03",
      "EchoDC_04",
      "EchoDC_05",
      "EchoDC_06",
      "EchoDC_07",
      "EchoDC_08",
      "EchoDC_09",
      "EchoDC_10",
      "EchoDC_11",
      "EchoDC_12",
      "EchoDC_13",
      "EchoDC_14",
      "EchoDC_15",
      "EchoDC_16",
      "EchoDC_17",
      "EchoDC_18",
      "EchoDC_19",
      "EchoDC_20",
      "TargetStrategyName",
      "TargetStrategyType",
      "ContingencyType",
      "HandlInst",
      "StagedOrderMsg",
      "CompanyID",
      "Text",
      "DropCopyOrder",
      "OrderOrigination",
      "OrderCapacity",
      "CustOrderCapacity",
      "SelfMatchPreventionID",
      "SMPInstruction",
      "OrderSource",
      "OrderID",
      "TTCustomerName",
      "BrokerID",
      "LastMkt",
      "ExpireTime",
      "EffectiveTime",
      "CustOrderHandlingInst",
      "TTSyntheticType",
      "Organization",
      "MockOrderFlag",
      "UserID",
      "OrderRestriction",
      "WaitingOption",
      "ChildTIF",
      "LeftoverMktOrderLimitTicks",
      "TTStopNoImplies",
      "SecondConditionIsOn",
      "SecondTriggerTicksAway",
      "SecondTriggerQtyType",
      "SecondTriggerQtyCompare",
      "SecondTriggerQty",
      "LeftoverTime",
      "SecondTriggerPriceType",
      "NoImplies",
      "CustomSliceSched",
      "ComplianceText",
      "TradingStrategy",
      "ReverseSpreadOC",
      "ParentVendorOrderID",
      "ParentVendorUserID",
      "ParentVendorAccountID",
      "ParentVendorBrokerID",
      "ParentVendorProfileID",
      "MaxPart",
      "MaxDisp",
      "TwapStyle",
      "WouldIfPrc",
      "LimitPrc",
      "IntentToCross",
      "TFUserType",
      "DynamicEndTime",
      "ParentVendorAlgoID",
      "ParentVendorAlgoType",
      "PriceFormula",
      "ReloadOffset",
      "OverrideTickNumerator",
      "FormulaBasedOn",
      "ReloadDelay",
      "DisclosedQty",
      "Reload",
      "OverrideTickSize",
      "OverrideTickDenominator",
      "IsShared",
      "SubStrategy",
      "LegRiskAversion",
      "HedgeDiscretionTicks",
      "TTSMPID",
      "TTSMPInstruction",
      "IfTouchedPrice",
      "IWouldPrice",
      "HedgeOrderType",
      "DeltaRounding",
      "Vol",
      "QuoteId",
      "BrokerRoute"
    ]
  },
  {
    "msgtype": "D",
    "name": "New Order Single",
    "requiredFields": [
      "ClOrdID",
      "Account",
      "OrderQty",
      "Side",
      "OrdType"
    ],
    "allFields": [
      "ClOrdID",
      "Symbol",
      "SecurityID",
      "IDSource",
      "Product",
      "CFICode",
      "SecurityType",
      "SecuritySubType",
      "MaturityMonthYear",
      "MaturityDate",
      "MaturityDay",
      "ContractYearMonth",
      "DeliveryTerm",
      "DeliveryDate",
      "PutOrCall",
      "StrikePrice",
      "OptAttribute",
      "SecurityExchange",
      "ExDestination",
      "SecurityDesc",
      "Currency",
      "ExerciseStyle",
      "Timezone",
      "Account",
      "SecondaryAccount",
      "Price",
      "StopPx",
      "OrderQty",
      "MinQty",
      "DisplayQty",
      "Side",
      "OrdType",
      "OpenClose",
      "TimeInForce",
      "ExpireDate",
      "ExecInst",
      "ContingencyType",
      "TransactTime",
      "ManualOrderIndicator",
      "HandlInst",
      "StagedOrderMsg",
      "CompanyID",
      "EffectiveTime",
      "ExpireTime",
      "TextA",
      "TextB",
      "TargetStrategyName",
      "TargetStrategyType",
      "BracketOrderType",
      "BracketStopLimitOffset",
      "ChildTIF",
      "DiscVal",
      "DiscValType",
      "ETimeAct",
      "Interval",
      "IsTrlTrg",
      "LeftoverAction",
      "LeftoverTicks",
      "LimitPriceType",
      "LimitTicksAway",
      "OcoStopTriggerPrice",
      "ProfitTarget",
      "StopLimitOffset",
      "StopOrderType",
      "StopTarget",
      "TriggerPriceType",
      "TriggerTicksAway",
      "TriggerType",
      "WithATickType",
      "WithATick",
      "TriggerQtyType",
      "TriggerQtyCompare",
      "TriggerQty",
      "TriggerLTPReset",
      "TTStopLimitPriceType",
      "TTStopWithATickType",
      "TTStopWithATick",
      "Payup",
      "TTStopTriggerPriceType",
      "TTStopIsTrlTrg",
      "TTStopTriggerTicksAway",
      "TTStopTriggerQtyType",
      "TTStopTriggerQTyCompare",
      "TTStopTriggerQty",
      "TTStopTriggerLTPReset",
      "TTStopTriggeredOrderType",
      "TTStopTriggeredOrderPrice",
      "TTStopLimitTicksAway",
      "TTStopPayup",
      "Text",
      "ClearingAccountOverride",
      "DropCopyOrder",
      "OrderOrigination",
      "OrderCapacity",
      "CustOrderCapacity",
      "TextTT",
      "TextC",
      "EchoDC_01",
      "EchoDC_02",
      "EchoDC_03",
      "EchoDC_04",
      "EchoDC_05",
      "EchoDC_06",
      "EchoDC_07",
      "EchoDC_08",
      "EchoDC_09",
      "EchoDC_10",
      "EchoDC_11",
      "EchoDC_12",
      "EchoDC_13",
      "EchoDC_14",
      "EchoDC_15",
      "EchoDC_16",
      "EchoDC_17",
      "EchoDC_18",
      "EchoDC_19",
      "EchoDC_20",
      "SelfMatchPreventionID",
      "SMPInstruction",
      "Duration",
      "DurationBaseUnit",
      "DurationSTime",
      "DurationETime",
      "LeftoverTimeAction",
      "AutoResubExpiredGTD",
      "ParentTIF",
      "TTStopSecondConditionIsOn",
      "TTStopSecondTriggerPriceType",
      "TTStopSecondConditionIsTrlTrg",
      "TTStopSecondTriggerTicksAway",
      "TTStopSecondTriggerQtyType",
      "TTStopSecondTriggerQtyCompare",
      "TTStopSecondTriggerQty",
      "Variance",
      "OrderSource",
      "OrderID",
      "TTCustomerName",
      "BrokerID",
      "LastMkt",
      "ETAGoToMktTicks",
      "WaitingOption",
      "TTStopChildTIFOverride",
      "CustOrderHandlingInst",
      "TTSyntheticType",
      "Organization",
      "MockOrderFlag",
      "OrderRestriction",
      "UserID",
      "TTStopNoImplies",
      "SecondConditionIsOn",
      "SecondTriggerTicksAway",
      "SecondTriggerQtyType",
      "SecondTriggerQtyCompare",
      "SecondTriggerQty",
      "LeftoverTime",
      "SecondTriggerPriceType",
      "NoImplies",
      "CustomSliceSched",
      "LeftoverMktOrderLimitTicks",
      "ComplianceText",
      "TradingStrategy",
      "ReverseSpreadOC",
      "ParentVendorOrderID",
      "ParentVendorUserID",
      "ParentVendorAccountID",
      "ParentVendorBrokerID",
      "ParentVendorProfileID",
      "MaxPart",
      "MaxDisp",
      "TwapStyle",
      "WouldIfPrc",
      "LimitPrc",
      "IntentToCross",
      "TFUserType",
      "DynamicEndTime",
      "ParentVendorAlgoID",
      "ParentVendorAlgoType",
      "TTSMPID",
      "TTSMPInstruction",
      "IfTouchedPrice",
      "IWouldPrice",
      "HedgeOrderType",
      "DeltaRounding",
      "Vol",
      "QuoteId",
      "BrokerRoute"
    ]
  },
  {
    "msgtype": "AC",
    "name": "Multileg Order Cancel Replace",
    "requiredFields": [
      "ClOrdID",
      "Account",
      "OrderQty",
      "Side",
      "OrdType"
    ],
    "allFields": [
      "OrderID",
      "OrderIDGUID",
      "OrigClOrdID",
      "ClOrdID",
      "Account",
      "Price",
      "StopPx",
      "Symbol",
      "SecurityID",
      "IDSource",
      "Product",
      "CFICode",
      "SecurityType",
      "SecuritySubType",
      "MaturityMonthYear",
      "MaturityDate",
      "MaturityDay",
      "ContractYearMonth",
      "DeliveryTerm",
      "DeliveryDate",
      "PutOrCall",
      "StrikePrice",
      "OptAttribute",
      "SecurityExchange",
      "ExDestination",
      "SecurityDesc",
      "Currency",
      "ExerciseStyle",
      "Timezone",
      "OrderQty",
      "MinQty",
      "DisplayQty",
      "Side",
      "OrdType",
      "OpenClose",
      "TimeInForce",
      "ExpireDate",
      "ExecInst",
      "TransactTime",
      "ManualOrderIndicator",
      "ClearingAccountOverride",
      "TextA",
      "TextB",
      "HandlInst",
      "StagedOrderMsg",
      "Text",
      "DropCopyOrder",
      "OrderCapacity",
      "CustOrderCapacity",
      "OrderOrigination",
      "TextTT",
      "TextC",
      "EchoDC_01",
      "EchoDC_02",
      "EchoDC_03",
      "EchoDC_04",
      "EchoDC_05",
      "EchoDC_06",
      "EchoDC_07",
      "EchoDC_08",
      "EchoDC_09",
      "EchoDC_10",
      "EchoDC_11",
      "EchoDC_12",
      "EchoDC_13",
      "EchoDC_14",
      "EchoDC_15",
      "EchoDC_16",
      "EchoDC_17",
      "EchoDC_18",
      "EchoDC_19",
      "EchoDC_20",
      "SelfMatchPreventionID",
      "SMPInstruction",
      "OrderSource",
      "CompanyID",
      "TTCustomerName",
      "LastMkt",
      "ExpireTime",
      "CustOrderHandlingInst",
      "TTSyntheticType",
      "Organization",
      "MockOrderFlag",
      "OrderRestriction",
      "WaitingOption",
      "ChildTIF",
      "LeftoverMktOrderLimitTicks",
      "UserID",
      "TTStopNoImplies",
      "SecondConditionIsOn",
      "SecondTriggerTicksAway",
      "SecondTriggerQtyType",
      "SecondTriggerQtyCompare",
      "SecondTriggerQty",
      "LeftoverTime",
      "SecondTriggerPriceType",
      "NoImplies",
      "CustomSliceSched",
      "ComplianceText",
      "TradingStrategy",
      "ReverseSpreadOC",
      "ParentVendorOrderID",
      "ParentVendorUserID",
      "ParentVendorAccountID",
      "ParentVendorBrokerID",
      "ParentVendorProfileID",
      "MaxPart",
      "MaxDisp",
      "TwapStyle",
      "WouldIfPrc",
      "LimitPrc",
      "IntentToCross",
      "DynamicEndTime",
      "ParentVendorAlgoID",
      "ParentVendorAlgoType",
      "BrokerID",
      "HedgeOrderType",
      "DeltaRounding",
      "Vol",
      "BrokerRoute"
    ]
  },
  {
    "msgtype": "G",
    "name": "Order Cancel Replace Request",
    "requiredFields": [
      "ClOrdID",
      "Account",
      "OrderQty",
      "Side",
      "OrdType"
    ],
    "allFields": [
      "OrderID",
      "OrderIDGUID",
      "OrigClOrdID",
      "ClOrdID",
      "Account",
      "Price",
      "StopPx",
      "Symbol",
      "SecurityID",
      "IDSource",
      "Product",
      "CFICode",
      "SecurityType",
      "SecuritySubType",
      "MaturityMonthYear",
      "MaturityDate",
      "MaturityDay",
      "ContractYearMonth",
      "DeliveryTerm",
      "DeliveryDate",
      "PutOrCall",
      "StrikePrice",
      "OptAttribute",
      "SecurityExchange",
      "ExDestination",
      "SecurityDesc",
      "Currency",
      "ExerciseStyle",
      "Timezone",
      "OrderQty",
      "MinQty",
      "DisplayQty",
      "Side",
      "OrdType",
      "OpenClose",
      "TimeInForce",
      "ExpireDate",
      "ExecInst",
      "TransactTime",
      "ManualOrderIndicator",
      "TextA",
      "TextB",
      "HandlInst",
      "StagedOrderMsg",
      "Text",
      "BracketOrderType",
      "BracketStopLimitOffset",
      "ChildTIF",
      "DiscVal",
      "DiscValType",
      "ETimeAct",
      "Interval",
      "IsTrlTrg",
      "LeftoverAction",
      "LeftoverTicks",
      "LimitPriceType",
      "LimitTicksAway",
      "OcoStopTriggerPrice",
      "ProfitTarget",
      "StopLimitOffset",
      "StopOrderType",
      "StopTarget",
      "TriggerPriceType",
      "TriggerTicksAway",
      "TriggerType",
      "WithATickType",
      "WithATick",
      "TriggerQtyType",
      "TriggerQtyCompare",
      "TriggerQty",
      "TriggerLTPReset",
      "TTStopLimitPriceType",
      "TTStopWithATickType",
      "TTStopWithATick",
      "Payup",
      "TTStopTriggerPriceType",
      "TTStopIsTrlTrg",
      "TTStopTriggerTicksAway",
      "TTStopTriggerQtyType",
      "TTStopTriggerQTyCompare",
      "TTStopTriggerQty",
      "TTStopTriggerLTPReset",
      "TTStopTriggeredOrderType",
      "TTStopTriggeredOrderPrice",
      "TTStopLimitTicksAway",
      "TTStopPayup",
      "ClearingAccountOverride",
      "DropCopyOrder",
      "OrderCapacity",
      "CustOrderCapacity",
      "OrderOrigination",
      "TextTT",
      "TextC",
      "EchoDC_01",
      "EchoDC_02",
      "EchoDC_03",
      "EchoDC_04",
      "EchoDC_05",
      "EchoDC_06",
      "EchoDC_07",
      "EchoDC_08",
      "EchoDC_09",
      "EchoDC_10",
      "EchoDC_11",
      "EchoDC_12",
      "EchoDC_13",
      "EchoDC_14",
      "EchoDC_15",
      "EchoDC_16",
      "EchoDC_17",
      "EchoDC_18",
      "EchoDC_19",
      "EchoDC_20",
      "SelfMatchPreventionID",
      "SMPInstruction",
      "Duration",
      "DurationBaseUnit",
      "DurationSTime",
      "DurationETime",
      "CompanyID",
      "LeftoverTimeAction",
      "AutoResubExpiredGTD",
      "ParentTIF",
      "TTStopSecondConditionIsOn",
      "TTStopSecondTriggerPriceType",
      "TTStopSecondConditionIsTrlTrg",
      "TTStopSecondTriggerTicksAway",
      "TTStopSecondTriggerQtyType",
      "TTStopSecondTriggerQtyCompare",
      "TTStopSecondTriggerQty",
      "Variance",
      "OrderSource",
      "TTCustomerName",
      "LastMkt",
      "ExpireTime",
      "CustOrderHandlingInst",
      "TTSyntheticType",
      "Organization",
      "MockOrderFlag",
      "UserID",
      "OrderRestriction",
      "WaitingOption",
      "LeftoverMktOrderLimitTicks",
      "TTStopNoImplies",
      "SecondConditionIsOn",
      "SecondTriggerTicksAway",
      "SecondTriggerQtyType",
      "SecondTriggerQtyCompare",
      "SecondTriggerQty",
      "LeftoverTime",
      "SecondTriggerPriceType",
      "NoImplies",
      "CustomSliceSched",
      "ComplianceText",
      "TradingStrategy",
      "ReverseSpreadOC",
      "ParentVendorOrderID",
      "ParentVendorUserID",
      "ParentVendorAccountID",
      "ParentVendorBrokerID",
      "ParentVendorProfileID",
      "MaxPart",
      "MaxDisp",
      "TwapStyle",
      "WouldIfPrc",
      "LimitPrc",
      "IntentToCross",
      "DynamicEndTime",
      "ParentVendorAlgoID",
      "ParentVendorAlgoType",
      "BrokerID",
      "IfTouchedPrice",
      "IWouldPrice",
      "HedgeOrderType",
      "DeltaRounding",
      "Vol",
      "BrokerRoute"
    ]
  },
  {
    "msgtype": "F",
    "name": "Order Cancel Request",
    "requiredFields": [
      "ClOrdID"
    ],
    "allFields": [
      "ClOrdID",
      "OrderID",
      "OrderIDGUID",
      "OrigClOrdID",
      "ManualOrderIndicator",
      "Symbol",
      "SecurityID",
      "IDSource",
      "Product",
      "CFICode",
      "SecurityType",
      "SecuritySubType",
      "MaturityMonthYear",
      "MaturityDate",
      "MaturityDay",
      "ContractYearMonth",
      "DeliveryTerm",
      "DeliveryDate",
      "PutOrCall",
      "StrikePrice",
      "OptAttribute",
      "SecurityExchange",
      "ExDestination",
      "SecurityDesc",
      "Currency",
      "ExerciseStyle",
      "Timezone",
      "Text",
      "ClearingAccountOverride",
      "TransactTime",
      "DropCopyOrder",
      "TextTT",
      "OrderOrigination",
      "TextC",
      "EchoDC_01",
      "EchoDC_02",
      "EchoDC_03",
      "EchoDC_04",
      "EchoDC_05",
      "EchoDC_06",
      "EchoDC_07",
      "EchoDC_08",
      "EchoDC_09",
      "EchoDC_10",
      "EchoDC_11",
      "EchoDC_12",
      "EchoDC_13",
      "EchoDC_14",
      "EchoDC_15",
      "EchoDC_16",
      "EchoDC_17",
      "EchoDC_18",
      "EchoDC_19",
      "EchoDC_20",
      "CompanyID",
      "OrderSource",
      "LastMkt",
      "StagedOrderMsg",
      "TTSyntheticType",
      "CustOrderHandlingInst",
      "Organization",
      "MockOrderFlag",
      "UserID",
      "Account",
      "OrderRestriction",
      "TTStopNoImplies",
      "SecondConditionIsOn",
      "SecondTriggerTicksAway",
      "SecondTriggerQtyType",
      "SecondTriggerQtyCompare",
      "SecondTriggerQty",
      "LeftoverTime",
      "SecondTriggerPriceType",
      "NoImplies",
      "CustomSliceSched",
      "ComplianceText",
      "ParentVendorOrderID",
      "ParentVendorUserID",
      "ParentVendorAccountID",
      "ParentVendorBrokerID",
      "ParentVendorProfileID",
      "DynamicEndTime",
      "ParentVendorAlgoID",
      "ParentVendorAlgoType",
      "BrokerID",
      "HedgeOrderType",
      "DeltaRounding",
      "Vol",
      "BrokerRoute",
      "Side"
    ]
  },
  {
    "msgtype": "c",
    "name": "Security Definition Request",
    "requiredFields": [
      "SecurityReqID"
    ],
    "allFields": [
      "SecurityReqID",
      "SecurityRequestType",
      "RequestTickTable",
      "Symbol",
      "SecurityID",
      "IDSource",
      "Product",
      "CFICode",
      "SecurityType",
      "SecuritySubType",
      "MaturityMonthYear",
      "MaturityDate",
      "MaturityDay",
      "ContractYearMonth",
      "DeliveryTerm",
      "DeliveryDate",
      "PutOrCall",
      "StrikePrice",
      "OptAttribute",
      "SecurityExchange",
      "ExDestination",
      "SecurityDesc",
      "Currency",
      "ExerciseStyle",
      "Timezone",
      "Account",
      "ParentVendorUserID",
      "ParentVendorAccountID",
      "ParentVendorBrokerID",
      "ParentVendorProfileID",
      "Text"
    ]
  },
  {
    "msgtype": "d",
    "name": "Security Definition",
    "requiredFields": [
      "SecurityReqID",
      "SecurityResponseID",
      "SecurityResponseType",
      "TotalNumSecurities"
    ],
    "allFields": [
      "SecurityReqID",
      "SecurityResponseID",
      "SecurityResponseType",
      "TotalNumSecurities",
      "Symbol",
      "SecurityID",
      "IDSource",
      "Product",
      "CFICode",
      "SecurityType",
      "SecuritySubType",
      "MaturityMonthYear",
      "MaturityDate",
      "MaturityDay",
      "ContractYearMonth",
      "DeliveryTerm",
      "DeliveryDate",
      "PutOrCall",
      "StrikePrice",
      "OptAttribute",
      "SecurityExchange",
      "ExDestination",
      "SecurityDesc",
      "Currency",
      "ExerciseStyle",
      "Timezone",
      "DisplayFactor",
      "Text",
      "MinLotSize",
      "NumberOfBlocks",
      "TradesInFlow",
      "ExchTickSize",
      "ExchPointValue",
      "PriceDisplayType",
      "RoundLot",
      "UnderlyingSymbol",
      "UnderlyingSecurityID",
      "UnderlyingSecurityIDSource",
      "UnderlyingSecurityType",
      "UnderlyingPx",
      "UnderlyingQty",
      "UnderlyingMaturityDate",
      "UnderlyingIssuer",
      "UnderlyingCurrency",
      "UnderlyingMemo",
      "UnderlyingStrikePrice",
      "UnderlyingSpotRate",
      "UnderlyingSecuritySubType",
      "DisplayFactorQty",
      "ProductComplex",
      "DefSecuritySubTypeID"
    ]
  },
  {
    "msgtype": "e",
    "name": "Security Status Request",
    "requiredFields": [
      "SecurityStatusReqID",
      "SubscriptionRequestType"
    ],
    "allFields": [
      "SecurityStatusReqID",
      "SubscriptionRequestType",
      "Symbol",
      "SecurityID",
      "IDSource",
      "Product",
      "CFICode",
      "SecurityType",
      "SecuritySubType",
      "MaturityMonthYear",
      "MaturityDate",
      "MaturityDay",
      "ContractYearMonth",
      "DeliveryTerm",
      "DeliveryDate",
      "PutOrCall",
      "StrikePrice",
      "OptAttribute",
      "SecurityExchange",
      "ExDestination",
      "SecurityDesc",
      "Currency",
      "ExerciseStyle",
      "Timezone"
    ]
  },
  {
    "msgtype": "f",
    "name": "Security Status",
    "requiredFields": [
      "SecurityStatusReqID",
      "SecurityTradingStatus"
    ],
    "allFields": [
      "SecurityStatusReqID",
      "Symbol",
      "SecurityID",
      "IDSource",
      "Product",
      "CFICode",
      "SecurityType",
      "SecuritySubType",
      "MaturityMonthYear",
      "MaturityDate",
      "MaturityDay",
      "ContractYearMonth",
      "DeliveryTerm",
      "DeliveryDate",
      "PutOrCall",
      "StrikePrice",
      "OptAttribute",
      "SecurityExchange",
      "ExDestination",
      "SecurityDesc",
      "Currency",
      "ExerciseStyle",
      "Timezone",
      "SecurityTradingStatus",
      "Text"
    ]
  },
  {
    "msgtype": "V",
    "name": "Market Data Request",
    "requiredFields": [
      "MDReqID",
      "SubscriptionRequestType"
    ],
    "allFields": [
      "MDReqID",
      "SubscriptionRequestType",
      "MarketDepth",
      "MDUpdateType",
      "AggregatedBook",
      "IncludeNumberOfOrders",
      "IncludeQuotes"
    ]
  },
  {
    "msgtype": "Y",
    "name": "Market Data Request Reject",
    "requiredFields": [
      "MDReqID",
      "Text"
    ],
    "allFields": [
      "MDReqID",
      "SecurityID",
      "Text"
    ]
  },
  {
    "msgtype": "W",
    "name": "Market Data Snapshot",
    "requiredFields": [
      "MDReqID"
    ],
    "allFields": [
      "MDReqID",
      "Symbol",
      "SecurityID",
      "IDSource",
      "Product",
      "CFICode",
      "SecurityType",
      "SecuritySubType",
      "MaturityMonthYear",
      "MaturityDate",
      "MaturityDay",
      "ContractYearMonth",
      "DeliveryTerm",
      "DeliveryDate",
      "PutOrCall",
      "StrikePrice",
      "OptAttribute",
      "SecurityExchange",
      "ExDestination",
      "SecurityDesc",
      "Currency",
      "ExerciseStyle",
      "Timezone",
      "PriceFeedStatus",
      "ExchangeSendingTime",
      "ExchangeTransactTime"
    ]
  },
  {
    "msgtype": "X",
    "name": "Market Data Incremental Refresh",
    "requiredFields": [
      "MDReqID"
    ],
    "allFields": [
      "MDReqID",
      "PriceFeedStatus",
      "ExchangeSendingTime",
      "ExchangeTransactTime",
      "ExchangeSeqNum"
    ]
  },
  {
    "msgtype": "R",
    "name": "Quote Request",
    "requiredFields": [],
    "allFields": [
      "QuoteReqID",
      "SRFQTransType",
      "ValidUntilTime",
      "UserID",
      "Account",
      "NegotiationID",
      "ParentVendorUserID",
      "ParentVendorAccountID",
      "ParentVendorBrokerID",
      "ParentVendorProfileID"
    ]
  },
  {
    "msgtype": "b",
    "name": "Quote Request Response",
    "requiredFields": [],
    "allFields": [
      "QuoteReqID",
      "Account",
      "ExecID",
      "QuoteAckStatus",
      "AccountID",
      "UserID",
      "OrderSource",
      "ManualOrderIndicator",
      "OrderID",
      "OrderOrigination",
      "OrderQty",
      "SecondaryOrderID",
      "SecurityDesc",
      "Side",
      "Text",
      "TransactTime",
      "CustOrderCapacity"
    ]
  },
  {
    "msgtype": "S",
    "name": "Quote",
    "requiredFields": [],
    "allFields": [
      "Account",
      "AccountID",
      "CompanyID",
      "BrokerID",
      "UserID",
      "TTID",
      "ManualOrderIndicator",
      "BidPx",
      "OfferPx",
      "BidSize",
      "OfferSize",
      "ExpireTime",
      "QuoteRefPrice",
      "UnderlyingDeltaPercentage",
      "TargetPartyExchangeTraderID",
      "NegotiationID",
      "QuotingStatus",
      "SecondaryNegotiationID",
      "MktQuoteID",
      "Seq",
      "QuoteReqID",
      "SecondaryQuoteID",
      "TransactTime",
      "LastMkt",
      "Text",
      "Symbol",
      "SecurityID",
      "IDSource",
      "Product",
      "CFICode",
      "SecurityType",
      "SecuritySubType",
      "MaturityMonthYear",
      "MaturityDate",
      "MaturityDay",
      "ContractYearMonth",
      "DeliveryTerm",
      "DeliveryDate",
      "PutOrCall",
      "StrikePrice",
      "OptAttribute",
      "SecurityExchange",
      "ExDestination",
      "SecurityDesc",
      "Currency",
      "ExerciseStyle",
      "Timezone"
    ]
  },
  {
    "msgtype": "AI",
    "name": "Quote Status Report",
    "requiredFields": [],
    "allFields": [
      "QuoteReqID",
      "Account",
      "ExecID",
      "AccountID",
      "CompanyID",
      "BrokerID",
      "UserID",
      "TTID",
      "OrderSource",
      "ManualOrderIndicator",
      "OrderOrigination",
      "OrderQty",
      "Side",
      "Text",
      "TransactTime",
      "CustOrderCapacity",
      "QuoteType",
      "QuoteSubType",
      "QuoteRefPrice",
      "UnderlyingDeltaPercentage",
      "ValidUntilTime",
      "EffectiveTime",
      "LastUpdateTime",
      "BidPx",
      "OfferPx",
      "LastPx",
      "LastShares",
      "LeavesQty",
      "SRFQTransType",
      "NegotiationID",
      "SecondaryNegotiationID",
      "QuoteStatus",
      "Seq",
      "QuoteCondition",
      "LastMkt",
      "Symbol",
      "SecurityID",
      "IDSource",
      "Product",
      "CFICode",
      "SecurityType",
      "SecuritySubType",
      "MaturityMonthYear",
      "MaturityDate",
      "MaturityDay",
      "ContractYearMonth",
      "DeliveryTerm",
      "DeliveryDate",
      "PutOrCall",
      "StrikePrice",
      "OptAttribute",
      "SecurityExchange",
      "ExDestination",
      "SecurityDesc",
      "Currency",
      "ExerciseStyle",
      "Timezone"
    ]
  },
  {
    "msgtype": "AJ",
    "name": "Quote Response",
    "requiredFields": [],
    "allFields": [
      "TradeReportID",
      "NegotiationID",
      "MktQuoteID",
      "TradingSessionSubID",
      "TransBkdTime",
      "ValidUntilTime",
      "OrderCapacity",
      "Account",
      "UserID",
      "CompanyID",
      "BrokerID",
      "TTCustomerName",
      "BidPx",
      "OfferPx",
      "BidSize",
      "OfferSize",
      "LastPx",
      "LastShares",
      "Symbol",
      "SecurityID",
      "IDSource",
      "Product",
      "CFICode",
      "SecurityType",
      "SecuritySubType",
      "MaturityMonthYear",
      "MaturityDate",
      "MaturityDay",
      "ContractYearMonth",
      "DeliveryTerm",
      "DeliveryDate",
      "PutOrCall",
      "StrikePrice",
      "OptAttribute",
      "SecurityExchange",
      "ExDestination",
      "SecurityDesc",
      "Currency",
      "ExerciseStyle",
      "Timezone",
      "HandlInst"
    ]
  },
  {
    "msgtype": "A",
    "name": "Logon",
    "requiredFields": [
      "HeartBtInt"
    ],
    "allFields": [
      "EncryptMethod",
      "HeartBtInt",
      "RawData",
      "ResetSeqNumFlag",
      "NextExpectedMsgSeqNum",
      "ByPassSessionRecovery",
      "Password",
      "StartDate",
      "EndDate",
      "SecurityExchange",
      "ExDestination",
      "CustomMode",
      "Duration"
    ]
  },
  {
    "msgtype": "j",
    "name": "Business Message Reject",
    "requiredFields": [
      "RefMsgType",
      "BusinessRejectReason"
    ],
    "allFields": [
      "RefSeqNum",
      "RefMsgType",
      "BusinessRejectRefID",
      "BusinessRejectReason",
      "Text"
    ]
  },
  {
    "msgtype": "H",
    "name": "Order Status Request",
    "requiredFields": [],
    "allFields": [
      "Account",
      "ClOrdID",
      "OrderID",
      "CompanyID",
      "ClearingAccountOverride",
      "OrdStatusReqID"
    ]
  },
  {
    "msgtype": "AD",
    "name": "Trade Capture Report Request",
    "requiredFields": [
      "SubscriptionRequestType"
    ],
    "allFields": [
      "TradeRequestID",
      "TradeRequestType",
      "SubscriptionRequestType",
      "LastUpdateTime",
      "MultiLegReportingType"
    ]
  },
  {
    "msgtype": "AQ",
    "name": "Trade Capture Report Request Ack",
    "requiredFields": [],
    "allFields": [
      "TradeRequestID",
      "TradeRequestType",
      "TradeRequestResult",
      "TradeRequestStatus",
      "Text"
    ]
  },
  {
    "msgtype": "AE",
    "name": "Trade Capture Report",
    "requiredFields": [],
    "allFields": [
      "TradeReportID",
      "ExecID",
      "SecondaryExecID",
      "ExecType",
      "TradeReportTransType",
      "TradeReportType",
      "TradeHandlingInstr",
      "TrdType",
      "TrdSubType",
      "Price",
      "LastPx",
      "LastShares",
      "LeavesQty",
      "MultiLegReportingType",
      "TradeLinkID",
      "TransactTime",
      "TradeReportRefID",
      "SecondaryTradeReportID",
      "TradeID",
      "OrigTradeID",
      "TrdMatchID",
      "FutureReferencePrice",
      "TradeDate",
      "OrigTradeDate",
      "PreviouslyReported",
      "TransBkdTime",
      "Text",
      "Symbol",
      "SecurityID",
      "IDSource",
      "Product",
      "CFICode",
      "SecurityType",
      "SecuritySubType",
      "MaturityMonthYear",
      "MaturityDate",
      "MaturityDay",
      "ContractYearMonth",
      "DeliveryTerm",
      "DeliveryDate",
      "PutOrCall",
      "StrikePrice",
      "OptAttribute",
      "SecurityExchange",
      "ExDestination",
      "SecurityDesc",
      "Currency",
      "ExerciseStyle",
      "Timezone",
      "AvgPx",
      "TradingVenueRegulatoryTradeID",
      "LastMkt",
      "RoutingAccount",
      "CompanyID",
      "BrokerID",
      "TTCustomerName",
      "Seq",
      "LegFillSeq",
      "UserID",
      "TTID",
      "TradePublishIndicator",
      "OrderCapacity",
      "UnderlyingSymbol",
      "UnderlyingSecurityID",
      "UnderlyingSecurityIDSource",
      "UnderlyingSecurityType",
      "UnderlyingPx",
      "UnderlyingQty",
      "UnderlyingMaturityDate",
      "UnderlyingIssuer",
      "UnderlyingCurrency",
      "UnderlyingMemo",
      "UnderlyingStrikePrice",
      "UnderlyingSpotRate",
      "UnderlyingSecuritySubType",
      "RelatedTradeID",
      "RelatedTradeQty",
      "SettlDate",
      "HedgeType",
      "EchoDC_01",
      "EchoDC_02",
      "EchoDC_03",
      "EchoDC_04",
      "EchoDC_05",
      "EchoDC_06",
      "EchoDC_07",
      "EchoDC_08",
      "EchoDC_09",
      "EchoDC_10",
      "EchoDC_11",
      "EchoDC_12",
      "EchoDC_13",
      "EchoDC_14",
      "EchoDC_15",
      "EchoDC_16",
      "EchoDC_17",
      "EchoDC_18",
      "EchoDC_19",
      "EchoDC_20",
      "TextC",
      "TextTT",
      "TradingSessionSubID",
      "TFUserType",
      "NegotiationID",
      "SecondaryNegotiationID",
      "ExpireTime",
      "IfTouchedPrice",
      "IWouldPrice",
      "LimitPrc",
      "ManualOrderIndicator",
      "UniqueExecID",
      "TrdRptStatus",
      "InsertTime",
      "OneOffSharedKey"
    ]
  },
  {
    "msgtype": "AR",
    "name": "Trade Capture Report Ack",
    "requiredFields": [],
    "allFields": [
      "TradeReportID",
      "TradeReportRefID",
      "SecondaryTradeReportID",
      "ExecType",
      "ExecID",
      "TradeLinkID",
      "TradeReportTransType",
      "TradeReportType",
      "TrdRptStatus",
      "TrdSubType",
      "TradeReportRejectReason",
      "Text",
      "TransactTime",
      "PreviouslyReported",
      "TransBkdTime",
      "Symbol",
      "SecurityID",
      "IDSource",
      "Product",
      "CFICode",
      "SecurityType",
      "SecuritySubType",
      "MaturityMonthYear",
      "MaturityDate",
      "MaturityDay",
      "ContractYearMonth",
      "DeliveryTerm",
      "DeliveryDate",
      "PutOrCall",
      "StrikePrice",
      "OptAttribute",
      "SecurityExchange",
      "ExDestination",
      "SecurityDesc",
      "Currency",
      "ExerciseStyle",
      "Timezone",
      "LastPx",
      "LastShares",
      "TTCustomerName",
      "Seq",
      "CompanyID",
      "BrokerID",
      "UserID",
      "TTID",
      "TradePublishIndicator",
      "OrderCapacity",
      "TrdType",
      "EchoDC_01",
      "EchoDC_02",
      "EchoDC_03",
      "EchoDC_04",
      "EchoDC_05",
      "EchoDC_06",
      "EchoDC_07",
      "EchoDC_08",
      "EchoDC_09",
      "EchoDC_10",
      "EchoDC_11",
      "EchoDC_12",
      "EchoDC_13",
      "EchoDC_14",
      "EchoDC_15",
      "EchoDC_16",
      "EchoDC_17",
      "EchoDC_18",
      "EchoDC_19",
      "EchoDC_20",
      "TextC",
      "TextTT",
      "TradingSessionSubID",
      "TFUserType",
      "NegotiationID",
      "SecondaryNegotiationID",
      "ManualOrderIndicator",
      "RoutingAccount",
      "InsertTime"
    ]
  },
  {
    "msgtype": "B",
    "name": "News",
    "requiredFields": [
      "Headline",
      "LinesOfText",
      "Text"
    ],
    "allFields": [
      "Headline",
      "LinesOfText",
      "Text",
      "NewsReportID"
    ]
  },
  {
    "msgtype": "U2",
    "name": "Out Of Band Recovery Request",
    "requiredFields": [],
    "allFields": [
      "StartDate",
      "EndDate",
      "SecurityExchange",
      "ExDestination",
      "CustomMode",
      "Duration"
    ]
  },
  {
    "msgtype": "Q",
    "name": "Dont Know Trade",
    "requiredFields": [
      "OrderID",
      "ExecID",
      "DKReason"
    ],
    "allFields": [
      "OrderID",
      "ExecID",
      "DKReason",
      "Symbol",
      "SecurityID",
      "IDSource",
      "Product",
      "CFICode",
      "SecurityType",
      "SecuritySubType",
      "MaturityMonthYear",
      "MaturityDate",
      "MaturityDay",
      "ContractYearMonth",
      "DeliveryTerm",
      "DeliveryDate",
      "PutOrCall",
      "StrikePrice",
      "OptAttribute",
      "SecurityExchange",
      "ExDestination",
      "SecurityDesc",
      "Currency",
      "ExerciseStyle",
      "Timezone",
      "Side",
      "OrderQty",
      "LastShares",
      "LastPx",
      "Text"
    ]
  },
  {
    "msgtype": "J",
    "name": "Allocation Instruction",
    "requiredFields": [
      "AllocID",
      "AllocType",
      "AllocNoOrdersType",
      "Side",
      "Quantity",
      "AvgPx",
      "TradeDate"
    ],
    "allFields": [
      "AllocID",
      "AllocTransType",
      "AllocType",
      "AllocLinkID",
      "AllocNoOrdersType",
      "Side",
      "Symbol",
      "SecurityID",
      "IDSource",
      "Product",
      "CFICode",
      "SecurityType",
      "SecuritySubType",
      "MaturityMonthYear",
      "MaturityDate",
      "MaturityDay",
      "ContractYearMonth",
      "DeliveryTerm",
      "DeliveryDate",
      "PutOrCall",
      "StrikePrice",
      "OptAttribute",
      "SecurityExchange",
      "ExDestination",
      "SecurityDesc",
      "Currency",
      "ExerciseStyle",
      "Timezone",
      "Quantity",
      "LastMkt",
      "PriceType",
      "AvgPx",
      "AvgParPx",
      "TradeDate",
      "TransactTime",
      "SettlDate",
      "GrossTradeAmt",
      "NetMoney",
      "OpenClose",
      "Text",
      "Account",
      "AllocStrategy",
      "VendorDefinedField1",
      "VendorDefinedField2",
      "VendorDefinedField3",
      "VendorDefinedField4",
      "VendorDefinedField5",
      "AllocVolumeType"
    ]
  },
  {
    "msgtype": "P",
    "name": "Allocation Instruction Ack",
    "requiredFields": [
      "AllocID",
      "TransactTime",
      "AllocStatus"
    ],
    "allFields": [
      "AllocID",
      "TransactTime",
      "AllocStatus",
      "Text",
      "Account",
      "VendorDefinedField1",
      "VendorDefinedField2",
      "VendorDefinedField3",
      "VendorDefinedField4",
      "VendorDefinedField5"
    ]
  },
  {
    "msgtype": "AS",
    "name": "Allocation Report",
    "requiredFields": [
      "AllocReportID",
      "AllocTransType",
      "AllocReportType",
      "AllocStatus",
      "AllocNoOrdersType",
      "Side",
      "Quantity",
      "AvgPx",
      "TradeDate"
    ],
    "allFields": [
      "AllocReportID",
      "AllocTransType",
      "AllocReportType",
      "AllocStatus",
      "AllocNoOrdersType",
      "Side",
      "Quantity",
      "AvgPx",
      "TradeDate",
      "Text",
      "Account",
      "VendorDefinedField1",
      "VendorDefinedField2",
      "VendorDefinedField3",
      "VendorDefinedField4",
      "VendorDefinedField5",
      "AllocVolumeType",
      "TransactTime"
    ]
  },
  {
    "msgtype": "E",
    "name": "New Order List",
    "requiredFields": [
      "ListID"
    ],
    "allFields": [
      "ListID",
      "ListExecInst"
    ]
  }
]

export function fieldName(tag: number): string {
  return FIELDS[tag]?.name ?? `Tag ${tag}`
}

export function fieldValueDescription(tag: number, value: string): string | undefined {
  return FIELDS[tag]?.values?.[value]
}

export function msgTypeDescription(msgType: string): string {
  return MSG_TYPES[msgType] ?? `MsgType ${msgType}`
}

export function requiredFields(msgType: string, fixVersion: string): string[] {
  const map = fixVersion === 'FIX.4.2' ? REQUIRED_FIELDS_42 : REQUIRED_FIELDS_44
  return map[msgType] ?? []
}
