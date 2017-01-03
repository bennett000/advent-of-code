; -*-Lisp-*-

(defconstant Increment "(")
(defconstant Decrement ")")

(defun incIndex (meta)
  (list :floor (getf meta :floor) :index (+ (getf meta :index) 1)))

(defun incFloor (meta)
  (incIndex
    (list :floor (+ (getf meta :floor) 1) :index (getf meta :index))))

(defun decFloor (meta)
  (incIndex
    (list :floor (- (getf meta :floor) 1) :index (getf meta :index))))

(defun entersBasement () 
  (defun nextInstruction (meta)
    (let ((instruction (read-char *standard-input* nil)))
      (cond ((eq instruction nil) meta)
	    ((eq (getf meta :floor) -1) meta)
            ((string= instruction Increment) (nextInstruction (incFloor meta)))
            ((string= instruction Decrement) (nextInstruction (decFloor meta)))
            (t (incIndex meta)))))
  (getf (nextInstruction (list :floor 0 :index 0)) :index))

;; Expose main function
(defun main ()
  (format t 
    (concatenate 'string "Santa enters the basement at position: " 
      (write-to-string (entersBasement)) "~%")))

