
/**
 *The object used as a board which is contained in a 2D array of Board objects
 *Each object contains an array of its inmediate neighbours (N, S, W, E)
 *and also the amount of liberties (adjacent 0's) its positions, degree and token
 *The visited paramater is used by the Flood Fill Algorithm
 */
	function Board (x,y,token)  {
	    this.neighbour = [],
	    this.liberties = 0,
	    this.x = x ,
	    this.y = y,
	    this.token = token,
	    this.degree = 0,
	    this.visited = false
	}
	
	
/**
 * Add a Neighbour to a Board object
 *
 * @param Board {Board object} The Board to add neighbour 
 * @param neighbour {Board object} The neighbour to add to the board
 *
 */
	function addNeighbour(Board,neighbour){
	    Board.neighbour.push(neighbour);
	    Board.degree++;
	}

	
/**
 * Creates all the Board object for each position of the 2D array
 *
 * @param board {2D int array} The board to base the creation 
 * 
 * @returns {2D object array} 
 */
	function getNeighbours(board){
	    var A = [];
	 		//nested for loop to fill every single cell of the array with a Board object
			for (var i = 0; i < board.length; i++){
			    var arr = new Array();
				for (var j = 0; j < board.length; j++){
				    arr.push(new Board(i,j,board[i][j]));
				}
				A.push(arr);
			}
			//create second for loop to check every vertex with same token
			for (var i = 0; i < board.length ;i++){
				for (var j=0; j < board.length ;j++){
					if (j+1 < board.length){
						if (A[i][j].token == (A[i][j+1].token)){
							addNeighbour(A[i][j],A[i][j+1]);
						}
						if (A[i][j+1].token == 0){
						    A[i][j].liberties++;
						}
					}
					if (i+1 < board.length){
						if (A[i][j].token == (A[i+1][j].token)){
							addNeighbour(A[i][j],A[i+1][j]);
						}
						if (A[i+1][j].token == 0){
						    A[i][j].liberties++;
						}
					}	
					if (j-1 >= 0){	
						if (A[i][j].token ==(A[i][j-1].token)){
							addNeighbour(A[i][j],A[i][j-1]);
						}
						if (A[i][j-1].token == 0){
						    A[i][j].liberties++;
						}
					}	
					if (i-1 >= 0){	
						if (A[i][j].token ==(A[i-1][j].token)){
							addNeighbour(A[i][j],A[i-1][j]);
						}
						if (A[i-1][j].token == 0){
						    A[i][j].liberties++;
						}
					}	
					
							
				}
			}
			
			return A;
	 }
	
/**
 * Flood Fills on the armies adjacent to the placed token
 * to check if the placed token completely surrounded another
 * army and killed it.
 *
 * @param Board {Board object} The Board to Flood Fill on
 * @param positions {int Array} Array to store the killed position
 *
 * @returns {int} 0 if no armies killed; 1 if at least 1 was killed
 */	
function FloodFillBFSForDeath(Board,positions){
	
	//Object to store the positions killed
	function positionKilled (row,column){
		this.row = row,
		this.column = column
	}
	
	var position_floodFill = []
    
	var kill;
    var queue = [];
    if (Board.liberties > 0){
    	//If it gets in here then no army was killed
    	kill = 0;
    	return 0;
    } else {
    	queue.push(Board);
    }
    Board.visited = true;
    //console.log("visited  " + Board.x + " , " + Board.y); //debugging purposes
    position_floodFill.push(new positionKilled(Board.x, Board.y));
    while (queue.length != 0){
        var r = queue.pop();
        for (var i = 0; i < r.neighbour.length; i++){
            if(r.neighbour[i].visited == false){
                r.neighbour[i].visited = true;
                //console.log("visited " + r.neighbour[i].x + " , " + r.neighbour[i].y); //debugging purposes
                if (r.neighbour[i].liberties > 0){
                	//If it gets in here then no army was killed
                    kill = 0;
                    return 0;
                }
                position_floodFill.push(new positionKilled(r.neighbour[i].x, r.neighbour[i].y));
                queue.push(r.neighbour[i]);
            }
        }//end for
    }//end while

    //
    if (kill == 0){
    	//Nothing was killed
    } else {
    	//Push into the positions array passed by the caller
    	for (var i = 0; i < position_floodFill.length; i++){
    		positions.push(position_floodFill[i]);
    	}
    	//Army was killed so report the death to caller
    	return 1;
    }
    
}
	
/**
 * check Adjacent Tokens of a given position
 *
 * @param A {Board object} The Board object to check adjacent Tokens of 
 * @param tokens {tokens object} object to count number of different tokens 
 * @param position {int position} Position to check
 *
 */	
	function checkAdjacentTokens(A, tokens,position){
	    if (position.column+1 < A.length){
		    if (A[position.row][position.column+1].visited == false){
				if (A[position.row][position.column+1].token == 1){
					A[position.row][position.column+1].visited = true;
				    tokens.one++;
				} else if (A[position.row][position.column+1].token == 2){
					A[position.row][position.column+1].visited = true;
					tokens.two++;
				}
			}
	    }
		if (position.row+1 < A.length){
			if (A[position.row+1][position.column].visited == false){
				if (A[position.row+1][position.column].token == 1){
					A[position.row+1][position.column].visited = true;
				   tokens.one++;
				} else if (A[position.row+1][position.column].token == 2){
					A[position.row+1][position.column].visited = true;
					tokens.two++;
				}
			}
		}	
		if (position.column-1 >= 0){	
			if (A[position.row][position.column-1].visited == false){
				if (A[position.row][position.column-1].token == 1){
					A[position.row][position.column-1].visited = true;
				    tokens.one++;
				} else if (A[position.row][position.column-1].token == 2){
					A[position.row][position.column-1].visited = true;
					tokens.two++;
				}
			}
		}	
		if (position.row-1 >= 0){	
			if (A[position.row-1][position.column].visited == false){
				if (A[position.row-1][position.column].token == 1){
					A[position.row-1][position.column].visited = true;
				    tokens.one++;
				} else if (A[position.row-1][position.column].token == 2){
					A[position.row-1][position.column].visited = true;
					tokens.two++;
				}
			}
		}
	}
	

/**
 * Flood fill the whole board to calculate Areas controlled
 *
 * @param Board {Board object} The Board to add neighbour 
 * @param neighbour {Board object} The neighbour to add to the board
 *
 */	
	function FloodFillBFSArea(x,y,board, B,score){
		var A = getNeighbours(board);
		var Board = A[x][y];
		var tokens = {one: 0, two: 0}
		var position = {row: 0, column: 0}
		var visits = 0;
	    var queue = [];
	    queue.push(Board);
	    Board.visited = true;
	    B[x][y].visited = true;
	    visits++;
	    position.row = Board.x;
	    position.column = Board.y;
	    checkAdjacentTokens(A,tokens,position);
	    while (queue.length != 0){
	        var r = queue.pop();
	        for (var i = 0; i < r.neighbour.length; i++){
	            if(r.neighbour[i].visited == false){
	                r.neighbour[i].visited = true;
	                B[r.neighbour[i].x][r.neighbour[i].y].visited = true;
	                //console.log("visited " + r.neighbour[i].x + " , " + r.neighbour[i].y); //debuggin purposes
	                visits++;
	                position.row = r.neighbour[i].x;
	                position.column = r.neighbour[i].y;
	                checkAdjacentTokens(A,tokens,position);
	                queue.push(r.neighbour[i]);
	            }
	        }
	      
	    }
	    if (tokens.one == 0){
	    	//Area is controlled by player two
	    	score.player2 += visits;
	    } else if (tokens.two == 0){
	    	//Area is controlled by player one
	    	score.player1 += visits;
	    } else {
	    	//Area is disputed	
	    }
	}
	
	
	function isSuicide(board, position,numArmiesKilled){
		console.log("num armies killed are " + numArmiesKilled);
		var A = getNeighbours(board);
		var B = getNeighbours(board);
		var C = getNeighbours(board);
		var D = getNeighbours(board);
		var positions = [];
		if (A[position.row][position.column].liberties > 0){
			return false;
		}
		
		if (A[position.row][position.column].liberties == 0  && numArmiesKilled == 0 && A[position.row][position.column].neighbour.length == 0){
			return true;	
		} else  if (A[position.row][position.column].neighbour.length > 0){
			
			
			
		    //trying to commit suicide
				if (position.column+1 < A.length){
				    if (A[position.row][position.column+1].token == A[position.row][position.column].token){
				    	if(A[position.row][position.column+1].liberties > 0){
				    		return false;
				    	} else  if(FloodFillBFSForDeath(A[position.row][position.column+1],positions)==0){
				    		return false;
				    	}
					
					}
	    		}
				if (position.row+1 < A.length){
					if (B[position.row+1][position.column].token == B[position.row][position.column].token){
						if(B[position.row+1][position.column].liberties > 0){
							return false;
						} else if (FloodFillBFSForDeath(B[position.row+1][position.column],positions)== 0){
							return false;
						}
					}
				}	
				if (position.column-1 >= 0){	
					if (C[position.row][position.column-1].token == C[position.row][position.column].token){
						if(C[position.row][position.column-1].liberties > 0){
							return false;
						} else if (FloodFillBFSForDeath(C[position.row][position.column-1],positions == 0)){
							return false;
						}
					}
				}	
				if (position.row-1 >= 0){	
					if (D[position.row-1][position.column].token == D[position.row][position.column].token){
						if(D[position.row-1][position.column].liberties > 0){
							return false;
						} else if (FloodFillBFSForDeath(D[position.row-1][position.column],positions) == 0){
							return false;
						}
					}
				}

		} else {
		console.log("suicidal move");
		 return true;
		}
	}
	
	function isKO(board, prevBoard){
		if (arraysIdentical(board,prevBoard)){
			//KO 
			return  true;
		} else {
			return false;
		}
	}
	
	
function checkDeath(position, board){
	
	function positionKilled (row,column){
		this.row = row,
		this.column = column
	}

	var positions = [];
	//console.log("checking if token " + board[position.row][position.column].token + " placed at row: " + position.row + " column: " + position.column + " killed something in board");
	
    if (position.column+1 < board.length){
    	var A = getNeighbours(board);
	    if (A[position.row][position.column].token != A[position.row][position.column+1].token && A[position.row][position.column+1].token != 0){
			if (A[position.row][position.column+1].neighbour.length != 0){
			    FloodFillBFSForDeath(A[position.row][position.column+1],positions);
			} else if (A[position.row][position.column+1].liberties == 0){
				positions.push(new positionKilled(position.row, position.column+1));
			}
		}
    }
	if (position.row+1 < board.length){
		var A = getNeighbours(board);
		if (A[position.row][position.column].token != A[position.row+1][position.column].token && A[position.row+1][position.column].token != 0){
			if (A[position.row+1][position.column].neighbour.length != 0){
			    FloodFillBFSForDeath(A[position.row+1][position.column],positions);
			} else if (A[position.row+1][position.column].liberties == 0){
				positions.push(new positionKilled(position.row+1, position.column));
			}
		}
	}	
	if (position.column-1 >= 0){
		var A = getNeighbours(board);
		if (A[position.row][position.column].token != A[position.row][position.column-1].token && A[position.row][position.column-1].token != 0){
		    if (A[position.row][position.column-1].neighbour.length != 0){
		        FloodFillBFSForDeath(A[position.row][position.column-1],positions);
		    } else if(A[position.row][position.column-1].liberties == 0){
		    	positions.push(new positionKilled(position.row, position.column-1));
		    }
		}
	}	
	if (position.row-1 >= 0){
		var A = getNeighbours(board);
		if (A[position.row][position.column].token != A[position.row-1][position.column].token && A[position.row-1][position.column].token != 0){
			if (A[position.row-1][position.column].neighbour.length != 0){
			    FloodFillBFSForDeath(A[position.row-1][position.column],positions);
			} else if(A[position.row-1][position.column].liberties == 0){
				positions.push(new positionKilled(position.row-1, position.column));
			}
		}
	}
	////console.log("Killed armies");
	 ////console.log("Right before checkDeath returns");
	 ////console.log(new Date().getTime()/1000);
	 ////console.log("Positions in check death is : ")
	 ////console.log(positions);
	return positions;
    
}
	
	function validate(board, previousBoard, position,numArmiesKilled){ //add previous board here to check against ko for previous state
	    
	    //////console.log(board[position.row][position.column]);
	    //var A = getNeighbours(board);
		////console.log("ALGORITHMS LINE 373");
	    if (isSuicide(board, position,numArmiesKilled)){
	    	////console.log("ALGORITHMS LINE 375");
	    	return 1;
	    } else if(isKO(board, previousBoard)) {
	    	return 2;  
	    } else {
	    	return 0; //move is valid
	    }
	    
	}
	
	function getScore(board){
		//if stoneScoring
		stoneScoring(board);
		
		//if armyscoring
		areaScoring(board);//undisputed liberties no substraction
		
		//if territory scoring
		territoryScoring();//undisputed liberties - death armies 
	    
	}
	
	function stoneScoring(board){
		
		var score = {player1: 0, player2: 0};
	
		
		for(var i=0;i<board.length;i++){
			for(var j=0;j<board.length;j++){
				if(board[i][j]==1){
					score.player1++;
				}
				if(board[i][j]==2){
					score.player2++;
				}
			}
		}
		//console.log(score);
		return score; 
	
	}
	
	
	function areaScoring(board){
		var B = getNeighbours(board);
		var score = {player1: 0, player2: 0};
		//////console.log(A);
		
		for (var i =0; i <board.length; i++){
			for(var j=0; j < board.length; j++){
				if (B[i][j].token == 0 && B[i][j].visited == false){
					FloodFillBFSArea(i,j,board,B, score);
				}
			}
		}
		////console.log("Player 1 score is " + score.player1 + " Player 2 score is " + score.player2);
		return score;
	}
	
	function territoryScoring(board){
		var score = areaScoring(board);
		//score.player1 -= player1.killedTokes;
		//score.player2 -= player2.killedTokens;
		////console.log(score);
		return score;  
		
	}
	
	function arraysIdentical(a, b){
	    
	    for(var i = 0; i < a.length; i++){
	        for(var j = 0; j < a.length; j++){
	            if(a[i][j] != b[i][j]){
	                return false;
	            }
	        }
	    }
	    
	    return true;
	}


module.exports = 
{
	arraysIdentical : arraysIdentical,
	isKO:isKO,
	getNeighbours : getNeighbours,
	FloodFillBFSForDeath: FloodFillBFSForDeath,
	FloodFillBFSArea:FloodFillBFSArea,
	stoneScoring : stoneScoring,
	areaScoring : areaScoring,
	territoryScoring : territoryScoring,
	checkDeath : checkDeath,
	validate : validate
}