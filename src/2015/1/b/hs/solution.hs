main = do
    stdin <- getContents
    let scanFloorStatus = scanl floorStatus (0, 1) stdin
    let floor = (snd . last) (takeFloorScan scanFloorStatus)
    putStrLn $ "Santa enters the basement at position: " ++ show floor

increment = '('
decrement = ')'

-- (currentFloor, instructionNumber)
floorStatus :: (Int, Int) -> Char -> (Int, Int)
floorStatus status instruction
    | instruction == increment = ((fst status) + 1, (snd status) + 1)
    | instruction == decrement = ((fst status) - 1, (snd status) + 1)
    | otherwise = (fst status, (snd status) + 1)

statusGreaterThanEqZero :: (Int, Int) -> Bool
statusGreaterThanEqZero status = fst status >= 0

takeFloorScan :: [(Int, Int)] -> [(Int, Int)]
takeFloorScan scanFloorStatus =
    takeWhile statusGreaterThanEqZero scanFloorStatus
