global exit
global readCharacter
global writeBuffer
global writeCharacter

section .text
	
exit:	
	;; 0x2000001 is Darwin specific
	mov	rax, 0x2000001	; exit
	mov	rdi, 0
	syscall
	ret

	
;; reads to buffer address in rsi (from stdin)
readCharacter:	
	;; 0x2000003 is Darwin specific
	mov	rax, 0x2000003	; read
	mov	rdi, 0		; stdin
	mov	rdx, 1		; buffer size
	syscall
	ret

;; writes from buffer address in rsi (to stdout)
;; expects size to be in rdx
writeBuffer:	
;; 0x2000004 is Darwin specific
	mov	rax, 0x2000004	; write
	mov	rdi, 1		; stdout
	syscall
	ret

;; writes from buffer address in rsi (to stdout)
writeCharacter:
	;; 0x2000004 is Darwin specific
	mov	rdx, 1		; ASCII :(
	call	writeBuffer
	ret
