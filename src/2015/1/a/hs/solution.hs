main = do
    stdin <- getContents
    let floor = foldl changeFloor 0 stdin
    putStrLn $ "Santa is on floor " ++ show floor

increment = '('
decrement = ')'

changeFloor :: Int -> Char -> Int
changeFloor currentFloor instruction
    | instruction == increment = currentFloor + 1
    | instruction == decrement = currentFloor - 1
    | otherwise = currentFloor
