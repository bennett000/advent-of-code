; -*-Lisp-*-

(defconstant Increment "(")
(defconstant Decrement ")")

(defun countFloors () 
  (defun nextInstruction (floor)
    (let ((instruction (read-char *standard-input* nil)))
      (cond ((eq instruction nil) floor)
            ((string= instruction Increment) (nextInstruction (+ floor 1)))
            ((string= instruction Decrement) (nextInstruction (- floor 1)))
            (t floor))))
  (nextInstruction 0))

;; Expose main function
(defun main ()
  (format t 
    (concatenate 'string "Santa is on floor " 
      (write-to-string (countFloors)) "~%")))

