-- http://adventofcode.com/2015/day/2
import Data.List.Split
import Data.List

main :: IO()
main = do
    stdin <- getContents
    let squareFeet = inputToSquareFeet stdin
    putStrLn $ "The elves require " ++ show squareFeet ++ " feet of ribbon"

-- use Int insead of Word for simplicity/performance's sake
-- I used a guard instead, but I feel like that too is wrong
-- seems like there are interesting cases for negative surface area
computeRibbonFeet :: Int -> Int -> Int -> Int
computeRibbonFeet smallDimension medDimension bigDimension
    | smallDimension <= 0 = 0
    | medDimension <= 0 = 0
    | bigDimension <= 0 = 0
    | otherwise =
      let wrap = smallDimension * 2 + medDimension * 2
          bow = smallDimension * medDimension * bigDimension
      in wrap + bow

dimensionsToSurfaceArea :: [Int] -> Int
-- this feels really dumb, yay knowledge gaps
dimensionsToSurfaceArea dims =
  let middle = head . tail
      srtd = sort dims
  in computeRibbonFeet (head srtd) (middle srtd) (last srtd)

-- could blow up if not a valid Int :(
strToInt :: String -> Int
strToInt val = read val :: Int

textDimensionsToDimensions :: String -> [Int]
textDimensionsToDimensions text = map strToInt (splitOn "x" text)

textDimensionsToSurfaceArea :: String -> Int
textDimensionsToSurfaceArea = dimensionsToSurfaceArea . textDimensionsToDimensions

textDimListToSurfaceAreaList :: [String] -> [Int]
textDimListToSurfaceAreaList = map textDimensionsToSurfaceArea 

inputToSquareFeet :: String -> Int
inputToSquareFeet input =
  let surfaceAreaList = textDimListToSurfaceAreaList (lines input)
  in foldl (+) 0 surfaceAreaList
