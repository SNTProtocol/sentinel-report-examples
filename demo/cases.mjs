export const cases = [
 {id:'SYN-001',title:'Transfer awaiting context',amount:'1,000 USDT',signal:'Additional context needed',facts:['Synthetic payer balance: 1,500 USDT','Synthetic recipient: no contract code'],unknown:['Counterparty identity is unverified','Expected token delivery is a caller declaration']},
 {id:'SYN-002',title:'Incomplete provider observations',amount:'250 USDT',signal:'Missing evidence',facts:['Synthetic payer ETH balance returned'],unknown:['USDT balance observation unavailable','No independent source corroboration']},
 {id:'SYN-003',title:'Transfer above supplied baseline',amount:'10,000 USDT',signal:'Human review suggested',facts:['Synthetic transfer amount exceeds the supplied 500 USDT baseline'],unknown:['Baseline is illustrative, not verified behavior','A larger amount alone does not establish fraud']}
];
